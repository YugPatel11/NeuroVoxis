import os
import threading
import tempfile
from django.conf import settings
from moviepy.editor import VideoFileClip
import cv2

from evaluations.models import Evaluation
from interviews.models import InterviewResponse
from .whisper_service import WhisperService
from .nlp_service import NLPService
from .vision_service import VisionService
from .audio_service import AudioService
from .feedback_service import FeedbackService


class AIPipeline:
    """
    Handles the asynchronous processing of interview video responses.
    Extracts audio, runs AI models, and saves the results.
    """
    
    def process_response_async(self, response_id):
        """Starts a background thread to process the video."""
        thread = threading.Thread(target=self._process_response, args=(response_id,))
        thread.daemon = True
        thread.start()

    def _extract_audio(self, video_path):
        """Extracts audio from video and returns the path to the temporary audio file."""
        # moviepy needs an absolute path
        video = VideoFileClip(video_path)
        
        # Create a temporary file for the audio
        audio_fd, audio_path = tempfile.mkstemp(suffix='.wav')
        os.close(audio_fd) # Close file descriptor, moviepy will overwrite it
        
        # Write audio
        video.audio.write_audiofile(audio_path, logger=None) # Disable logger to avoid console spam
        video.close()
        
        return audio_path

    def _process_response(self, response_id):
        """The actual processing logic run in the background thread."""
        try:
            # Need to re-import django stuff in thread safely if not already loaded, but it should be
            response = InterviewResponse.objects.get(id=response_id)
            if not response.video_file:
                print(f"Response {response_id} has no video file.")
                return

            video_path = response.video_file.path
            print(f"Starting AI pipeline for response {response_id}...")

            # 1. Extract Audio
            audio_path = self._extract_audio(video_path)
            
            # Save audio to response model (optional but good for future)
            # For now, we use the temp path for analysis
            
            # 2. Initialize Services (Lazy load inside thread to prevent blocking main thread)
            whisper_svc = WhisperService()
            nlp_svc = NLPService()
            vision_svc = VisionService()
            audio_svc = AudioService()
            feedback_svc = FeedbackService()

            # 3. Process Audio (Speech to Text)
            transcript = whisper_svc.transcribe(audio_path)
            response.transcript = transcript
            response.save(update_fields=['transcript'])

            # 4. Process NLP (Semantic Similarity)
            ideal_answer = response.question.ideal_answer
            answer_score = nlp_svc.evaluate_answer(transcript, ideal_answer)

            # 5. Process Audio (Pitch, Energy, Confidence)
            audio_metrics = audio_svc.analyze_audio(audio_path)
            # audio_metrics returns pitch, energy, tempo, and confidence_score
            audio_confidence = audio_metrics.get("confidence_score", 50)

            # 6. Process Vision (Eye contact, posture)
            # We will sample a few frames to save processing time
            cap = cv2.VideoCapture(video_path)
            frame_count = int(cap.get(cv2.CAP_PROP_FRAME_COUNT))
            # Sample up to 10 frames evenly spaced
            samples = min(10, frame_count) if frame_count > 0 else 1
            step = max(1, frame_count // samples)
            
            eye_contact_total = 0
            posture_total = 0
            frames_processed = 0

            for i in range(0, frame_count, step):
                cap.set(cv2.CAP_PROP_POS_FRAMES, i)
                ret, frame = cap.read()
                if ret:
                    v_analysis = vision_svc.analyze_frame(frame)
                    eye_contact_total += v_analysis.get('eye_contact', 0)
                    posture_total += v_analysis.get('posture', 0)
                    frames_processed += 1
            
            cap.release()

            if frames_processed > 0:
                eye_score = (eye_contact_total / frames_processed) * 100
                posture_score = (posture_total / frames_processed) * 100
            else:
                eye_score, posture_score = 50, 50

            # Calculate final confidence and communication scores
            confidence_score = round((audio_confidence * 0.4) + (eye_score * 0.4) + (posture_score * 0.2), 2)
            communication_score = round((audio_confidence * 0.6) + (posture_score * 0.4), 2) # simplified logic

            overall_score = round((answer_score * 0.4) + (confidence_score * 0.3) + (communication_score * 0.3), 2)

            # 7. Generate qualitative feedback
            feedback = feedback_svc.generate(answer_score, confidence_score, communication_score, overall_score)

            # 8. Save Evaluation
            Evaluation.objects.update_or_create(
                response=response,
                defaults={
                    'answer_score': answer_score,
                    'confidence_score': confidence_score,
                    'communication_score': communication_score,
                    'overall_score': overall_score,
                    'strengths': feedback['strengths'],
                    'weaknesses': feedback['weaknesses'],
                    'suggestions': feedback['suggestions'],
                }
            )

            # Cleanup temp file
            if os.path.exists(audio_path):
                os.remove(audio_path)

            print(f"Finished AI pipeline for response {response_id}. Overall Score: {overall_score}")

        except Exception as e:
            print(f"Error processing response {response_id}: {str(e)}")

import librosa
import numpy as np

class AudioService:
    def analyze_audio(self, audio_path):
        y, sr = librosa.load(audio_path)
        
        # Calculate pitch
        pitches, magnitudes = librosa.piptrack(y=y, sr=sr)
        avg_pitch = np.mean(pitches[pitches > 0]) if np.any(pitches > 0) else 0
        
        # Calculate energy (RMS)
        rms = librosa.feature.rms(y=y)
        avg_energy = np.mean(rms)
        
        # Calculate tempo (BPM)
        tempo, _ = librosa.beat.beat_track(y=y, sr=sr)
        
        return {
            "pitch": float(avg_pitch),
            "energy": float(avg_energy),
            "tempo": float(tempo),
            "confidence_score": self._calculate_confidence(avg_pitch, avg_energy)
        }

    def _calculate_confidence(self, pitch, energy):
        # Heuristic for confidence score
        if energy > 0.05:
            return 80
        return 50

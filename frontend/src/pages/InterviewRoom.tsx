import React, { useState, useEffect, useRef } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import Webcam from 'react-webcam';
import { 
  Mic, 
  MicOff, 
  Video, 
  VideoOff, 
  ChevronRight, 
  Loader2, 
  Circle,
  StopCircle,
  CheckCircle2,
  AlertCircle
} from 'lucide-react';
import client from '../api/client';

interface Question {
  id: number;
  question_text: string;
  difficulty: string;
  order: number;
}

const InterviewRoom = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const roleId = location.state?.roleId;

  const [questions, setQuestions] = useState<Question[]>([]);
  const [currentIdx, setCurrentIdx] = useState(0);
  const [session, setSession] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [isRecording, setIsRecording] = useState(false);
  const [isFinishing, setIsFinishing] = useState(false);
  
  const webcamRef = useRef<Webcam>(null);
  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const [recordedChunks, setRecordedChunks] = useState<Blob[]>([]);

  useEffect(() => {
    if (!roleId) {
      navigate('/interview/select');
      return;
    }

    const startSession = async () => {
      try {
        const res = await client.post('interviews/start/', { role_id: roleId });
        setSession(res.data.session);
        setQuestions(res.data.questions);
      } catch (err) {
        console.error('Failed to start session', err);
      } finally {
        setLoading(false);
      }
    };

    startSession();
  }, [roleId, navigate]);

  const handleStartRecording = () => {
    setIsRecording(true);
    setRecordedChunks([]);
    
    if (webcamRef.current?.stream) {
      const recorder = new MediaRecorder(webcamRef.current.stream, {
        mimeType: 'video/webm'
      });
      
      recorder.ondataavailable = (e) => {
        if (e.data.size > 0) {
          setRecordedChunks((prev) => prev.concat(e.data));
        }
      };
      
      recorder.start();
      mediaRecorderRef.current = recorder;
    }
  };

  const handleStopRecording = () => {
    if (mediaRecorderRef.current) {
      mediaRecorderRef.current.stop();
      setIsRecording(false);
    }
  };

  const handleSubmitResponse = async () => {
    if (recordedChunks.length === 0) return;
    
    const blob = new Blob(recordedChunks, { type: 'video/webm' });
    const formData = new FormData();
    formData.append('video_file', blob, `response_${questions[currentIdx].id}.webm`);
    formData.append('session', session.id);
    formData.append('question', questions[currentIdx].id.toString());

    try {
      await client.post('interviews/respond/', formData, {
        headers: { 'Content-Type': 'multipart/form-data' }
      });
      
      if (currentIdx < questions.length - 1) {
        setCurrentIdx(currentIdx + 1);
        setRecordedChunks([]);
      } else {
        handleFinishInterview();
      }
    } catch (err) {
      console.error('Failed to submit response', err);
    }
  };

  const handleFinishInterview = async () => {
    setIsFinishing(true);
    try {
      const res = await client.post('interviews/finish/', { session_id: session.id });
      setTimeout(() => {
        navigate('/interview/results', { state: { report: res.data.report } });
      }, 1500);
    } catch (err) {
      console.error('Failed to finish session', err);
      setIsFinishing(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-primary">
        <Loader2 className="w-12 h-12 text-accent animate-spin" />
      </div>
    );
  }

  const currentQuestion = questions[currentIdx];

  return (
    <div className="max-w-7xl mx-auto px-6 py-12 min-h-screen flex flex-col bg-primary text-text-primary">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-2xl font-bold text-text-primary">Interview in Progress</h1>
          <p className="text-text-secondary text-sm">Question {currentIdx + 1} of {questions.length}</p>
        </div>
        <div className="flex items-center gap-4">
          <div className="px-4 py-2 rounded-full bg-error/10 border border-error/20 flex items-center gap-2">
            <div className={`w-2 h-2 rounded-full bg-error ${isRecording ? 'animate-pulse' : ''}`} />
            <span className="text-xs font-bold text-error uppercase tracking-widest">
              {isRecording ? 'Recording' : 'Standby'}
            </span>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 flex-1">
        {/* Video Feed */}
        <div className="relative rounded-[2.5rem] overflow-hidden bg-black border border-white/10 shadow-2xl group">
          <Webcam
            audio={true}
            ref={webcamRef}
            mirrored={true}
            className="w-full h-full object-cover"
          />
          <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex items-center gap-4">
            {!isRecording ? (
              <button 
                onClick={handleStartRecording}
                className="w-16 h-16 rounded-full bg-error flex items-center justify-center hover:bg-red-500 transition-all shadow-[0_0_20px_rgba(244,67,54,0.4)]"
              >
                <Circle className="w-6 h-6 fill-white text-white" />
              </button>
            ) : (
              <button 
                onClick={handleStopRecording}
                className="w-16 h-16 rounded-full bg-white flex items-center justify-center hover:bg-gray-200 transition-all shadow-[0_0_20px_rgba(255,255,255,0.4)]"
              >
                <StopCircle className="w-6 h-6 text-black fill-black" />
              </button>
            )}
          </div>
        </div>

        {/* Question Panel */}
        <div className="flex flex-col gap-6">
          <div className="p-10 rounded-[2.5rem] bg-card/50 border border-white/10 backdrop-blur-sm flex-1 flex flex-col justify-center relative overflow-hidden">
             <div className="absolute top-0 right-0 p-8">
               <span className="px-3 py-1 rounded-full bg-accent/10 border border-accent/20 text-accent text-[10px] font-bold uppercase tracking-widest">
                 {currentQuestion?.difficulty}
               </span>
             </div>

             <AnimatePresence mode="wait">
               <motion.div
                 key={currentIdx}
                 initial={{ opacity: 0, x: 20 }}
                 animate={{ opacity: 1, x: 0 }}
                 exit={{ opacity: 0, x: -20 }}
                 className="space-y-6"
               >
                 <h2 className="text-3xl font-bold leading-tight text-text-primary">
                   {currentQuestion?.question_text}
                 </h2>
                 <p className="text-text-muted leading-relaxed italic">
                   Take a moment to collect your thoughts. Press the record button when you're ready to answer.
                 </p>
               </motion.div>
             </AnimatePresence>
          </div>

          <div className="p-8 rounded-3xl bg-secondary/30 border border-white/5 flex items-center justify-between">
             <div className="text-sm text-text-muted">
               {recordedChunks.length > 0 ? (
                 <div className="flex items-center gap-2 text-success font-medium">
                   <CheckCircle2 className="w-4 h-4" />
                   Response captured
                 </div>
               ) : (
                 <div className="flex items-center gap-2">
                   <AlertCircle className="w-4 h-4" />
                   Waiting for recording
                 </div>
               )}
             </div>
             
             <button
               onClick={handleSubmitResponse}
               disabled={recordedChunks.length === 0 || isRecording}
               className="px-8 py-3 rounded-2xl bg-accent text-white font-bold hover:bg-accent-hover transition-all disabled:opacity-20 flex items-center gap-2"
             >
               {currentIdx < questions.length - 1 ? 'Next Question' : 'Finish Interview'}
               <ChevronRight className="w-5 h-5" />
             </button>
          </div>
        </div>
      </div>

      <AnimatePresence>
        {isFinishing && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="fixed inset-0 z-[100] bg-primary/90 backdrop-blur-xl flex flex-col items-center justify-center text-center p-6"
          >
            <div className="w-20 h-20 rounded-full bg-accent/10 border border-accent/20 flex items-center justify-center mb-8">
              <Loader2 className="w-10 h-10 text-accent animate-spin" />
            </div>
            <h2 className="text-3xl font-bold mb-4 text-text-primary">Generating Your Report</h2>
            <p className="text-text-secondary max-w-sm">Please wait while our AI analyzes your responses and behavior...</p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default InterviewRoom;

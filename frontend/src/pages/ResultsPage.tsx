import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  BarChart3, CheckCircle2, XCircle, Lightbulb,
  RotateCcw, LayoutDashboard, Trophy
} from 'lucide-react';
import { RadarChart, Radar, PolarGrid, PolarAngleAxis, ResponsiveContainer, Tooltip } from 'recharts';

const ScoreRing = ({ score, label }: { score: number; label: string }) => {
  const color = score >= 80 ? '#4CAF50' : score >= 60 ? '#00ADB5' : '#F44336';
  return (
    <div className="flex flex-col items-center gap-2">
      <div className="relative w-24 h-24">
        <svg className="w-full h-full -rotate-90" viewBox="0 0 100 100">
          <circle cx="50" cy="50" r="40" fill="none" stroke="#334756" strokeWidth="10" />
          <circle
            cx="50" cy="50" r="40" fill="none"
            stroke={color} strokeWidth="10"
            strokeLinecap="round"
            strokeDasharray={`${(score / 100) * 251.2} 251.2`}
          />
        </svg>
        <div className="absolute inset-0 flex items-center justify-center">
          <span className="text-xl font-black" style={{ color }}>{Math.round(score)}</span>
        </div>
      </div>
      <p className="text-text-secondary text-xs font-bold uppercase tracking-widest">{label}</p>
    </div>
  );
};

const ResultsPage = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const report = location.state?.report;

  if (!report) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-primary gap-6">
        <p className="text-text-secondary text-lg">No results found.</p>
        <button onClick={() => navigate('/dashboard')} className="px-6 py-3 rounded-2xl bg-accent text-white font-bold hover:bg-accent-hover transition-all">
          Go to Dashboard
        </button>
      </div>
    );
  }

  const radarData = [
    { subject: 'Answer Quality', score: report.answer_quality_avg },
    { subject: 'Confidence', score: report.confidence_avg },
    { subject: 'Communication', score: report.communication_avg },
  ];

  const scoreColor = report.final_score >= 80
    ? 'text-success'
    : report.final_score >= 60
    ? 'text-accent'
    : 'text-error';

  return (
    <div className="min-h-screen bg-primary text-text-primary px-6 py-16">
      <div className="max-w-5xl mx-auto space-y-10">

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center"
        >
          <div className="inline-flex items-center gap-2 px-4 py-1 rounded-full bg-accent/10 border border-accent/20 text-accent text-xs font-bold tracking-widest uppercase mb-6">
            <Trophy className="w-3 h-3" />
            Interview Complete
          </div>
          <h1 className="text-5xl font-extrabold mb-3">
            Your Score: <span className={scoreColor}>{report.final_score}/100</span>
          </h1>
          <p className="text-text-secondary max-w-xl mx-auto">{report.summary}</p>
        </motion.div>

        {/* Score Rings */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="p-10 rounded-[2.5rem] bg-card/20 border border-white/10 backdrop-blur-sm flex flex-wrap justify-around gap-8"
        >
          <ScoreRing score={report.answer_quality_avg} label="Answer Quality" />
          <ScoreRing score={report.confidence_avg} label="Confidence" />
          <ScoreRing score={report.communication_avg} label="Communication" />
        </motion.div>

        {/* Radar Chart */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="p-10 rounded-[2.5rem] bg-card/20 border border-white/10 backdrop-blur-sm"
        >
          <h2 className="text-xl font-bold mb-6 flex items-center gap-2">
            <BarChart3 className="w-5 h-5 text-accent" />
            Performance Breakdown
          </h2>
          <div className="h-[280px]">
            <ResponsiveContainer width="100%" height="100%">
              <RadarChart data={radarData}>
                <PolarGrid stroke="#334756" />
                <PolarAngleAxis dataKey="subject" tick={{ fill: '#B0BEC5', fontSize: 12 }} />
                <Tooltip
                  contentStyle={{ backgroundColor: '#2C394B', border: '1px solid #334756', borderRadius: '12px', color: '#fff' }}
                />
                <Radar name="Score" dataKey="score" stroke="#00ADB5" fill="#00ADB5" fillOpacity={0.2} />
              </RadarChart>
            </ResponsiveContainer>
          </div>
        </motion.div>

        {/* Feedback Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Strengths */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="p-8 rounded-3xl bg-success/5 border border-success/20 backdrop-blur-sm"
          >
            <h3 className="text-lg font-bold mb-4 flex items-center gap-2 text-success">
              <CheckCircle2 className="w-5 h-5" /> Strengths
            </h3>
            <ul className="space-y-3">
              {report.strengths.length > 0
                ? report.strengths.map((s: string, i: number) => (
                    <li key={i} className="text-sm text-text-secondary">{s}</li>
                  ))
                : <li className="text-sm text-text-muted italic">No specific strengths identified.</li>
              }
            </ul>
          </motion.div>

          {/* Weaknesses */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="p-8 rounded-3xl bg-error/5 border border-error/20 backdrop-blur-sm"
          >
            <h3 className="text-lg font-bold mb-4 flex items-center gap-2 text-error">
              <XCircle className="w-5 h-5" /> Weaknesses
            </h3>
            <ul className="space-y-3">
              {report.weaknesses.length > 0
                ? report.weaknesses.map((w: string, i: number) => (
                    <li key={i} className="text-sm text-text-secondary">{w}</li>
                  ))
                : <li className="text-sm text-text-muted italic">No major weaknesses found.</li>
              }
            </ul>
          </motion.div>

          {/* Suggestions */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="p-8 rounded-3xl bg-warning/5 border border-warning/20 backdrop-blur-sm"
          >
            <h3 className="text-lg font-bold mb-4 flex items-center gap-2 text-warning">
              <Lightbulb className="w-5 h-5" /> Suggestions
            </h3>
            <ul className="space-y-3">
              {report.suggestions.length > 0
                ? report.suggestions.map((s: string, i: number) => (
                    <li key={i} className="text-sm text-text-secondary">{s}</li>
                  ))
                : <li className="text-sm text-text-muted italic">Keep up the good work!</li>
              }
            </ul>
          </motion.div>
        </div>

        {/* Actions */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center pt-4">
          <button
            onClick={() => navigate('/interview/select')}
            className="flex items-center justify-center gap-2 px-8 py-4 rounded-2xl bg-accent font-bold hover:bg-accent-hover transition-all hover:shadow-[0_0_30px_rgba(0,173,181,0.3)] text-white"
          >
            <RotateCcw className="w-5 h-5" />
            Try Again
          </button>
          <button
            onClick={() => navigate('/dashboard')}
            className="flex items-center justify-center gap-2 px-8 py-4 rounded-2xl bg-secondary border border-white/10 font-bold hover:bg-card transition-all text-text-primary"
          >
            <LayoutDashboard className="w-5 h-5" />
            Dashboard
          </button>
        </div>
      </div>
    </div>
  );
};

export default ResultsPage;

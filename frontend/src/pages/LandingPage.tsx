import React from 'react';
import { 
  Mic, 
  Video, 
  BrainCircuit, 
  BarChart3, 
  ChevronRight, 
  Play, 
  ShieldCheck, 
  Sparkles,
  UserCheck,
  Zap
} from 'lucide-react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';

const LandingPage = () => {
  return (
    <div className="min-h-screen bg-primary text-text-primary selection:bg-accent/30 selection:text-accent font-sans overflow-x-hidden">
      {/* Background Glows */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-[10%] -left-[10%] w-[40%] h-[40%] rounded-full bg-accent/10 blur-[120px]" />
        <div className="absolute top-[20%] -right-[5%] w-[30%] h-[30%] rounded-full bg-accent-light/10 blur-[100px]" />
        <div className="absolute -bottom-[5%] left-[20%] w-[35%] h-[35%] rounded-full bg-accent/10 blur-[120px]" />
      </div>

      {/* Hero Section */}
      <main className="relative z-10 px-6 pt-20 pb-32 max-w-7xl mx-auto text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-accent/10 border border-accent/20 text-accent text-xs font-bold mb-8 tracking-wider uppercase">
            <Sparkles className="w-3 h-3" />
            AI-Powered Interview Simulation
          </div>
          
          <h1 className="text-5xl md:text-7xl font-extrabold tracking-tight mb-8 max-w-4xl mx-auto leading-[1.1]">
            Master Your Next Interview with <br />
            <span className="bg-gradient-to-r from-accent via-accent-light to-accent bg-clip-text text-transparent">
              Advanced AI Intelligence
            </span>
          </h1>
          
          <p className="text-lg md:text-xl text-text-secondary max-w-2xl mx-auto mb-12 leading-relaxed">
            Real-time behavioral analysis, semantic scoring, and emotional intelligence tracking. NeuroVoxis prepares you for high-stakes roles with data-driven feedback.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link to="/register" className="group relative px-8 py-4 rounded-full bg-accent font-bold hover:bg-accent-hover transition-all hover:shadow-[0_0_40px_rgba(0,173,181,0.3)] flex items-center gap-2 overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/10 to-white/0 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700" />
              Start Free Session
              <ChevronRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </Link>
            <button className="px-8 py-4 rounded-full bg-white/5 border border-white/10 font-bold hover:bg-white/10 transition-all flex items-center gap-2 backdrop-blur-md">
              <Play className="w-5 h-5 fill-current" />
              Watch Demo
            </button>
          </div>
        </motion.div>

        {/* Floating Feature Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-32 text-left">
          {[
            {
              icon: <Video className="w-6 h-6 text-accent" />,
              title: "Behavioral AI",
              desc: "MediaPipe-powered tracking for eye contact, posture, and facial expressions."
            },
            {
              icon: <Mic className="w-6 h-6 text-accent-light" />,
              title: "Vocal Analysis",
              desc: "Deep analysis of speaking rate, pauses, and energy levels using Librosa."
            },
            {
              icon: <BrainCircuit className="w-6 h-6 text-accent" />,
              title: "Semantic Scoring",
              desc: "Advanced NLP evaluation that understands the meaning, not just keywords."
            }
          ].map((feature, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 + (i * 0.1) }}
              className="p-8 rounded-3xl bg-card/20 border border-white/5 backdrop-blur-sm hover:bg-card/40 hover:border-accent/30 transition-all group cursor-default"
            >
              <div className="w-12 h-12 rounded-2xl bg-white/5 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                {feature.icon}
              </div>
              <h3 className="text-xl font-bold mb-3">{feature.title}</h3>
              <p className="text-text-muted leading-relaxed text-sm">
                {feature.desc}
              </p>
            </motion.div>
          ))}
        </div>

        {/* Stats Section */}
        <div className="mt-32 p-1 bg-gradient-to-r from-accent/20 via-accent-light/20 to-accent/20 rounded-[2.5rem]">
          <div className="bg-secondary rounded-[2.4rem] p-12 md:p-20 flex flex-col md:flex-row items-center justify-between gap-12 border border-white/5">
            <div className="text-left max-w-md">
              <h2 className="text-3xl font-bold mb-6 italic leading-tight">
                "NeuroVoxis helped me land a Senior Dev role at Google. The feedback was insanely accurate."
              </h2>
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-full bg-gradient-to-tr from-accent to-accent-light" />
                <div>
                  <p className="font-bold text-text-primary">Alex Chen</p>
                  <p className="text-sm text-text-muted">Software Engineer @ Google</p>
                </div>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-8">
              <div className="text-center md:text-left">
                <p className="text-4xl font-black mb-1 bg-gradient-to-b from-white to-white/50 bg-clip-text text-transparent">85%</p>
                <p className="text-xs text-text-muted font-bold uppercase tracking-widest">Success Rate</p>
              </div>
              <div className="text-center md:text-left">
                <p className="text-4xl font-black mb-1 bg-gradient-to-b from-white to-white/50 bg-clip-text text-transparent">10k+</p>
                <p className="text-xs text-text-muted font-bold uppercase tracking-widest">Interviews</p>
              </div>
              <div className="text-center md:text-left">
                <p className="text-4xl font-black mb-1 bg-gradient-to-b from-white to-white/50 bg-clip-text text-transparent">50+</p>
                <p className="text-xs text-text-muted font-bold uppercase tracking-widest">Job Roles</p>
              </div>
              <div className="text-center md:text-left">
                <p className="text-4xl font-black mb-1 bg-gradient-to-b from-white to-white/50 bg-clip-text text-transparent">4.9/5</p>
                <p className="text-xs text-text-muted font-bold uppercase tracking-widest">User Rating</p>
              </div>
            </div>
          </div>
        </div>

        {/* Feature Grid */}
        <section className="mt-40 text-left">
          <h2 className="text-4xl font-bold mb-16 text-center">Built for Professional Excellence</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            <div className="flex gap-6">
              <div className="flex-shrink-0 w-12 h-12 rounded-full bg-accent/10 flex items-center justify-center border border-accent/20">
                <UserCheck className="w-6 h-6 text-accent" />
              </div>
              <div>
                <h4 className="text-xl font-bold mb-3">Role-Specific Questions</h4>
                <p className="text-text-muted leading-relaxed">Tailored question sets for Technical, Management, HR, and Sales roles powered by specialized datasets.</p>
              </div>
            </div>
            <div className="flex gap-6">
              <div className="flex-shrink-0 w-12 h-12 rounded-full bg-accent-light/10 flex items-center justify-center border border-accent-light/20">
                <BarChart3 className="w-6 h-6 text-accent-light" />
              </div>
              <div>
                <h4 className="text-xl font-bold mb-3">Instant Breakdown</h4>
                <p className="text-text-muted leading-relaxed">Get a 3-axis score: Answer Quality, Confidence, and Communication skills immediately after finishing.</p>
              </div>
            </div>
            <div className="flex gap-6">
              <div className="flex-shrink-0 w-12 h-12 rounded-full bg-accent/10 flex items-center justify-center border border-accent/20">
                <ShieldCheck className="w-6 h-6 text-accent" />
              </div>
              <div>
                <h4 className="text-xl font-bold mb-3">Privacy First</h4>
                <p className="text-text-muted leading-relaxed">Your data is processed securely. We use local AI models where possible to ensure your interviews stay private.</p>
              </div>
            </div>
            <div className="flex gap-6">
              <div className="flex-shrink-0 w-12 h-12 rounded-full bg-accent-light/10 flex items-center justify-center border border-accent-light/20">
                <Zap className="w-6 h-6 text-accent-light" />
              </div>
              <div>
                <h4 className="text-xl font-bold mb-3">Real-time Simulation</h4>
                <p className="text-text-muted leading-relaxed">Interactive UI that simulates a real video call environment to build comfort and reduce anxiety.</p>
              </div>
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="mt-40 border-t border-white/5 py-12 px-6">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-8">
          <div className="flex items-center gap-2 opacity-50">
            <BrainCircuit className="w-6 h-6" />
            <span className="text-xl font-bold">NeuroVoxis</span>
          </div>
          <p className="text-text-muted text-sm">© 2026 NeuroVoxis AI. All rights reserved.</p>
          <div className="flex gap-6 text-text-muted text-sm">
            <a href="#" className="hover:text-text-primary">Privacy</a>
            <a href="#" className="hover:text-text-primary">Terms</a>
            <a href="#" className="hover:text-text-primary">Contact</a>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default LandingPage;

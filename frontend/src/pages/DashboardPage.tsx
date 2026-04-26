import React from 'react';
import { motion } from 'framer-motion';
import { 
  Play, 
  History, 
  TrendingUp, 
  Award, 
  Clock, 
  ChevronRight,
  Plus
} from 'lucide-react';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

const data = [
  { name: 'Int 1', score: 65 },
  { name: 'Int 2', score: 72 },
  { name: 'Int 3', score: 68 },
  { name: 'Int 4', score: 85 },
  { name: 'Int 5', score: 82 },
];

const DashboardPage = () => {
  const { user } = useAuth();

  return (
    <div className="max-w-7xl mx-auto px-6 py-12">
      <header className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-12">
        <div>
          <h1 className="text-4xl font-bold mb-2">Welcome back, {user?.username}</h1>
          <p className="text-white/40">Ready to sharpen your skills today?</p>
        </div>
        <Link 
          to="/interview/select" 
          className="flex items-center gap-2 px-6 py-4 rounded-2xl bg-accent font-bold hover:bg-accent-hover transition-all hover:shadow-[0_0_30px_rgba(0,173,181,0.3)] self-start"
        >
          <Plus className="w-5 h-5 text-white" />
          <span className="text-white">Start New Interview</span>
        </Link>
      </header>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
        {[
          { label: 'Average Score', value: user?.average_score || '0', icon: <TrendingUp className="text-success" />, color: 'success' },
          { label: 'Interviews Done', value: user?.total_interviews || '0', icon: <History className="text-accent" />, color: 'accent' },
          { label: 'Skill Level', value: 'Intermediate', icon: <Award className="text-accent-light" />, color: 'accent-light' },
        ].map((stat, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1 }}
            className="p-8 rounded-3xl bg-card/20 border border-white/10 backdrop-blur-sm"
          >
            <div className="flex items-center justify-between mb-4">
              <span className="text-sm font-medium text-text-secondary uppercase tracking-widest">{stat.label}</span>
              <div className={`w-10 h-10 rounded-xl bg-${stat.color}/10 flex items-center justify-center border border-${stat.color}/20`}>
                {stat.icon}
              </div>
            </div>
            <div className="text-3xl font-bold text-text-primary">{stat.value}</div>
          </motion.div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Progress Chart */}
        <div className="lg:col-span-2 p-8 rounded-[2.5rem] bg-card/20 border border-white/10 backdrop-blur-sm">
          <h3 className="text-xl font-bold mb-8 text-text-primary">Performance Trend</h3>
          <div className="h-[300px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={data}>
                <CartesianGrid strokeDasharray="3 3" stroke="#ffffff10" vertical={false} />
                <XAxis dataKey="name" stroke="#B0BEC5" fontSize={12} tickLine={false} axisLine={false} />
                <YAxis stroke="#B0BEC5" fontSize={12} tickLine={false} axisLine={false} />
                <Tooltip 
                  contentStyle={{ backgroundColor: '#2C394B', border: '1px solid #ffffff10', borderRadius: '12px' }}
                  itemStyle={{ color: '#00ADB5' }}
                />
                <Line type="monotone" dataKey="score" stroke="#00ADB5" strokeWidth={3} dot={{ fill: '#00ADB5', strokeWidth: 2, r: 4 }} activeDot={{ r: 6, strokeWidth: 0 }} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Recent History */}
        <div className="p-8 rounded-[2.5rem] bg-card/20 border border-white/10 backdrop-blur-sm">
          <div className="flex items-center justify-between mb-8">
            <h3 className="text-xl font-bold text-text-primary">Recent Activity</h3>
            <Link to="#" className="text-sm text-accent hover:text-accent-hover transition-colors">View All</Link>
          </div>
          <div className="space-y-6">
            {[1, 2, 3].map((_, i) => (
              <div key={i} className="flex items-center gap-4 group cursor-pointer">
                <div className="w-12 h-12 rounded-2xl bg-white/5 flex items-center justify-center border border-white/10 group-hover:border-accent/30 transition-all">
                  <Clock className="w-5 h-5 text-text-secondary group-hover:text-accent" />
                </div>
                <div className="flex-1">
                  <p className="font-bold text-sm mb-1 text-text-primary">Python Developer</p>
                  <p className="text-xs text-text-muted">2 days ago • 15 mins</p>
                </div>
                <div className="text-right">
                  <p className="font-bold text-sm text-accent">82%</p>
                  <p className="text-[10px] text-text-muted uppercase font-bold tracking-widest">Score</p>
                </div>
              </div>
            ))}
            <div className="pt-4 border-t border-white/5">
              <p className="text-center text-sm text-text-muted italic">More activity will appear here as you practice.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardPage;

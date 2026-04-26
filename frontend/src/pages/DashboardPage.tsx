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
          className="flex items-center gap-2 px-6 py-4 rounded-2xl bg-purple-600 font-bold hover:bg-purple-500 transition-all hover:shadow-[0_0_30px_rgba(147,51,234,0.3)] self-start"
        >
          <Plus className="w-5 h-5" />
          Start New Interview
        </Link>
      </header>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
        {[
          { label: 'Average Score', value: user?.average_score || '0', icon: <TrendingUp className="text-emerald-400" />, color: 'emerald' },
          { label: 'Interviews Done', value: user?.total_interviews || '0', icon: <History className="text-blue-400" />, color: 'blue' },
          { label: 'Skill Level', value: 'Intermediate', icon: <Award className="text-purple-400" />, color: 'purple' },
        ].map((stat, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1 }}
            className="p-8 rounded-3xl bg-white/[0.03] border border-white/10 backdrop-blur-sm"
          >
            <div className="flex items-center justify-between mb-4">
              <span className="text-sm font-medium text-white/40 uppercase tracking-widest">{stat.label}</span>
              <div className={`w-10 h-10 rounded-xl bg-${stat.color}-500/10 flex items-center justify-center border border-${stat.color}-500/20`}>
                {stat.icon}
              </div>
            </div>
            <div className="text-3xl font-bold">{stat.value}</div>
          </motion.div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Progress Chart */}
        <div className="lg:col-span-2 p-8 rounded-[2.5rem] bg-white/[0.03] border border-white/10 backdrop-blur-sm">
          <h3 className="text-xl font-bold mb-8">Performance Trend</h3>
          <div className="h-[300px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={data}>
                <CartesianGrid strokeDasharray="3 3" stroke="#ffffff10" vertical={false} />
                <XAxis dataKey="name" stroke="#ffffff40" fontSize={12} tickLine={false} axisLine={false} />
                <YAxis stroke="#ffffff40" fontSize={12} tickLine={false} axisLine={false} />
                <Tooltip 
                  contentStyle={{ backgroundColor: '#1a1a1c', border: '1px solid #ffffff10', borderRadius: '12px' }}
                  itemStyle={{ color: '#a855f7' }}
                />
                <Line type="monotone" dataKey="score" stroke="#a855f7" strokeWidth={3} dot={{ fill: '#a855f7', strokeWidth: 2, r: 4 }} activeDot={{ r: 6, strokeWidth: 0 }} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Recent History */}
        <div className="p-8 rounded-[2.5rem] bg-white/[0.03] border border-white/10 backdrop-blur-sm">
          <div className="flex items-center justify-between mb-8">
            <h3 className="text-xl font-bold">Recent Activity</h3>
            <Link to="#" className="text-sm text-purple-400 hover:text-purple-300 transition-colors">View All</Link>
          </div>
          <div className="space-y-6">
            {[1, 2, 3].map((_, i) => (
              <div key={i} className="flex items-center gap-4 group cursor-pointer">
                <div className="w-12 h-12 rounded-2xl bg-white/5 flex items-center justify-center border border-white/10 group-hover:border-purple-500/30 transition-all">
                  <Clock className="w-5 h-5 text-white/40 group-hover:text-purple-400" />
                </div>
                <div className="flex-1">
                  <p className="font-bold text-sm mb-1">Python Developer</p>
                  <p className="text-xs text-white/30">2 days ago • 15 mins</p>
                </div>
                <div className="text-right">
                  <p className="font-bold text-sm text-purple-400">82%</p>
                  <p className="text-[10px] text-white/20 uppercase font-bold tracking-widest">Score</p>
                </div>
              </div>
            ))}
            <div className="pt-4 border-t border-white/5">
              <p className="text-center text-sm text-white/20 italic">More activity will appear here as you practice.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardPage;

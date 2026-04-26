import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { 
  Code2, 
  BarChart, 
  Users, 
  ChevronRight, 
  Loader2,
  Terminal,
  Database,
  Search
} from 'lucide-react';
import client from '../api/client';

interface Role {
  id: number;
  name: string;
  slug: string;
  description: string;
  icon: string;
}

const iconMap: Record<string, any> = {
  Code2: Code2,
  BarChart: BarChart,
  Users: Users,
  Terminal: Terminal,
  Database: Database,
  Search: Search
};

const RoleSelectPage = () => {
  const [roles, setRoles] = useState<Role[]>([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchRoles = async () => {
      try {
        const res = await client.get('interviews/roles/');
        setRoles(res.data);
      } catch (err) {
        console.error('Failed to fetch roles', err);
      } finally {
        setLoading(false);
      }
    };
    fetchRoles();
  }, []);

  const handleSelect = (roleId: number) => {
    navigate('/interview/room', { state: { roleId } });
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Loader2 className="w-12 h-12 text-purple-500 animate-spin" />
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-6 py-12">
      <div className="text-center mb-16">
        <h1 className="text-4xl font-bold mb-4">Choose Your Path</h1>
        <p className="text-white/40 max-w-xl mx-auto">Select a job role to begin your simulated interview. Our AI will tailor the questions specifically for this position.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {roles.map((role, i) => {
          const IconComponent = iconMap[role.icon] || Code2;
          return (
            <motion.div
              key={role.id}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: i * 0.1 }}
              whileHover={{ y: -10 }}
              onClick={() => handleSelect(role.id)}
              className="p-8 rounded-[2.5rem] bg-white/[0.03] border border-white/10 backdrop-blur-sm hover:bg-white/[0.05] hover:border-purple-500/30 transition-all cursor-pointer group"
            >
              <div className="w-16 h-16 rounded-2xl bg-purple-500/10 flex items-center justify-center mb-8 border border-purple-500/20 group-hover:scale-110 transition-transform duration-300">
                <IconComponent className="w-8 h-8 text-purple-400" />
              </div>
              <h3 className="text-2xl font-bold mb-4">{role.name}</h3>
              <p className="text-white/40 text-sm leading-relaxed mb-8">
                {role.description}
              </p>
              <div className="flex items-center text-purple-400 font-bold text-sm group-hover:gap-2 transition-all">
                Select Role
                <ChevronRight className="w-4 h-4" />
              </div>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
};

export default RoleSelectPage;

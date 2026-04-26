import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { BrainCircuit, LogOut, User as UserIcon } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

const Navbar = () => {
  const { isAuthenticated, logout, user } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <nav className="relative z-50 flex items-center justify-between px-6 py-6 max-w-7xl mx-auto">
      <Link to="/" className="flex items-center gap-2 group cursor-pointer">
        <div className="relative">
          <BrainCircuit className="w-8 h-8 text-purple-500 group-hover:scale-110 transition-transform duration-300" />
          <div className="absolute inset-0 bg-purple-500/20 blur-lg rounded-full group-hover:bg-purple-500/40 transition-colors" />
        </div>
        <span className="text-2xl font-bold tracking-tight bg-gradient-to-r from-white to-white/60 bg-clip-text text-transparent">
          NeuroVoxis
        </span>
      </Link>
      
      <div className="flex items-center gap-4 md:gap-8 text-sm font-medium">
        {!isAuthenticated ? (
          <>
            <div className="hidden md:flex items-center gap-8 text-white/60">
              <a href="#features" className="hover:text-white transition-colors">Features</a>
              <a href="#how-it-works" className="hover:text-white transition-colors">How it works</a>
            </div>
            <Link to="/login" className="px-5 py-2.5 rounded-full bg-white/5 border border-white/10 text-sm font-semibold hover:bg-white/10 transition-all active:scale-95 backdrop-blur-sm">
              Login
            </Link>
            <Link to="/register" className="px-5 py-2.5 rounded-full bg-purple-600 text-sm font-semibold hover:bg-purple-500 transition-all active:scale-95">
              Sign Up
            </Link>
          </>
        ) : (
          <>
            <Link to="/dashboard" className="text-white/60 hover:text-white transition-colors">Dashboard</Link>
            <div className="flex items-center gap-3 pl-4 border-l border-white/10">
              <div className="w-8 h-8 rounded-full bg-purple-500/10 flex items-center justify-center border border-purple-500/20">
                <UserIcon className="w-4 h-4 text-purple-400" />
              </div>
              <span className="hidden md:inline text-white/80">{user?.username}</span>
              <button onClick={handleLogout} className="p-2 hover:bg-white/5 rounded-full transition-colors group" title="Logout">
                <LogOut className="w-4 h-4 text-white/40 group-hover:text-red-400" />
              </button>
            </div>
          </>
        )}
      </div>
    </nav>
  );
};

export default Navbar;

import React, { createContext, useContext, useState, useEffect } from 'react';
import client from '../api/client';

interface User {
  username: string;
  email: string;
  target_role?: string;
  total_interviews?: number;
  average_score?: number;
}

interface AuthContextType {
  user: User | null;
  loading: boolean;
  login: (tokens: { access: string; refresh: string; user: any }) => void;
  logout: () => void;
  isAuthenticated: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProfile = async () => {
      const token = localStorage.getItem('access_token');
      if (token) {
        try {
          const res = await client.get('auth/profile/');
          setUser(res.data);
        } catch (err) {
          console.error('Failed to fetch profile', err);
        }
      }
      setLoading(false);
    };
    fetchProfile();
  }, []);

  const login = (data: { access: string; refresh: string; user: any }) => {
    localStorage.setItem('access_token', data.access);
    localStorage.setItem('refresh_token', data.refresh);
    setUser(data.user);
  };

  const logout = () => {
    localStorage.removeItem('access_token');
    localStorage.removeItem('refresh_token');
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, loading, login, logout, isAuthenticated: !!user }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import ProtectedRoute from './components/ProtectedRoute';
import Navbar from './components/Navbar';

// Pages
import LandingPage from './pages/LandingPage';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import DashboardPage from './pages/DashboardPage';
import RoleSelectPage from './pages/RoleSelectPage';
import InterviewRoom from './pages/InterviewRoom';

const App = () => {
  return (
    <AuthProvider>
      <Router>
        <div className="min-h-screen bg-[#0a0a0c] text-white selection:bg-purple-500/30 selection:text-purple-200 font-sans overflow-x-hidden">
          {/* Global Background Glows */}
          <div className="fixed inset-0 overflow-hidden pointer-events-none">
            <div className="absolute -top-[10%] -left-[10%] w-[40%] h-[40%] rounded-full bg-purple-600/10 blur-[120px]" />
            <div className="absolute top-[20%] -right-[5%] w-[30%] h-[30%] rounded-full bg-blue-600/10 blur-[100px]" />
            <div className="absolute -bottom-[5%] left-[20%] w-[35%] h-[35%] rounded-full bg-indigo-600/10 blur-[120px]" />
          </div>

          <Navbar />
          
          <Routes>
            <Route path="/" element={<LandingPage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/register" element={<RegisterPage />} />
            
            {/* Protected Routes */}
            <Route element={<ProtectedRoute />}>
              <Route path="/dashboard" element={<DashboardPage />} />
              <Route path="/interview/select" element={<RoleSelectPage />} />
              <Route path="/interview/room" element={<InterviewRoom />} />
            </Route>
          </Routes>
        </div>
      </Router>
    </AuthProvider>
  );
};

export default App;

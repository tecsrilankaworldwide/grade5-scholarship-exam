import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../AuthContext';
import { BookOpen, Mail, Lock, User, Award } from 'lucide-react';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      await login(email, password);
      navigate('/dashboard');
    } catch (err) {
      setError(err.response?.data?.detail || 'Login failed. Please check your credentials.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#FFFBF0] bg-dotted-grid noise-soft">
      {/* Decorative gradient band */}
      <div className="absolute top-0 left-0 right-0 h-24 bg-gradient-to-b from-[#FFF7E5] via-[#FFF1CC] to-transparent opacity-60"></div>
      
      <div className="max-w-md w-full px-4 sm:px-6 md:px-12 lg:pl-48 xl:pl-60 relative z-10">
        {/* Header */}
        <div className="text-center mb-10">
          <div className="w-20 h-20 md:w-24 md:h-24 bg-gradient-to-br from-[#F59E0B] to-[#D97706] rounded-3xl shadow-2xl flex items-center justify-center mx-auto mb-6 border-4 border-white ring-4 ring-[#F59E0B]/30">
            <Award className="w-10 h-10 md:w-12 md:h-12 text-white" />
          </div>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold mb-3 text-[#92400E] leading-tight" style={{fontFamily: 'Manrope, sans-serif', letterSpacing: '-0.02em'}}>
            Examination Bureau
          </h1>
          <div className="h-1 w-24 bg-gradient-to-r from-[#F59E0B] to-[#FCD34D] mx-auto mb-4 rounded-full"></div>
          <p className="text-xl md:text-2xl lg:text-3xl font-bold text-[#78350F] mb-2" style={{fontFamily: 'Manrope, sans-serif'}}>
            Grade 5 Scholarship Exam Portal
          </p>
          <p className="text-sm md:text-base mt-3 text-[#92400E] font-semibold flex items-center justify-center gap-2" style={{fontFamily: 'Figtree, sans-serif'}}>
            <span className="text-[#F59E0B]">★</span>
            Excellence in Education Since 1982
            <span className="text-[#F59E0B]">★</span>
          </p>
        </div>

        {/* Login Card */}
        <div className="bg-white/95 rounded-3xl shadow-2xl p-6 md:p-10 border-3 border-[#F5E6B3] backdrop-blur-sm">
          <div className="flex items-center gap-4 mb-8">
            <div className="w-12 h-12 md:w-14 md:h-14 rounded-2xl flex items-center justify-center bg-gradient-to-br from-[#FFF7E5] to-[#FCD34D]/30 border-2 border-[#F59E0B]/20">
              <BookOpen className="w-6 h-6 md:w-7 md:h-7 text-[#F59E0B]" />
            </div>
            <h2 className="text-2xl md:text-3xl font-extrabold text-[#1F2937]" style={{fontFamily: 'Manrope, sans-serif'}}>Sign In to Your Account</h2>
          </div>

          {error && (
            <div className="mb-4 p-4 bg-red-50 border-2 border-red-300 rounded-xl text-red-700 text-sm">
              {error}
            </div>
          )}

          <form onSubmit={handleLogin} className="space-y-6">
            <div>
              <label className="block text-base font-bold text-[#374151] mb-3 flex items-center gap-2" style={{fontFamily: 'Figtree, sans-serif'}}>
                <Mail className="w-5 h-5 text-[#F59E0B]" />
                Parent/Guardian Email
              </label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="w-full px-5 py-4 border-3 border-[#F5E6B3] rounded-xl focus:outline-none focus:ring-4 focus:ring-[#F59E0B]/30 focus:border-[#F59E0B] transition-all text-base bg-white hover:border-[#F59E0B]/50"
                style={{fontSize: '16px', fontFamily: 'Figtree, sans-serif'}}
                placeholder="parent@email.com"
              />
              <p className="text-xs md:text-sm mt-2 text-[#92400E] flex items-center gap-1">
                <span className="text-[#F59E0B]">ℹ️</span>
                Students should use their parent's email
              </p>
            </div>

            <div>
              <label className="block text-base font-bold text-[#374151] mb-3 flex items-center gap-2" style={{fontFamily: 'Figtree, sans-serif'}}>
                <Lock className="w-5 h-5 text-[#F59E0B]" />
                Password
              </label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="w-full px-5 py-4 border-3 border-[#F5E6B3] rounded-xl focus:outline-none focus:ring-4 focus:ring-[#F59E0B]/30 focus:border-[#F59E0B] transition-all text-base bg-white hover:border-[#F59E0B]/50"
                style={{fontSize: '16px', fontFamily: 'Figtree, sans-serif'}}
                placeholder="Enter password"
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full py-4 md:py-5 text-white text-lg md:text-xl font-extrabold rounded-xl shadow-xl hover:shadow-2xl transition-all disabled:opacity-50 bg-gradient-to-r from-[#F59E0B] via-[#F59E0B] to-[#D97706] hover:from-[#D97706] hover:to-[#B45309] transform hover:scale-[1.02] active:scale-[0.98]"
              style={{fontFamily: 'Manrope, sans-serif', letterSpacing: '0.01em'}}
            >
              {loading ? (
                <span className="flex items-center justify-center gap-3">
                  <div className="spinner-small"></div>
                  Signing In...
                </span>
              ) : (
                <span className="flex items-center justify-center gap-2">
                  Sign In to Portal
                  <span className="text-2xl">→</span>
                </span>
              )}
            </button>
          </form>

          <p className="text-center text-sm text-gray-600 mt-6">
            Need help? Contact your administrator
          </p>
        </div>

        {/* Footer */}
        <div className="text-center mt-8 text-yellow-800">
          <p className="text-sm font-semibold">Examination Evaluation Bureau (Pvt.) Ltd</p>
          <p className="text-xs mt-1">Building Future Scholars</p>
        </div>
      </div>
    </div>
  );
};

export default Login;

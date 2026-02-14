import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../AuthContext';
import { BookOpen, Mail, Lock } from 'lucide-react';
import EducationReformsLogo from '../components/EducationReformsLogo';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const { login } = useAuth();

  const handleLogin = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      await login(email, password);
    } catch (err) {
      setError(err.response?.data?.detail || 'Invalid credentials');
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen relative overflow-hidden">
      {/* Vibrant gradient background with patterns */}
      <div className="absolute inset-0 bg-gradient-to-br from-[#FFF4E6] via-[#FFE5B4] to-[#FFF9E6]"></div>
      <div className="absolute inset-0 bg-stars-soft opacity-40"></div>
      <div className="absolute inset-0 bg-dotted-grid opacity-30"></div>
      
      {/* Decorative circles */}
      <div className="absolute top-10 left-10 w-32 h-32 bg-[#FCD34D] rounded-full opacity-20 blur-3xl"></div>
      <div className="absolute bottom-20 right-20 w-48 h-48 bg-[#F59E0B] rounded-full opacity-20 blur-3xl"></div>
      <div className="absolute top-1/2 left-1/3 w-24 h-24 bg-[#FCD34D] rounded-full opacity-10 blur-2xl"></div>
      
      <div className="relative z-10 min-h-screen flex items-center justify-center px-4 sm:px-6 md:px-12 lg:pl-48 xl:pl-60 py-12">
        <div className="max-w-2xl w-full">
          {/* HUGE Custom Logo Header */}
          <div className="mb-12">
            <EducationReformsLogo size="large" />
          </div>

          {/* Subtitle */}
          <div className="text-center mb-10">
            <p className="text-2xl md:text-3xl font-extrabold text-[#78350F] mb-4" style={{fontFamily: 'Manrope, sans-serif'}}>
              Grade 5 Scholarship Exam Portal
            </p>
            <div className="inline-flex items-center gap-2 px-5 py-2 bg-white/70 backdrop-blur-sm rounded-full shadow-md border-2 border-[#FCD34D]">
              <span className="text-lg">🎯</span>
              <p className="text-base md:text-lg font-semibold text-[#92400E]" style={{fontFamily: 'Figtree, sans-serif'}}>
                Excellence in Education Since 1982
              </p>
            </div>
          </div>

          {/* Login Card with dramatic styling */}
          <div className="bg-white rounded-3xl shadow-2xl p-8 md:p-12 border-4 border-[#F59E0B] transform hover:scale-[1.01] transition-transform duration-300">
            {/* Card Header */}
            <div className="text-center mb-8">
              <div className="inline-flex items-center gap-3 px-6 py-3 bg-gradient-to-r from-[#FFF7E5] to-[#FED7AA] rounded-2xl border-3 border-[#F59E0B] mb-4">
                <BookOpen className="w-7 h-7 text-[#F59E0B]" />
                <h2 className="text-3xl md:text-4xl font-black text-[#92400E]" style={{fontFamily: 'Manrope, sans-serif'}}>Sign In</h2>
              </div>
              <p className="text-lg md:text-xl text-[#78350F] font-semibold">Welcome back to your learning portal!</p>
            </div>

            {error && (
              <div className="mb-6 p-5 bg-red-50 border-4 border-red-300 rounded-2xl text-red-700 text-base font-semibold flex items-center gap-3">
                <span className="text-2xl">⚠️</span>
                {error}
              </div>
            )}

            <form onSubmit={handleLogin} className="space-y-7">
              <div>
                <label className="flex items-center gap-3 text-lg md:text-xl font-bold text-[#374151] mb-4" style={{fontFamily: 'Figtree, sans-serif'}}>
                  <div className="w-10 h-10 bg-[#FFF7E5] rounded-xl flex items-center justify-center border-2 border-[#F59E0B]">
                    <Mail className="w-5 h-5 text-[#F59E0B]" />
                  </div>
                  Parent/Guardian Email
                </label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className="w-full px-6 py-5 border-4 border-[#F5E6B3] rounded-2xl focus:outline-none focus:ring-4 focus:ring-[#F59E0B] focus:border-[#F59E0B] transition-all text-lg bg-white hover:border-[#F59E0B] font-medium"
                  style={{fontSize: '18px', fontFamily: 'Figtree, sans-serif'}}
                  placeholder="parent@email.com"
                />
                <p className="text-sm md:text-base mt-3 text-[#92400E] flex items-center gap-2 font-medium">
                  <span className="text-xl">ℹ️</span>
                  Students should use their parent's email
                </p>
              </div>

              <div>
                <label className="flex items-center gap-3 text-lg md:text-xl font-bold text-[#374151] mb-4" style={{fontFamily: 'Figtree, sans-serif'}}>
                  <div className="w-10 h-10 bg-[#FFF7E5] rounded-xl flex items-center justify-center border-2 border-[#F59E0B]">
                    <Lock className="w-5 h-5 text-[#F59E0B]" />
                  </div>
                  Password
                </label>
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  className="w-full px-6 py-5 border-4 border-[#F5E6B3] rounded-2xl focus:outline-none focus:ring-4 focus:ring-[#F59E0B] focus:border-[#F59E0B] transition-all text-lg bg-white hover:border-[#F59E0B] font-medium"
                  style={{fontSize: '18px', fontFamily: 'Figtree, sans-serif'}}
                  placeholder="Enter your password"
                />
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full py-6 md:py-7 text-white text-xl md:text-2xl font-black rounded-2xl shadow-2xl hover:shadow-3xl transition-all disabled:opacity-50 bg-gradient-to-r from-[#F59E0B] via-[#FB923C] to-[#F59E0B] hover:from-[#D97706] hover:to-[#EA580C] transform hover:scale-[1.02] active:scale-[0.98] border-4 border-white"
                style={{fontFamily: 'Manrope, sans-serif', letterSpacing: '0.02em'}}
              >
                {loading ? (
                  <span className="flex items-center justify-center gap-4">
                    <div className="spinner-small"></div>
                    <span>Signing You In...</span>
                  </span>
                ) : (
                  <span className="flex items-center justify-center gap-3">
                    <span className="text-3xl">🚀</span>
                    <span>Sign In to Portal</span>
                    <span className="text-3xl">→</span>
                  </span>
                )}
              </button>
            </form>

            {/* Footer */}
            <div className="mt-8 pt-6 border-t-3 border-[#F5E6B3] text-center">
              <p className="text-base md:text-lg text-[#78350F] font-semibold mb-2">Need help?</p>
              <p className="text-sm md:text-base text-[#92400E]">Contact your administrator</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;

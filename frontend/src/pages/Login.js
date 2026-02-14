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
      
      <div className="max-w-md w-full px-4 sm:px-6 md:px-8 md:pl-20 relative z-10">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="w-16 h-16 md:w-20 md:h-20 bg-white rounded-3xl shadow-lg flex items-center justify-center mx-auto mb-4 border-4 border-[#F59E0B]">
            <Award className="w-8 h-8 md:w-10 md:h-10 text-[#F59E0B]" />
          </div>
          <h1 className="text-3xl md:text-4xl font-extrabold mb-2 text-[#92400E]\" style={{fontFamily: 'Manrope, sans-serif'}}>Examination Bureau</h1>
          <p className="text-base md:text-lg font-semibold text-[#78350F]\">Grade 5 Scholarship Exam Portal</p>
          <p className="text-xs md:text-sm mt-2 text-[#92400E]\">Excellence in Education Since 1982</p>
        </div>

        {/* Login Card */}
        <div className="bg-white/95 rounded-3xl shadow-2xl p-6 md:p-8 border-2 border-[#F5E6B3]">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-10 h-10 md:w-12 md:h-12 rounded-2xl flex items-center justify-center bg-[#FFF7E5]">
              <BookOpen className="w-5 h-5 md:w-6 md:h-6 text-[#F59E0B]\" />
            </div>
            <h2 className="text-xl md:text-2xl font-bold text-[#1F2937]" style={{fontFamily: 'Manrope, sans-serif'}}>Sign In</h2>
          </div>

          {error && (
            <div className="mb-4 p-4 bg-red-50 border-2 border-red-300 rounded-xl text-red-700 text-sm">
              {error}
            </div>
          )}

          <form onSubmit={handleLogin} className="space-y-5">
            <div>
              <label className="block text-sm font-bold text-[#374151] mb-2" style={{fontFamily: 'Figtree, sans-serif'}}>
                <Mail className="inline w-4 h-4 mr-1" />
                Parent/Guardian Email
              </label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="w-full px-4 py-3 border-2 border-[#F5E6B3] rounded-xl focus:outline-none focus:ring-2 focus:ring-[#F59E0B] transition-all"
                style={{fontSize: '16px'}}
                placeholder="parent@email.com"
              />
              <p className="text-xs mt-1 text-[#92400E]">
                Students should use their parent's email
              </p>
            </div>

            <div>
              <label className="block text-sm font-bold text-[#374151] mb-2" style={{fontFamily: 'Figtree, sans-serif'}}>
                <Lock className="inline w-4 h-4 mr-1" />
                Password
              </label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="w-full px-4 py-3 border-2 border-[#F5E6B3] rounded-xl focus:outline-none focus:ring-2 focus:ring-[#F59E0B] transition-all"
                style={{fontSize: '16px'}}
                placeholder="Enter password"
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full py-3 md:py-4 text-white font-bold rounded-xl shadow-lg hover:shadow-xl transition-all disabled:opacity-50 bg-gradient-to-r from-[#F59E0B] to-[#D97706] hover:from-[#D97706] hover:to-[#B45309]"
              style={{fontSize: '16px', fontFamily: 'Manrope, sans-serif'}}
            >
              {loading ? 'Signing In...' : 'Sign In \u2192'}
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

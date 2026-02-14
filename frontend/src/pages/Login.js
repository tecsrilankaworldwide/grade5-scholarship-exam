import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../AuthContext';
import { Mail, Lock, ArrowRight } from 'lucide-react';
import AcademicLogo from '../components/AcademicLogo';

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
      {/* Simple professional background */}
      <div className="absolute inset-0 bg-gradient-to-br from-[#FFFBF0] to-[#FFF4E6]"></div>
      <div className="absolute inset-0 bg-lined-paper opacity-20"></div>
      
      <div className="relative z-10 min-h-screen flex items-center justify-center px-4 sm:px-6 md:px-12 lg:pl-48 xl:pl-60 py-12">
        <div className="max-w-xl w-full">
          {/* Academic Logo */}
          <div className="mb-10">
            <AcademicLogo size="large" />
          </div>

          {/* Subtitle */}
          <div className="text-center mb-8">
            <h2 className="text-2xl md:text-3xl font-bold text-[#1F2937] mb-2" style={{fontFamily: 'Manrope, sans-serif'}}>
              Grade 5 Scholarship Exam Portal
            </h2>
            <p className="text-base md:text-lg text-[#6B7280]">Official Online Examination System</p>
          </div>

          {/* Login Card - Professional styling */}
          <div className="bg-white rounded-2xl shadow-xl p-8 md:p-10 border-2 border-[#E5E7EB]">
            {/* Card Header */}
            <div className="mb-8">
              <h3 className="text-2xl md:text-3xl font-bold text-[#1F2937] mb-2" style={{fontFamily: 'Manrope, sans-serif'}}>Sign In</h3>
              <p className="text-base text-[#6B7280]">Enter your credentials to access the portal</p>
            </div>

            {error && (
              <div className="mb-6 p-4 bg-red-50 border-2 border-red-300 rounded-lg text-red-700 text-sm">
                <strong>Error:</strong> {error}
              </div>
            )}

            <form onSubmit={handleLogin} className="space-y-6">
              <div>
                <label className="block text-base font-semibold text-[#374151] mb-3" style={{fontFamily: 'Figtree, sans-serif'}}>
                  <Mail className="inline w-4 h-4 mr-2 text-[#F59E0B]" />
                  Parent/Guardian Email Address
                </label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className="w-full px-4 py-3 border-2 border-[#D1D5DB] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#F59E0B] focus:border-[#F59E0B] transition-all text-base bg-white"
                  style={{fontFamily: 'Figtree, sans-serif'}}
                  placeholder="parent@email.com"
                />
                <p className="text-sm mt-2 text-[#6B7280]">
                  Students must use their parent's registered email
                </p>
              </div>

              <div>
                <label className="block text-base font-semibold text-[#374151] mb-3" style={{fontFamily: 'Figtree, sans-serif'}}>
                  <Lock className="inline w-4 h-4 mr-2 text-[#F59E0B]" />
                  Password
                </label>
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  className="w-full px-4 py-3 border-2 border-[#D1D5DB] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#F59E0B] focus:border-[#F59E0B] transition-all text-base bg-white"
                  style={{fontFamily: 'Figtree, sans-serif'}}
                  placeholder="Enter your password"
                />
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full py-4 text-white text-lg font-bold rounded-lg shadow-md hover:shadow-lg transition-all disabled:opacity-50 bg-[#F59E0B] hover:bg-[#D97706] flex items-center justify-center gap-2"
                style={{fontFamily: 'Manrope, sans-serif'}}
              >
                {loading ? (
                  <span>Signing In...</span>
                ) : (
                  <>
                    <span>Sign In to Portal</span>
                    <ArrowRight className="w-5 h-5" />
                  </>
                )}
              </button>
            </form>

            {/* Footer */}
            <div className="mt-8 pt-6 border-t-2 border-[#E5E7EB] text-center">
              <p className="text-sm text-[#6B7280]">Need assistance? Contact your school administrator</p>
            </div>
          </div>
          
          {/* Footer note */}
          <div className="text-center mt-6">
            <p className="text-sm text-[#6B7280]">© 2024 Examination Bureau. All rights reserved.</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;

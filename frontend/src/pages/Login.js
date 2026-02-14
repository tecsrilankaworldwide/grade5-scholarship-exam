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
    <div className="min-h-screen flex items-center justify-center p-6" style={{background: 'linear-gradient(135deg, #FFF7E6 0%, #FFEFC7 50%, #FFFBF3 100%)'}}>
      <div className="max-w-md w-full">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="w-20 h-20 bg-white rounded-3xl shadow-lg flex items-center justify-center mx-auto mb-4" style={{border: '4px solid #F6A317'}}>
            <Award className="w-10 h-10" style={{color: '#F6A317'}} />
          </div>
          <h1 className="text-4xl font-extrabold mb-2" style={{color: '#8A4D12', fontFamily: 'Nunito, sans-serif'}}>Examination Bureau</h1>
          <p className="text-lg font-semibold" style={{color: '#6E3B0E'}}>Grade 5 Scholarship Exam Portal</p>
          <p className="text-sm mt-2" style={{color: '#8A4D12'}}>Excellence in Education Since 1982</p>
        </div>

        {/* Login Card */}
        <div className="bg-white rounded-3xl shadow-2xl p-8 border-4" style={{borderColor: '#FFD89A'}}>
          <div className="flex items-center gap-3 mb-6">
            <div className="w-12 h-12 rounded-2xl flex items-center justify-center" style={{background: '#FFF7E6'}}>
              <BookOpen className="w-6 h-6" style={{color: '#F6A317'}} />
            </div>
            <h2 className="text-2xl font-bold text-gray-800">Sign In</h2>
          </div>

          {error && (
            <div className="mb-4 p-4 bg-red-50 border-3 border-red-300 rounded-xl text-red-700">
              {error}
            </div>
          )}

          <form onSubmit={handleLogin} className="space-y-5">
            <div>
              <label className="block text-sm font-bold text-gray-700 mb-2">
                <Mail className="inline w-4 h-4 mr-1" />
                Parent/Guardian Email
              </label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="w-full px-4 py-3 border-3 rounded-xl focus:outline-none"
                style={{borderColor: '#FFD89A', fontSize: '16px'}}
                placeholder="parent@email.com"
              />
              <p className="text-xs mt-1" style={{color: '#8A4D12'}}>
                Students should use their parent's email
              </p>
            </div>

            <div>
              <label className="block text-sm font-bold text-gray-700 mb-2">
                <Lock className="inline w-4 h-4 mr-1" />
                Password
              </label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="w-full px-4 py-3 border-3 rounded-xl focus:outline-none"
                style={{borderColor: '#FFD89A', fontSize: '16px'}}
                placeholder="Enter password"
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full py-4 text-white font-bold rounded-full shadow-lg hover:shadow-xl transition-all hover:scale-105 disabled:opacity-50"
              style={{background: 'linear-gradient(135deg, #F6A317, #EB8F08)', fontSize: '18px', fontFamily: 'Nunito, sans-serif'}}
            >
              {loading ? 'Signing In...' : 'Sign In →'}
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

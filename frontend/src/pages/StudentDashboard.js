import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth, API } from '../AuthContext';
import axios from 'axios';
import { BookOpen, Clock, Award, TrendingUp, LogOut, FileText, Star, Sparkles } from 'lucide-react';

const StudentDashboard = () => {
  const { user, token, logout } = useAuth();
  const navigate = useNavigate();
  const [exams, setExams] = useState([]);
  const [attempts, setAttempts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadDashboardData();
  }, []);

  const loadDashboardData = async () => {
    try {
      const examsRes = await axios.get(`${API}/exams?grade=${user.grade}&status=published`);
      setExams(examsRes.data.exams || []);
      setAttempts([]);
      setLoading(false);
    } catch (error) {
      console.error('Failed to load dashboard:', error);
      setLoading(false);
    }
  };

  const getGradeDisplay = (grade) => {
    const gradeMap = {
      'grade_2': 'Grade 2',
      'grade_3': 'Grade 3',
      'grade_4': 'Grade 4',
      'grade_5': 'Grade 5'
    };
    return gradeMap[grade] || grade;
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-[#FFF4E6] to-[#FFE5B4]">
        <div className="text-center">
          <div className="spinner mb-4"></div>
          <p className="text-2xl font-bold text-[#92400E]">Loading your dashboard...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen relative overflow-hidden">
      {/* Vibrant Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-[#FFF9E6] via-[#FFF4E6] to-[#FFE5B4]"></div>
      <div className="absolute inset-0 bg-lined-paper opacity-30"></div>
      <div className="absolute inset-0 bg-stars-soft opacity-20"></div>
      
      {/* Decorative elements */}
      <div className="absolute top-20 right-10 w-40 h-40 bg-[#FCD34D] rounded-full opacity-10 blur-3xl"></div>
      <div className="absolute bottom-40 left-20 w-32 h-32 bg-[#F59E0B] rounded-full opacity-10 blur-3xl"></div>
      
      <div className="relative z-10">
        {/* HUGE Header */}
        <div className="bg-gradient-to-r from-[#F59E0B] via-[#FB923C] to-[#F59E0B] shadow-2xl border-b-8 border-[#92400E]">
          <div className="container mx-auto px-4 sm:px-6 md:px-12 lg:pl-48 xl:pl-60 py-8 md:py-10">
            <div className="flex flex-col md:flex-row justify-between items-center gap-6">
              <div className="flex items-center gap-5 md:gap-6">
                {/* Big Icon */}
                <div className="w-20 h-20 md:w-28 md:h-28 bg-white rounded-3xl flex items-center justify-center shadow-2xl border-4 border-[#92400E] transform rotate-3">
                  <BookOpen className="w-10 h-10 md:w-14 md:h-14 text-[#F59E0B]" strokeWidth={3} />
                </div>
                <div>
                  {/* HUGE Title */}
                  <h1 className="text-4xl md:text-6xl lg:text-7xl font-black text-white leading-none mb-2" style={{fontFamily: 'Manrope, sans-serif', letterSpacing: '-0.03em', textShadow: '4px 4px 8px rgba(0,0,0,0.3)'}}>
                    Student Dashboard
                  </h1>
                  {/* Big Welcome */}
                  <p className="text-xl md:text-3xl font-bold text-white flex items-center gap-3" style={{fontFamily: 'Figtree, sans-serif', textShadow: '2px 2px 4px rgba(0,0,0,0.2)'}}>
                    <span className="text-2xl md:text-4xl">👋</span>
                    Welcome, <span className="text-[#FCD34D]">{user.full_name}</span>!
                    <span className="text-2xl md:text-4xl">🎓</span>
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-3 md:gap-4">
                {/* Grade Badge */}
                <div className="px-6 md:px-8 py-4 md:py-5 bg-white rounded-2xl border-4 border-[#92400E] shadow-xl transform hover:scale-105 transition-transform">
                  <span className="font-black text-[#92400E] text-xl md:text-3xl" style={{fontFamily: 'Manrope, sans-serif'}}>{getGradeDisplay(user.grade)}</span>
                </div>
                {/* Logout Button */}
                <button
                  onClick={logout}
                  className="px-5 md:px-6 py-4 md:py-5 bg-white text-[#92400E] font-bold rounded-2xl hover:bg-[#FFF7E5] shadow-xl transition-all border-4 border-[#92400E] text-base md:text-lg"
                  style={{fontFamily: 'Manrope, sans-serif'}}
                >
                  <LogOut className="inline w-5 h-5 md:w-6 md:h-6 mr-2" />
                  <span className="hidden md:inline">Logout</span>
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="container mx-auto px-4 sm:px-6 md:px-12 lg:pl-48 xl:pl-60 py-8 md:py-12">
          {/* HUGE Stats Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8 mb-10 md:mb-12">
            {/* Available Exams */}
            <div className="bg-white rounded-3xl p-8 shadow-2xl border-4 border-[#F59E0B] transform hover:scale-105 hover:rotate-1 transition-all">
              <div className="flex items-center gap-4 mb-4">
                <div className="w-16 h-16 md:w-20 md:h-20 bg-gradient-to-br from-[#FFF7E5] to-[#FCD34D] rounded-2xl flex items-center justify-center border-3 border-[#F59E0B]">
                  <FileText className="w-8 h-8 md:w-10 md:h-10 text-[#F59E0B]" strokeWidth={3} />
                </div>
                <div>
                  <div className="text-5xl md:text-6xl font-black text-[#92400E]" style={{fontFamily: 'Manrope, sans-serif'}}>{exams.length}</div>
                  <div className="text-lg md:text-xl font-bold text-[#78350F]" style={{fontFamily: 'Figtree, sans-serif'}}>Available Exams</div>
                </div>
              </div>
              <div className="flex items-center gap-2 text-[#F59E0B]">
                <Sparkles className="w-5 h-5" />
                <span className="text-sm font-semibold">Ready to take!</span>
              </div>
            </div>

            {/* Completed */}
            <div className="bg-white rounded-3xl p-8 shadow-2xl border-4 border-[#10B981] transform hover:scale-105 hover:rotate-1 transition-all">
              <div className="flex items-center gap-4 mb-4">
                <div className="w-16 h-16 md:w-20 md:h-20 bg-gradient-to-br from-[#D1FAE5] to-[#6EE7B7] rounded-2xl flex items-center justify-center border-3 border-[#10B981]">
                  <Award className="w-8 h-8 md:w-10 md:h-10 text-[#10B981]" strokeWidth={3} />
                </div>
                <div>
                  <div className="text-5xl md:text-6xl font-black text-[#059669]" style={{fontFamily: 'Manrope, sans-serif'}}>{attempts.length}</div>
                  <div className="text-lg md:text-xl font-bold text-[#047857]" style={{fontFamily: 'Figtree, sans-serif'}}>Completed</div>
                </div>
              </div>
              <div className="flex items-center gap-2 text-[#10B981]">
                <span className="text-xl">🎉</span>
                <span className="text-sm font-semibold">Keep going!</span>
              </div>
            </div>

            {/* Avg Score */}
            <div className="bg-white rounded-3xl p-8 shadow-2xl border-4 border-[#3B82F6] transform hover:scale-105 hover:rotate-1 transition-all">
              <div className="flex items-center gap-4 mb-4">
                <div className="w-16 h-16 md:w-20 md:h-20 bg-gradient-to-br from-[#DBEAFE] to-[#93C5FD] rounded-2xl flex items-center justify-center border-3 border-[#3B82F6]">
                  <TrendingUp className="w-8 h-8 md:w-10 md:h-10 text-[#3B82F6]" strokeWidth={3} />
                </div>
                <div>
                  <div className="text-5xl md:text-6xl font-black text-[#1E40AF]" style={{fontFamily: 'Manrope, sans-serif'}}>-</div>
                  <div className="text-lg md:text-xl font-bold text-[#1E3A8A]" style={{fontFamily: 'Figtree, sans-serif'}}>Avg Score</div>
                </div>
              </div>
              <div className="flex items-center gap-2 text-[#3B82F6]">
                <span className="text-xl">📈</span>
                <span className="text-sm font-semibold">Track progress!</span>
              </div>
            </div>
          </div>

          {/* Exams Section */}
          <div className="bg-white rounded-3xl shadow-2xl p-8 md:p-12 border-4 border-[#F59E0B]">
            {/* Section Header */}
            <div className="flex items-center gap-4 mb-8 md:mb-10">
              <div className="flex items-center gap-3">
                <Star className="w-8 h-8 md:w-10 md:h-10 text-[#FCD34D]" fill="#FCD34D" />
                <h2 className="text-3xl md:text-5xl font-black text-[#92400E]" style={{fontFamily: 'Manrope, sans-serif', letterSpacing: '-0.02em'}}>
                  Available Monthly Exams
                </h2>
                <Star className="w-8 h-8 md:w-10 md:h-10 text-[#FCD34D]" fill="#FCD34D" />
              </div>
            </div>

            {exams.length === 0 ? (
              <div className="text-center py-16">
                <div className="text-8xl mb-6">📚</div>
                <p className="text-2xl md:text-3xl text-[#374151] font-bold mb-3">No exams available yet</p>
                <p className="text-lg md:text-xl text-[#6B7280]">Check back later or contact your teacher</p>
              </div>
            ) : (
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 md:gap-8">
                {exams.map(exam => (
                  <div
                    key={exam.id}
                    className="bg-gradient-to-br from-[#FFF7E5] via-white to-[#FFF7E5] rounded-3xl p-6 md:p-8 border-4 border-[#F5E6B3] shadow-xl hover:shadow-2xl transition-all transform hover:-translate-y-2 hover:scale-105"
                    data-testid={`exam-card-${exam.id}`}
                  >
                    {/* Exam Title */}
                    <h3 className="text-2xl md:text-3xl font-black mb-4 text-[#92400E]" style={{fontFamily: 'Manrope, sans-serif'}}>
                      {exam.title}
                    </h3>
                    
                    {/* Month Badge */}
                    <div className="inline-flex items-center gap-2 px-4 py-2 bg-[#FCD34D] rounded-full mb-4">
                      <span className="text-xl">📅</span>
                      <span className="text-base md:text-lg font-bold text-[#92400E]">Month: {exam.month}</span>
                    </div>
                    
                    {/* Exam Info */}
                    <div className="flex gap-4 md:gap-6 mb-6">
                      <div className="flex items-center gap-2 px-4 py-2 bg-white rounded-xl border-2 border-[#F59E0B]">
                        <Clock className="w-5 h-5 text-[#F59E0B]" />
                        <span className="text-base md:text-lg font-bold text-[#92400E]">{exam.duration_minutes} mins</span>
                      </div>
                      <div className="flex items-center gap-2 px-4 py-2 bg-white rounded-xl border-2 border-[#F59E0B]">
                        <FileText className="w-5 h-5 text-[#F59E0B]" />
                        <span className="text-base md:text-lg font-bold text-[#92400E]">{exam.paper1_questions?.length || 60} questions</span>
                      </div>
                    </div>

                    {/* Start Button */}
                    <button
                      onClick={() => navigate(`/exam/${exam.id}`)}
                      className="w-full py-5 md:py-6 bg-gradient-to-r from-[#F59E0B] via-[#FB923C] to-[#F59E0B] text-white text-xl md:text-2xl font-black rounded-2xl shadow-xl hover:shadow-2xl transition-all transform hover:scale-105 active:scale-95 border-4 border-white"
                      style={{fontFamily: 'Manrope, sans-serif'}}
                      data-testid={`start-exam-button-${exam.id}`}
                    >
                      <span className="flex items-center justify-center gap-3">
                        <span className="text-3xl">🚀</span>
                        Start Exam Now
                        <span className="text-3xl">→</span>
                      </span>
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default StudentDashboard;

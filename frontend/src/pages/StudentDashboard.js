import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth, API } from '../AuthContext';
import axios from 'axios';
import { BookOpen, Clock, Award, TrendingUp, LogOut, FileText, Star } from 'lucide-react';

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
      <div className="min-h-screen flex items-center justify-center bg-[#FFFBF0]">
        <div className="spinner"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#FFFBF0] bg-lined-paper">
      {/* Header with stars background */}
      <div className="bg-gradient-to-r from-[#FFF7E5] via-[#FFF1CC] to-[#FFF7E5] bg-stars-soft shadow-md border-b-4 border-[#F59E0B]">
        <div className="container mx-auto px-4 sm:px-6 md:px-8 md:pl-20 lg:pl-24 py-4">
          <div className="flex justify-between items-center">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-[#F59E0B] rounded-full flex items-center justify-center">
                <BookOpen className="w-6 h-6 text-white" />
              </div>
              <div>
                <h1 className="text-2xl md:text-3xl font-extrabold text-[#92400E]" style={{fontFamily: 'Manrope, sans-serif'}}>Student Dashboard</h1>
                <p className="text-sm md:text-base text-[#374151]">Welcome, {user.full_name}! 🎓</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <div className="px-3 md:px-4 py-2 bg-white rounded-xl border-2 border-[#F59E0B] shadow-sm">
                <span className="font-bold text-[#92400E] text-sm md:text-base">{getGradeDisplay(user.grade)}</span>
              </div>
              <button
                onClick={logout}
                className="px-3 md:px-4 py-2 bg-white text-[#374151] font-semibold rounded-xl hover:bg-[#FFF7E5] shadow-sm transition-colors"
              >
                <LogOut className="inline w-4 h-4 mr-1" />
                <span className="hidden md:inline">Logout</span>
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-4 sm:px-6 md:px-8 md:pl-20 lg:pl-24 py-6 md:py-8">
        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6 mb-6 md:mb-8">
          <div className="bg-white/95 rounded-2xl p-5 md:p-6 shadow-lg border border-[#F5E6B3] hover:shadow-xl transition-shadow">
            <div className="flex items-center gap-3 mb-2">
              <div className="w-10 h-10 md:w-12 md:h-12 bg-[#FFF7E5] rounded-xl flex items-center justify-center">
                <FileText className="w-5 h-5 md:w-6 md:h-6 text-[#F59E0B]" />
              </div>
              <div>
                <div className="text-2xl md:text-3xl font-extrabold text-[#92400E]" style={{fontFamily: 'Manrope, sans-serif'}}>{exams.length}</div>
                <div className="text-xs md:text-sm font-semibold text-[#374151]">Available Exams</div>
              </div>
            </div>
          </div>

          <div className="bg-white/95 rounded-2xl p-5 md:p-6 shadow-lg border border-[#F5E6B3] hover:shadow-xl transition-shadow">
            <div className="flex items-center gap-3 mb-2">
              <div className="w-10 h-10 md:w-12 md:h-12 bg-[#ECFDF5] rounded-xl flex items-center justify-center">
                <Award className="w-5 h-5 md:w-6 md:h-6 text-[#16A34A]" />
              </div>
              <div>
                <div className="text-2xl md:text-3xl font-extrabold text-[#16A34A]" style={{fontFamily: 'Manrope, sans-serif'}}>{attempts.length}</div>
                <div className="text-xs md:text-sm font-semibold text-[#374151]">Exams Completed</div>
              </div>
            </div>
          </div>

          <div className="bg-white/95 rounded-2xl p-5 md:p-6 shadow-lg border border-[#F5E6B3] hover:shadow-xl transition-shadow">
            <div className="flex items-center gap-3 mb-2">
              <div className="w-10 h-10 md:w-12 md:h-12 bg-[#EFF6FF] rounded-xl flex items-center justify-center">
                <TrendingUp className="w-5 h-5 md:w-6 md:h-6 text-[#3B82F6]" />
              </div>
              <div>
                <div className="text-2xl md:text-3xl font-extrabold text-[#3B82F6]" style={{fontFamily: 'Manrope, sans-serif'}}>-</div>
                <div className="text-xs md:text-sm font-semibold text-[#374151]">Avg Score</div>
              </div>
            </div>
          </div>
        </div>

        {/* Available Exams */}
        <div className="bg-white/95 rounded-3xl shadow-xl p-6 md:p-8 border-2 border-[#F5E6B3]">
          <div className="flex items-center gap-2 mb-6">
            <Star className="w-6 h-6 text-[#FCD34D]" fill="#FCD34D" />
            <h2 className="text-xl md:text-2xl font-extrabold text-[#92400E]" style={{fontFamily: 'Manrope, sans-serif'}}>
              Available Monthly Exams
            </h2>
          </div>

          {exams.length === 0 ? (
            <div className="text-center py-12">
              <div className="text-5xl md:text-6xl mb-4">📚</div>
              <p className="text-base md:text-lg text-[#374151] font-semibold">No exams available yet</p>
              <p className="text-sm text-[#6B7280] mt-2">Check back later or contact your teacher</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
              {exams.map(exam => (
                <div 
                  key={exam.id} 
                  className="bg-gradient-to-br from-[#FFF7E5] to-white rounded-2xl p-5 md:p-6 border-2 border-[#F5E6B3] shadow-md hover:shadow-xl transition-all hover:-translate-y-1"
                  data-testid={`exam-card-${exam.id}`}
                >
                  <h3 className="text-lg md:text-xl font-extrabold mb-2 text-[#92400E]" style={{fontFamily: 'Manrope, sans-serif'}}>{exam.title}</h3>
                  <p className="text-xs md:text-sm text-[#6B7280] mb-4">Month: {exam.month}</p>
                  
                  <div className="flex gap-3 md:gap-4 text-xs md:text-sm text-[#374151] mb-4">
                    <div className="flex items-center gap-2">
                      <Clock className="w-3 h-3 md:w-4 md:h-4 text-[#F59E0B]" />
                      {exam.duration_minutes} mins
                    </div>
                    <div className="flex items-center gap-2">
                      <FileText className="w-3 h-3 md:w-4 md:h-4 text-[#F59E0B]" />
                      {exam.paper1_questions?.length || 60} questions
                    </div>
                  </div>

                  <button
                    onClick={() => navigate(`/exam/${exam.id}`)}
                    className="w-full py-2 md:py-3 bg-gradient-to-r from-[#F59E0B] to-[#D97706] text-white font-bold rounded-xl shadow-md hover:shadow-lg transition-all text-sm md:text-base"
                    data-testid={`start-exam-button-${exam.id}`}
                  >
                    Start Exam →
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default StudentDashboard;

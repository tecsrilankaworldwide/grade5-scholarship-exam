import React, { useState, useEffect } from 'react';
import { useAuth, API } from '../AuthContext';
import axios from 'axios';
import { PlusCircle, FileText, Users, Award, LogOut, Edit, CheckCircle, BookOpen } from 'lucide-react';
import ExamCreator from '../components/ExamCreator';
import Paper2Marking from '../components/Paper2Marking';

const TeacherDashboard = () => {
  const { user, token, logout } = useAuth();
  const [exams, setExams] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showCreateExam, setShowCreateExam] = useState(false);
  const [showPaper2Marking, setShowPaper2Marking] = useState(false);

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    try {
      const examsRes = await axios.get(`${API}/exams`);
      setExams(examsRes.data.exams || []);
      setLoading(false);
    } catch (error) {
      console.error('Failed to load data:', error);
      setLoading(false);
    }
  };

  const publishExam = async (examId) => {
    try {
      await axios.put(
        `${API}/exams/${examId}/publish`,
        {},
        { headers: { Authorization: `Bearer ${token}` } }
      );
      alert('Exam published successfully!');
      loadData();
    } catch (error) {
      alert('Failed to publish exam: ' + (error.response?.data?.detail || error.message));
    }
  };

  const publishedExams = exams.filter(e => e.status === 'published').length;
  const draftExams = exams.filter(e => e.status === 'draft').length;

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#FFFBF0]">
        <div className="spinner"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#FFFBF0] noise-soft">
      {/* Header */}
      <div className="bg-white shadow-md border-b-4 border-[#F59E0B]">
        <div className="container mx-auto px-4 sm:px-6 md:px-12 lg:pl-48 xl:pl-60 py-4">
          <div className="flex justify-between items-center">
            <div>
              <h1 className="text-2xl md:text-3xl font-extrabold text-[#92400E]" style={{fontFamily: 'Manrope, sans-serif'}}>Teacher Dashboard</h1>
              <p className="text-sm md:text-base text-[#374151]">Welcome, {user.full_name}!</p>
            </div>
            <div className="flex gap-2 md:gap-3">
              <button
                onClick={() => setShowPaper2Marking(true)}
                className="px-3 md:px-5 py-2 md:py-3 bg-gradient-to-r from-blue-500 to-blue-600 text-white font-bold rounded-xl shadow-lg hover:shadow-xl transition-all text-xs md:text-base"
                data-testid="paper2-marking-button"
              >
                <BookOpen className="inline w-4 h-4 md:w-5 md:h-5 mr-1 md:mr-2" />
                <span className="hidden sm:inline">Mark Paper 2</span>
              </button>
              <button
                onClick={() => setShowCreateExam(true)}
                className="px-3 md:px-5 py-2 md:py-3 bg-gradient-to-r from-green-500 to-green-600 text-white font-bold rounded-xl shadow-lg hover:shadow-xl transition-all text-xs md:text-base"
                data-testid="create-exam-button"
              >
                <PlusCircle className="inline w-4 h-4 md:w-5 md:h-5 mr-1 md:mr-2" />
                <span className="hidden sm:inline">Create Exam</span>
              </button>
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
      <div className="container mx-auto px-4 sm:px-6 md:px-12 lg:pl-48 xl:pl-60 py-6">
        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6 mb-6 md:mb-8">
          <div className="bg-white/95 rounded-2xl p-4 md:p-6 shadow-lg border border-[#F5E6B3]">
            <div className="flex items-center gap-2 md:gap-3">
              <div className="w-10 h-10 md:w-12 md:h-12 bg-[#FFF7E5] rounded-xl flex items-center justify-center">
                <FileText className="w-5 h-5 md:w-6 md:h-6 text-[#F59E0B]" />
              </div>
              <div>
                <div className="text-2xl md:text-3xl font-extrabold text-[#92400E]" style={{fontFamily: 'Manrope, sans-serif'}}>{exams.length}</div>
                <div className="text-xs md:text-sm font-semibold text-[#374151]">Total Exams</div>
              </div>
            </div>
          </div>

          <div className="bg-white/95 rounded-2xl p-4 md:p-6 shadow-lg border border-[#F5E6B3]">
            <div className="flex items-center gap-2 md:gap-3">
              <div className="w-10 h-10 md:w-12 md:h-12 bg-[#ECFDF5] rounded-xl flex items-center justify-center">
                <CheckCircle className="w-5 h-5 md:w-6 md:h-6 text-[#16A34A]" />
              </div>
              <div>
                <div className="text-2xl md:text-3xl font-extrabold text-[#16A34A]" style={{fontFamily: 'Manrope, sans-serif'}}>{publishedExams}</div>
                <div className="text-xs md:text-sm font-semibold text-[#374151]">Published</div>
              </div>
            </div>
          </div>

          <div className="bg-white/95 rounded-2xl p-4 md:p-6 shadow-lg border border-[#F5E6B3]">
            <div className="flex items-center gap-2 md:gap-3">
              <div className="w-10 h-10 md:w-12 md:h-12 bg-[#FFF7E5] rounded-xl flex items-center justify-center">
                <Edit className="w-5 h-5 md:w-6 md:h-6 text-[#F59E0B]" />
              </div>
              <div>
                <div className="text-2xl md:text-3xl font-extrabold text-[#D97706]" style={{fontFamily: 'Manrope, sans-serif'}}>{draftExams}</div>
                <div className="text-xs md:text-sm font-semibold text-[#374151]">Drafts</div>
              </div>
            </div>
          </div>

          <div className="bg-white/95 rounded-2xl p-4 md:p-6 shadow-lg border border-[#F5E6B3]">
            <div className="flex items-center gap-2 md:gap-3">
              <div className="w-10 h-10 md:w-12 md:h-12 bg-[#EFF6FF] rounded-xl flex items-center justify-center">
                <Users className="w-5 h-5 md:w-6 md:h-6 text-[#3B82F6]" />
              </div>
              <div>
                <div className="text-2xl md:text-3xl font-extrabold text-[#3B82F6]" style={{fontFamily: 'Manrope, sans-serif'}}>-</div>
                <div className="text-xs md:text-sm font-semibold text-[#374151]">Students</div>
              </div>
            </div>
          </div>
        </div>

        {/* Exams List */}
        <div className="bg-white/95 rounded-3xl shadow-xl p-6 md:p-8 border-2 border-[#F5E6B3]">
          <h2 className="text-xl md:text-2xl font-extrabold mb-6 text-[#92400E]" style={{fontFamily: 'Manrope, sans-serif'}}>
            <FileText className="inline w-5 h-5 md:w-6 md:h-6 mr-2" />
            Exam Management
          </h2>

          {exams.length === 0 ? (
            <div className="text-center py-12">
              <div className="text-5xl md:text-6xl mb-4">📝</div>
              <p className="text-base md:text-lg text-[#374151] font-bold">No exams created yet</p>
              <button
                onClick={() => setShowCreateExam(true)}
                className="mt-4 px-6 md:px-8 py-2 md:py-3 bg-gradient-to-r from-green-500 to-green-600 text-white font-bold rounded-xl shadow-lg hover:shadow-xl text-sm md:text-base"
              >
                Create Your First Exam
              </button>
            </div>
          ) : (
            <div className="space-y-4">
              {exams.map(exam => (
                <div
                  key={exam.id}
                  className="p-4 md:p-6 bg-gradient-to-r from-[#FFF7E5] to-white border-2 border-[#F5E6B3] rounded-2xl hover:shadow-lg transition-all"
                  data-testid={`exam-card-${exam.id}`}
                >
                  <div className="flex flex-col md:flex-row justify-between md:items-center gap-4">
                    <div className="flex-1">
                      <h3 className="text-lg md:text-xl font-bold text-[#92400E]" style={{fontFamily: 'Manrope, sans-serif'}}>{exam.title}</h3>
                      <p className="text-xs md:text-sm text-[#6B7280] mt-1">
                        Grade: {exam.grade.replace('_', ' ').toUpperCase()} | Month: {exam.month}
                      </p>
                      <p className="text-xs md:text-sm text-[#6B7280]">
                        Questions: {exam.paper1_questions?.length || 0} / 60
                      </p>
                      <div className="mt-2">
                        {exam.status === 'published' ? (
                          <span className="px-3 py-1 bg-green-100 text-green-700 font-semibold rounded-full text-xs">
                            ✓ Published
                          </span>
                        ) : (
                          <span className="px-3 py-1 bg-orange-100 text-orange-700 font-semibold rounded-full text-xs">
                            ✎ Draft
                          </span>
                        )}
                      </div>
                    </div>
                    <div className="flex gap-2 md:gap-3">
                      {exam.status === 'draft' && (
                        <button
                          onClick={() => publishExam(exam.id)}
                          className="px-4 md:px-5 py-2 bg-gradient-to-r from-green-500 to-green-600 text-white font-semibold rounded-xl shadow-md hover:shadow-lg transition-all text-xs md:text-sm"
                          data-testid={`publish-exam-${exam.id}`}
                        >
                          <CheckCircle className="inline w-3 h-3 md:w-4 md:h-4 mr-1" />
                          Publish
                        </button>
                      )}
                      <button className="px-4 md:px-5 py-2 bg-blue-500 text-white font-semibold rounded-xl shadow-md hover:shadow-lg transition-all text-xs md:text-sm">
                        <Edit className="inline w-3 h-3 md:w-4 md:h-4 mr-1" />
                        View
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Modals */}
      {showCreateExam && (
        <ExamCreator
          onClose={() => setShowCreateExam(false)}
          onCreated={() => {
            setShowCreateExam(false);
            loadData();
          }}
        />
      )}

      {showPaper2Marking && (
        <Paper2Marking onClose={() => setShowPaper2Marking(false)} />
      )}
    </div>
  );
};

export default TeacherDashboard;

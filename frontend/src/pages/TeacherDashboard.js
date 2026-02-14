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
      <div className="min-h-screen flex items-center justify-center" style={{background: '#FFFBF0'}}>
        <div className="spinner"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen" style={{background: 'linear-gradient(135deg, #FFF9E6, #FFFACD)'}}>
      {/* Header */}
      <div className="bg-white shadow-md border-b-4" style={{borderColor: '#F59E0B'}}>
        <div className="max-w-6xl mx-auto px-6 py-4">
          <div className="flex justify-between items-center">
            <div>
              <h1 className="text-3xl font-extrabold" style={{color: '#92400E', fontFamily: 'Nunito'}}>Teacher Dashboard</h1>
              <p className="text-gray-600">Welcome, {user.full_name}!</p>
            </div>
            <div className="flex gap-3">
              <button
                onClick={() => setShowPaper2Marking(true)}
                className="px-5 py-3 bg-gradient-to-r from-blue-500 to-blue-600 text-white font-bold rounded-xl shadow-lg hover:shadow-xl transition-all"
                data-testid="paper2-marking-button"
              >
                <BookOpen className="inline w-5 h-5 mr-2" />
                Mark Paper 2
              </button>
              <button
                onClick={() => setShowCreateExam(true)}
                className="px-5 py-3 bg-gradient-to-r from-green-500 to-green-600 text-white font-bold rounded-xl shadow-lg hover:shadow-xl transition-all"
                data-testid="create-exam-button"
              >
                <PlusCircle className="inline w-5 h-5 mr-2" />
                Create Exam
              </button>
              <button
                onClick={logout}
                className="px-4 py-2 bg-gray-100 text-gray-700 font-semibold rounded-xl hover:bg-gray-200"
              >
                <LogOut className="inline w-4 h-4 mr-1" />Logout
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-6xl mx-auto p-6">
        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <div className="bg-white rounded-2xl p-6 shadow-lg border-3" style={{borderColor: '#FCD34D'}}>
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-yellow-100 rounded-xl flex items-center justify-center">
                <FileText className="w-6 h-6 text-yellow-600" />
              </div>
              <div>
                <div className="text-3xl font-extrabold" style={{color: '#92400E'}}>{exams.length}</div>
                <div className="text-sm font-semibold text-gray-600">Total Exams</div>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-2xl p-6 shadow-lg border-3" style={{borderColor: '#10B981'}}>
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center">
                <CheckCircle className="w-6 h-6 text-green-600" />
              </div>
              <div>
                <div className="text-3xl font-extrabold" style={{color: '#059669'}}>{publishedExams}</div>
                <div className="text-sm font-semibold text-gray-600">Published</div>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-2xl p-6 shadow-lg border-3" style={{borderColor: '#F59E0B'}}>
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-orange-100 rounded-xl flex items-center justify-center">
                <Edit className="w-6 h-6 text-orange-600" />
              </div>
              <div>
                <div className="text-3xl font-extrabold" style={{color: '#D97706'}}>{draftExams}</div>
                <div className="text-sm font-semibold text-gray-600">Drafts</div>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-2xl p-6 shadow-lg border-3" style={{borderColor: '#3B82F6'}}>
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center">
                <Users className="w-6 h-6 text-blue-600" />
              </div>
              <div>
                <div className="text-3xl font-extrabold" style={{color: '#2563EB'}}>-</div>
                <div className="text-sm font-semibold text-gray-600">Students</div>
              </div>
            </div>
          </div>
        </div>

        {/* Exams List */}
        <div className="bg-white rounded-3xl shadow-xl p-8 border-4" style={{borderColor: '#F59E0B'}}>
          <h2 className="text-2xl font-extrabold mb-6" style={{color: '#92400E', fontFamily: 'Nunito'}}>
            <FileText className="inline w-6 h-6 mr-2" />
            Exam Management
          </h2>

          {exams.length === 0 ? (
            <div className="text-center py-12">
              <div className="text-6xl mb-4">📝</div>
              <p className="text-lg text-gray-600 font-bold">No exams created yet</p>
              <button
                onClick={() => setShowCreateExam(true)}
                className="mt-4 px-8 py-3 bg-gradient-to-r from-green-500 to-green-600 text-white font-bold rounded-xl shadow-lg hover:shadow-xl"
              >
                Create Your First Exam
              </button>
            </div>
          ) : (
            <div className="space-y-4">
              {exams.map(exam => (
                <div
                  key={exam.id}
                  className="p-6 bg-gradient-to-r from-yellow-50 to-white border-3 border-yellow-200 rounded-2xl hover:shadow-lg transition-all"
                  data-testid={`exam-card-${exam.id}`}
                >
                  <div className="flex justify-between items-center">
                    <div className="flex-1">
                      <h3 className="text-xl font-bold" style={{color: '#92400E'}}>{exam.title}</h3>
                      <p className="text-sm text-gray-600 mt-1">
                        Grade: {exam.grade.replace('_', ' ').toUpperCase()} | Month: {exam.month}
                      </p>
                      <p className="text-sm text-gray-600">
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
                    <div className="flex gap-3">
                      {exam.status === 'draft' && (
                        <button
                          onClick={() => publishExam(exam.id)}
                          className="px-5 py-2 bg-gradient-to-r from-green-500 to-green-600 text-white font-semibold rounded-xl shadow-md hover:shadow-lg transition-all"
                          data-testid={`publish-exam-${exam.id}`}
                        >
                          <CheckCircle className="inline w-4 h-4 mr-1" />
                          Publish
                        </button>
                      )}
                      <button className="px-5 py-2 bg-blue-500 text-white font-semibold rounded-xl shadow-md hover:shadow-lg transition-all">
                        <Edit className="inline w-4 h-4 mr-1" />
                        View Details
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

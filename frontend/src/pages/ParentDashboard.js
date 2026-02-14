import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth, API } from '../AuthContext';
import axios from 'axios';
import { Users, TrendingUp, Award, LogOut, BarChart3, Link2, Plus } from 'lucide-react';

const ParentDashboard = () => {
  const { user, token, logout } = useAuth();
  const navigate = useNavigate();
  const [children, setChildren] = useState([]);
  const [allStudents, setAllStudents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showLinkStudent, setShowLinkStudent] = useState(false);
  const [selectedStudent, setSelectedStudent] = useState('');

  useEffect(() => {
    loadChildren();
  }, []);

  const loadChildren = async () => {
    try {
      // Mock data for students linked to this parent
      // In production, fetch students where parent_id matches current user
      const mockChildren = [
        { id: 'student_123', name: 'Sample Student', grade: 'grade_5', email: 'student@test.com' }
      ];
      setChildren(mockChildren);
      
      // Mock all students for linking
      const mockAllStudents = [
        { id: 'student_123', name: 'Sample Student', grade: 'grade_5', email: 'student@test.com' },
        { id: 'student_456', name: 'Another Student', grade: 'grade_4', email: 'student2@test.com' }
      ];
      setAllStudents(mockAllStudents);
      
      setLoading(false);
    } catch (error) {
      console.error('Failed to load children:', error);
      setLoading(false);
    }
  };

  const handleLinkStudent = async () => {
    if (!selectedStudent) {
      alert('Please select a student');
      return;
    }

    try {
      // In production, call backend API to link student to parent
      // await axios.put(`${API}/users/link-student`, 
      //   { student_id: selectedStudent, parent_id: user.id },
      //   { headers: { Authorization: `Bearer ${token}` } }
      // );
      
      alert('Student linked successfully!');
      setShowLinkStudent(false);
      setSelectedStudent('');
      loadChildren();
    } catch (error) {
      alert('Failed to link student: ' + (error.response?.data?.detail || error.message));
    }
  };

  const availableStudents = allStudents.filter(
    s => !children.find(c => c.id === s.id)
  );

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
              <h1 className="text-3xl font-extrabold" style={{color: '#92400E', fontFamily: 'Nunito'}}>
                <Users className="inline w-8 h-8 mr-2" />
                Parent Portal
              </h1>
              <p className="text-gray-600">Welcome, {user.full_name}!</p>
            </div>
            <div className="flex gap-3">
              <button
                onClick={() => setShowLinkStudent(true)}
                className="px-5 py-3 bg-gradient-to-r from-blue-500 to-blue-600 text-white font-bold rounded-xl shadow-lg hover:shadow-xl transition-all"
                data-testid="link-student-button"
              >
                <Link2 className="inline w-5 h-5 mr-2" />
                Link Student
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
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="bg-white rounded-2xl p-6 shadow-lg border-3" style={{borderColor: '#3B82F6'}}>
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center">
                <Users className="w-6 h-6 text-blue-600" />
              </div>
              <div>
                <div className="text-3xl font-extrabold" style={{color: '#2563EB'}}>{children.length}</div>
                <div className="text-sm font-semibold text-gray-600">Linked Children</div>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-2xl p-6 shadow-lg border-3" style={{borderColor: '#10B981'}}>
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center">
                <TrendingUp className="w-6 h-6 text-green-600" />
              </div>
              <div>
                <div className="text-3xl font-extrabold" style={{color: '#059669'}}>-</div>
                <div className="text-sm font-semibold text-gray-600">Avg Progress</div>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-2xl p-6 shadow-lg border-3" style={{borderColor: '#F59E0B'}}>
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-yellow-100 rounded-xl flex items-center justify-center">
                <Award className="w-6 h-6 text-yellow-600" />
              </div>
              <div>
                <div className="text-3xl font-extrabold" style={{color: '#D97706'}}>-</div>
                <div className="text-sm font-semibold text-gray-600">Completed Exams</div>
              </div>
            </div>
          </div>
        </div>

        {/* Children Progress */}
        <div className="bg-white rounded-3xl shadow-xl p-8 border-4" style={{borderColor: '#F59E0B'}}>
          <h2 className="text-2xl font-extrabold mb-6" style={{color: '#92400E', fontFamily: 'Nunito'}}>
            <Users className="inline w-6 h-6 mr-2" />
            Your Children's Progress
          </h2>

          {children.length === 0 ? (
            <div className="text-center py-12">
              <div className="text-6xl mb-4">👨‍👩‍👧‍👦</div>
              <p className="text-lg text-gray-600 font-semibold mb-2">No children linked to your account yet</p>
              <p className="text-sm text-gray-500 mb-6">Click "Link Student" to connect your child's account</p>
              <button
                onClick={() => setShowLinkStudent(true)}
                className="px-8 py-3 bg-gradient-to-r from-blue-500 to-blue-600 text-white font-bold rounded-xl shadow-lg hover:shadow-xl"
              >
                <Link2 className="inline w-5 h-5 mr-2" />
                Link Your First Child
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {children.map(child => (
                <div
                  key={child.id}
                  className="bg-gradient-to-br from-yellow-50 to-white rounded-2xl p-6 border-3 border-yellow-200 shadow-md hover:shadow-xl transition-all"
                  data-testid={`child-card-${child.id}`}
                >
                  <div className="flex items-start justify-between mb-4">
                    <div>
                      <h3 className="text-xl font-extrabold" style={{color: '#92400E'}}>{child.name}</h3>
                      <p className="text-sm text-gray-600">{child.grade.replace('_', ' ').toUpperCase()}</p>
                      <p className="text-xs text-gray-500 mt-1">{child.email}</p>
                    </div>
                    <div className="w-12 h-12 bg-yellow-200 rounded-full flex items-center justify-center">
                      <span className="text-2xl">🎓</span>
                    </div>
                  </div>
                  
                  <button
                    onClick={() => navigate(`/progress/${child.id}`)}
                    className="w-full py-3 bg-gradient-to-r from-yellow-500 to-yellow-600 text-white font-bold rounded-xl shadow-md hover:shadow-lg transition-all"
                    data-testid={`view-progress-${child.id}`}
                  >
                    <BarChart3 className="inline w-5 h-5 mr-2" />
                    View Blood Report 🩺
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Link Student Modal */}
      {showLinkStudent && (
        <div className="fixed inset-0 bg-black/40 backdrop-blur-sm z-50 flex items-center justify-center p-6">
          <div className="bg-white rounded-3xl shadow-2xl border-4 p-8 max-w-md w-full" style={{borderColor: '#F59E0B'}}>
            <h3 className="text-2xl font-extrabold mb-6" style={{color: '#92400E', fontFamily: 'Nunito'}}>
              <Link2 className="inline w-6 h-6 mr-2" />
              Link Student Account
            </h3>

            {availableStudents.length === 0 ? (
              <div className="text-center py-8">
                <p className="text-gray-600 mb-4">All students are already linked to your account!</p>
                <button
                  onClick={() => setShowLinkStudent(false)}
                  className="px-6 py-2 bg-gray-200 text-gray-700 font-semibold rounded-xl hover:bg-gray-300"
                >
                  Close
                </button>
              </div>
            ) : (
              <>
                <p className="text-gray-600 mb-4">Select a student to link to your parent account:</p>
                
                <div className="space-y-3 mb-6">
                  {availableStudents.map(student => (
                    <label
                      key={student.id}
                      className={`flex items-center p-4 border-3 rounded-xl cursor-pointer transition-all ${
                        selectedStudent === student.id
                          ? 'border-blue-500 bg-blue-50'
                          : 'border-gray-300 hover:border-blue-300'
                      }`}
                      data-testid={`student-option-${student.id}`}
                    >
                      <input
                        type="radio"
                        name="student"
                        value={student.id}
                        checked={selectedStudent === student.id}
                        onChange={(e) => setSelectedStudent(e.target.value)}
                        className="w-5 h-5 mr-3"
                      />
                      <div className="flex-1">
                        <div className="font-bold" style={{color: '#92400E'}}>{student.name}</div>
                        <div className="text-sm text-gray-600">{student.grade.replace('_', ' ').toUpperCase()}</div>
                        <div className="text-xs text-gray-500">{student.email}</div>
                      </div>
                    </label>
                  ))}
                </div>

                <div className="flex gap-3">
                  <button
                    onClick={() => setShowLinkStudent(false)}
                    className="flex-1 py-3 bg-gray-200 text-gray-700 font-bold rounded-xl hover:bg-gray-300"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={handleLinkStudent}
                    disabled={!selectedStudent}
                    className="flex-1 py-3 bg-gradient-to-r from-blue-500 to-blue-600 text-white font-bold rounded-xl shadow-lg hover:shadow-xl disabled:opacity-50"
                    data-testid="confirm-link-student-button"
                  >
                    Link Student
                  </button>
                </div>
              </>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default ParentDashboard;

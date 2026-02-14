import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { useAuth, API } from '../AuthContext';
import axios from 'axios';
import { Users, TrendingUp, Award, LogOut, BarChart3, Link2, BookOpen } from 'lucide-react';
import LanguageSwitcher from '../components/LanguageSwitcher';

const ParentDashboard = () => {
  const { t } = useTranslation();
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
      const mockChildren = [
        { id: 'student_123', name: 'Sample Student', grade: 'grade_5', email: 'student@test.com' }
      ];
      setChildren(mockChildren);
      
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
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-[#FFFBF0] to-[#FFF4E6]">
        <div className="spinner"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#FFFBF0] to-[#FFF4E6]">
      {/* Header */}
      <div className="bg-white shadow-md border-b-4 border-[#F59E0B]">
        <div className="container mx-auto px-4 sm:px-6 md:px-12 lg:pl-48 xl:pl-60 py-5">
          <div className="flex justify-between items-center">
            <div className="flex items-center gap-4">
              <div className="w-14 h-14 bg-[#F59E0B] rounded-lg flex items-center justify-center">
                <Users className="w-7 h-7 text-white" strokeWidth={2.5} />
              </div>
              <div>
                <h1 className="text-2xl md:text-3xl font-bold text-[#1F2937]" style={{fontFamily: 'Manrope, sans-serif'}}>{t('dashboard.parent')}</h1>
                <p className="text-sm md:text-base text-[#6B7280]">{t('dashboard.welcome')}, <span className="font-semibold text-[#F59E0B]">{user.full_name}</span></p>
              </div>
            </div>
            <div className="flex gap-3">
              <LanguageSwitcher />
              <button
                onClick={() => setShowLinkStudent(true)}
                className="px-3 md:px-4 py-2 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition-colors text-sm md:text-base"
                data-testid="link-student-button"
              >
                <Link2 className="inline w-4 h-4 mr-1" />
                <span className="hidden sm:inline">{t('parent.linkStudent')}</span>
              </button>
              <button
                onClick={logout}
                className="px-3 md:px-4 py-2 bg-gray-100 text-gray-700 font-semibold rounded-lg hover:bg-gray-200 transition-colors"
                data-testid="logout-btn"
              >
                <LogOut className="inline w-4 h-4 mr-1" />
                <span className="hidden md:inline">{t('auth.logout')}</span>
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-4 sm:px-6 md:px-12 lg:pl-48 xl:pl-60 py-8">
        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="bg-white rounded-xl p-6 shadow-md border-2 border-[#E5E7EB]">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-[#EFF6FF] rounded-lg flex items-center justify-center">
                <Users className="w-6 h-6 text-[#3B82F6]" />
              </div>
              <div>
                <div className="text-3xl font-bold text-[#3B82F6]" style={{fontFamily: 'Manrope, sans-serif'}}>{children.length}</div>
                <div className="text-sm font-medium text-[#6B7280]">{t('parent.linkedChildren')}</div>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl p-6 shadow-md border-2 border-[#E5E7EB]">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-[#ECFDF5] rounded-lg flex items-center justify-center">
                <TrendingUp className="w-6 h-6 text-[#10B981]" />
              </div>
              <div>
                <div className="text-3xl font-bold text-[#10B981]" style={{fontFamily: 'Manrope, sans-serif'}}>-</div>
                <div className="text-sm font-medium text-[#6B7280]">{t('parent.avgProgress')}</div>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl p-6 shadow-md border-2 border-[#E5E7EB]">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-[#FFF7E5] rounded-lg flex items-center justify-center">
                <Award className="w-6 h-6 text-[#F59E0B]" />
              </div>
              <div>
                <div className="text-3xl font-bold text-[#F59E0B]" style={{fontFamily: 'Manrope, sans-serif'}}>-</div>
                <div className="text-sm font-medium text-[#6B7280]">{t('parent.completedExams')}</div>
              </div>
            </div>
          </div>
        </div>

        {/* Children Progress */}
        <div className="bg-white rounded-xl shadow-md p-6 md:p-8 border-2 border-[#E5E7EB]">
          <h2 className="text-xl md:text-2xl font-bold mb-6 text-[#1F2937]" style={{fontFamily: 'Manrope, sans-serif'}}>
            {t('parent.childrenProgress')}
          </h2>

          {children.length === 0 ? (
            <div className="text-center py-12">
              <div className="text-6xl mb-4">👨‍👩‍👧‍👦</div>
              <p className="text-lg text-[#6B7280] font-semibold mb-2">{t('progress.noData')}</p>
              <p className="text-sm text-[#9CA3AF] mb-6">{t('auth.needHelp')}</p>
              <button
                onClick={() => setShowLinkStudent(true)}
                className="px-6 py-3 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700"
              >
                <Link2 className="inline w-5 h-5 mr-2" />
                {t('parent.linkStudent')}
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {children.map(child => (
                <div
                  key={child.id}
                  className="bg-gradient-to-br from-[#FFF7E5] to-white rounded-xl p-6 border-2 border-[#F5E6B3] shadow-md hover:shadow-lg transition-all"
                  data-testid={`child-card-${child.id}`}
                >
                  <div className="flex items-start justify-between mb-4">
                    <div>
                      <h3 className="text-xl font-bold text-[#1F2937]" style={{fontFamily: 'Manrope, sans-serif'}}>{child.name}</h3>
                      <p className="text-sm text-[#6B7280]">{child.grade.replace('_', ' ').toUpperCase()}</p>
                      <p className="text-xs text-[#9CA3AF] mt-1">{child.email}</p>
                    </div>
                    <div className="w-12 h-12 bg-[#FCD34D] rounded-full flex items-center justify-center">
                      <span className="text-2xl">🎓</span>
                    </div>
                  </div>
                  
                  <button
                    onClick={() => navigate(`/progress/${child.id}`)}
                    className="w-full py-3 bg-[#F59E0B] text-white font-semibold rounded-lg hover:bg-[#D97706] transition-all"
                    data-testid={`view-progress-${child.id}`}
                  >
                    <BarChart3 className="inline w-5 h-5 mr-2" />
                    {t('progress.viewProgress')}
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
          <div className="bg-white rounded-2xl shadow-2xl border-2 border-[#E5E7EB] p-8 max-w-md w-full">
            <h3 className="text-2xl font-bold mb-6 text-[#1F2937]" style={{fontFamily: 'Manrope, sans-serif'}}>
              {t('parent.linkStudent')}
            </h3>

            {availableStudents.length === 0 ? (
              <div className="text-center py-8">
                <p className="text-[#6B7280] mb-4">{t('progress.noData')}</p>
                <button
                  onClick={() => setShowLinkStudent(false)}
                  className="px-6 py-2 bg-gray-200 text-gray-700 font-semibold rounded-lg hover:bg-gray-300"
                >
                  {t('common.cancel')}
                </button>
              </div>
            ) : (
              <>
                <p className="text-[#6B7280] mb-4">{t('auth.signInDesc')}</p>
                
                <div className="space-y-3 mb-6">
                  {availableStudents.map(student => (
                    <label
                      key={student.id}
                      className={`flex items-center p-4 border-2 rounded-lg cursor-pointer transition-all ${
                        selectedStudent === student.id
                          ? 'border-[#F59E0B] bg-[#FFF7E5]'
                          : 'border-[#E5E7EB] hover:border-[#F59E0B]'
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
                        <div className="font-bold text-[#1F2937]">{student.name}</div>
                        <div className="text-sm text-[#6B7280]">{student.grade.replace('_', ' ').toUpperCase()}</div>
                        <div className="text-xs text-[#9CA3AF]">{student.email}</div>
                      </div>
                    </label>
                  ))}
                </div>

                <div className="flex gap-3">
                  <button
                    onClick={() => setShowLinkStudent(false)}
                    className="flex-1 py-3 bg-gray-200 text-gray-700 font-semibold rounded-lg hover:bg-gray-300"
                  >
                    {t('common.cancel')}
                  </button>
                  <button
                    onClick={handleLinkStudent}
                    disabled={!selectedStudent}
                    className="flex-1 py-3 bg-[#F59E0B] text-white font-semibold rounded-lg hover:bg-[#D97706] disabled:opacity-50"
                    data-testid="confirm-link-student-button"
                  >
                    {t('parent.linkStudent')}
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

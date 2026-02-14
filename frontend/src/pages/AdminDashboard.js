import React, { useState, useEffect } from 'react';
import { useAuth, API } from '../AuthContext';
import axios from 'axios';
import { Shield, Users, FileText, LogOut, Plus, Edit, Trash2, Search } from 'lucide-react';

const AdminDashboard = () => {
  const { user, token, logout } = useAuth();
  const [stats, setStats] = useState({
    students: 0,
    teachers: 0,
    parents: 0,
    exams: 0
  });
  const [users, setUsers] = useState([]);
  const [exams, setExams] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showAddUser, setShowAddUser] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [newUser, setNewUser] = useState({
    email: '',
    password: '',
    full_name: '',
    role: 'student',
    grade: 'grade_5'
  });

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    try {
      const examsRes = await axios.get(`${API}/exams`);
      setExams(examsRes.data.exams || []);
      
      const mockUsers = [
        { id: '1', email: 'admin@exambureau.com', full_name: 'Admin User', role: 'admin', is_active: true },
        { id: '2', email: 'teacher@exambureau.com', full_name: 'Teacher User', role: 'teacher', is_active: true },
        { id: '3', email: 'student@test.com', full_name: 'Student User', role: 'student', grade: 'grade_5', is_active: true },
        { id: '4', email: 'parent@test.com', full_name: 'Parent User', role: 'parent', is_active: true }
      ];
      setUsers(mockUsers);

      setStats({
        students: mockUsers.filter(u => u.role === 'student').length,
        teachers: mockUsers.filter(u => u.role === 'teacher').length,
        parents: mockUsers.filter(u => u.role === 'parent').length,
        exams: examsRes.data.exams?.length || 0
      });
      
      setLoading(false);
    } catch (error) {
      console.error('Failed to load data:', error);
      setLoading(false);
    }
  };

  const handleAddUser = async () => {
    if (!newUser.email || !newUser.password || !newUser.full_name) {
      alert('Please fill all required fields!');
      return;
    }

    try {
      await axios.post(
        `${API}/register`,
        newUser
      );
      alert('User created successfully!');
      setShowAddUser(false);
      setNewUser({ email: '', password: '', full_name: '', role: 'student', grade: 'grade_5' });
      loadData();
    } catch (error) {
      alert('Failed to create user: ' + (error.response?.data?.detail || error.message));
    }
  };

  const filteredUsers = users.filter(u => 
    u.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
    u.full_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    u.role.toLowerCase().includes(searchTerm.toLowerCase())
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
                <Shield className="w-7 h-7 text-white" strokeWidth={2.5} />
              </div>
              <div>
                <h1 className="text-2xl md:text-3xl font-bold text-[#1F2937]" style={{fontFamily: 'Manrope, sans-serif'}}>Admin Dashboard</h1>
                <p className="text-sm md:text-base text-[#6B7280]">Welcome, <span className="font-semibold text-[#F59E0B]">{user.full_name}</span></p>
              </div>
            </div>
            <div className="flex gap-3">
              <button
                onClick={() => setShowAddUser(true)}
                className="px-3 md:px-4 py-2 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition-colors text-sm md:text-base"
                data-testid="add-user-button"
              >
                <Plus className="inline w-4 h-4 mr-1" />
                <span className="hidden sm:inline">Add User</span>
              </button>
              <button
                onClick={logout}
                className="px-3 md:px-4 py-2 bg-gray-100 text-gray-700 font-semibold rounded-lg hover:bg-gray-200 transition-colors"
              >
                <LogOut className="inline w-4 h-4 mr-1" />
                <span className="hidden md:inline">Logout</span>
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 sm:px-6 md:px-12 lg:pl-48 xl:pl-60 py-8">
        {/* Stats Cards */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6 mb-8">
          <div className="bg-white rounded-xl p-4 md:p-6 shadow-md border-2 border-[#E5E7EB]">
            <div className="w-10 h-10 md:w-12 md:h-12 bg-[#EFF6FF] rounded-lg flex items-center justify-center mb-3">
              <Users className="w-5 h-5 md:w-6 md:h-6 text-[#3B82F6]" />
            </div>
            <div className="text-2xl md:text-3xl font-bold mb-1 text-[#3B82F6]" style={{fontFamily: 'Manrope, sans-serif'}}>{stats.students}</div>
            <div className="text-xs md:text-sm font-medium text-[#6B7280]">Students</div>
          </div>

          <div className="bg-white rounded-xl p-4 md:p-6 shadow-md border-2 border-[#E5E7EB]">
            <div className="w-10 h-10 md:w-12 md:h-12 bg-[#ECFDF5] rounded-lg flex items-center justify-center mb-3">
              <FileText className="w-5 h-5 md:w-6 md:h-6 text-[#10B981]" />
            </div>
            <div className="text-2xl md:text-3xl font-bold mb-1 text-[#10B981]" style={{fontFamily: 'Manrope, sans-serif'}}>{stats.exams}</div>
            <div className="text-xs md:text-sm font-medium text-[#6B7280]">Exams</div>
          </div>

          <div className="bg-white rounded-xl p-4 md:p-6 shadow-md border-2 border-[#E5E7EB]">
            <div className="w-10 h-10 md:w-12 md:h-12 bg-[#FFF7E5] rounded-lg flex items-center justify-center mb-3">
              <Shield className="w-5 h-5 md:w-6 md:h-6 text-[#F59E0B]" />
            </div>
            <div className="text-2xl md:text-3xl font-bold mb-1 text-[#F59E0B]" style={{fontFamily: 'Manrope, sans-serif'}}>{stats.teachers}</div>
            <div className="text-xs md:text-sm font-medium text-[#6B7280]">Teachers</div>
          </div>

          <div className="bg-white rounded-xl p-4 md:p-6 shadow-md border-2 border-[#E5E7EB]">
            <div className="w-10 h-10 md:w-12 md:h-12 bg-purple-100 rounded-lg flex items-center justify-center mb-3">
              <Users className="w-5 h-5 md:w-6 md:h-6 text-purple-600" />
            </div>
            <div className="text-2xl md:text-3xl font-bold mb-1 text-purple-600" style={{fontFamily: 'Manrope, sans-serif'}}>{stats.parents}</div>
            <div className="text-xs md:text-sm font-medium text-[#6B7280]">Parents</div>
          </div>
        </div>

        {/* User Management */}
        <div className="bg-white rounded-xl shadow-md p-6 md:p-8 border-2 border-[#E5E7EB]">
          <div className="flex flex-col md:flex-row justify-between md:items-center gap-4 mb-6">
            <h2 className="text-xl md:text-2xl font-bold text-[#1F2937]" style={{fontFamily: 'Manrope, sans-serif'}}>
              User Management
            </h2>
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input
                type="text"
                placeholder="Search users..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 pr-4 py-2 border-2 border-[#E5E7EB] rounded-lg w-full md:w-64"
                data-testid="search-users-input"
              />
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b-2 border-[#E5E7EB]">
                  <th className="text-left py-3 px-4 font-bold text-[#1F2937]">Name</th>
                  <th className="text-left py-3 px-4 font-bold text-[#1F2937]">Email</th>
                  <th className="text-left py-3 px-4 font-bold text-[#1F2937]">Role</th>
                  <th className="text-left py-3 px-4 font-bold text-[#1F2937]">Status</th>
                  <th className="text-left py-3 px-4 font-bold text-[#1F2937]">Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredUsers.map(user => (
                  <tr key={user.id} className="border-b border-[#E5E7EB] hover:bg-[#FFF7E5]" data-testid={`user-row-${user.id}`}>
                    <td className="py-3 px-4 font-semibold">{user.full_name}</td>
                    <td className="py-3 px-4 text-[#6B7280]">{user.email}</td>
                    <td className="py-3 px-4">
                      <span className={`px-3 py-1 rounded-full text-xs font-semibold ${
                        user.role === 'admin' ? 'bg-purple-100 text-purple-700' :
                        user.role === 'teacher' ? 'bg-blue-100 text-blue-700' :
                        user.role === 'student' ? 'bg-green-100 text-green-700' :
                        'bg-orange-100 text-orange-700'
                      }`}>
                        {user.role.toUpperCase()}
                      </span>
                    </td>
                    <td className="py-3 px-4">
                      {user.is_active ? (
                        <span className="px-3 py-1 bg-green-100 text-green-700 rounded-full text-xs font-semibold">
                          ✓ Active
                        </span>
                      ) : (
                        <span className="px-3 py-1 bg-red-100 text-red-700 rounded-full text-xs font-semibold">
                          ✕ Inactive
                        </span>
                      )}
                    </td>
                    <td className="py-3 px-4">
                      <div className="flex gap-2">
                        <button className="p-2 bg-blue-100 text-blue-600 rounded-lg hover:bg-blue-200">
                          <Edit className="w-4 h-4" />
                        </button>
                        <button className="p-2 bg-red-100 text-red-600 rounded-lg hover:bg-red-200">
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* Add User Modal */}
      {showAddUser && (
        <div className="fixed inset-0 bg-black/40 backdrop-blur-sm z-50 flex items-center justify-center p-6">
          <div className="bg-white rounded-2xl shadow-2xl border-2 border-[#E5E7EB] p-8 max-w-md w-full">
            <h3 className="text-2xl font-bold mb-6 text-[#1F2937]" style={{fontFamily: 'Manrope, sans-serif'}}>
              Add New User
            </h3>

            <div className="space-y-4">
              <div>
                <label className="block font-semibold mb-2 text-[#374151]">Full Name *</label>
                <input
                  type="text"
                  value={newUser.full_name}
                  onChange={(e) => setNewUser({...newUser, full_name: e.target.value})}
                  className="w-full px-4 py-3 border-2 border-[#E5E7EB] rounded-lg"
                  placeholder="Enter full name"
                  data-testid="new-user-name-input"
                />
              </div>

              <div>
                <label className="block font-semibold mb-2 text-[#374151]">Email *</label>
                <input
                  type="email"
                  value={newUser.email}
                  onChange={(e) => setNewUser({...newUser, email: e.target.value})}
                  className="w-full px-4 py-3 border-2 border-[#E5E7EB] rounded-lg"
                  placeholder="Enter email"
                  data-testid="new-user-email-input"
                />
              </div>

              <div>
                <label className="block font-semibold mb-2 text-[#374151]">Password *</label>
                <input
                  type="password"
                  value={newUser.password}
                  onChange={(e) => setNewUser({...newUser, password: e.target.value})}
                  className="w-full px-4 py-3 border-2 border-[#E5E7EB] rounded-lg"
                  placeholder="Enter password"
                  data-testid="new-user-password-input"
                />
              </div>

              <div>
                <label className="block font-semibold mb-2 text-[#374151]">Role *</label>
                <select
                  value={newUser.role}
                  onChange={(e) => setNewUser({...newUser, role: e.target.value})}
                  className="w-full px-4 py-3 border-2 border-[#E5E7EB] rounded-lg"
                  data-testid="new-user-role-select"
                >
                  <option value="student">Student</option>
                  <option value="teacher">Teacher</option>
                  <option value="parent">Parent</option>
                  <option value="admin">Admin</option>
                </select>
              </div>

              {newUser.role === 'student' && (
                <div>
                  <label className="block font-semibold mb-2 text-[#374151]">Grade *</label>
                  <select
                    value={newUser.grade}
                    onChange={(e) => setNewUser({...newUser, grade: e.target.value})}
                    className="w-full px-4 py-3 border-2 border-[#E5E7EB] rounded-lg"
                    data-testid="new-user-grade-select"
                  >
                    <option value="grade_2">Grade 2</option>
                    <option value="grade_3">Grade 3</option>
                    <option value="grade_4">Grade 4</option>
                    <option value="grade_5">Grade 5</option>
                  </select>
                </div>
              )}
            </div>

            <div className="flex gap-3 mt-6">
              <button
                onClick={() => setShowAddUser(false)}
                className="flex-1 py-3 bg-gray-200 text-gray-700 font-semibold rounded-lg hover:bg-gray-300"
              >
                Cancel
              </button>
              <button
                onClick={handleAddUser}
                className="flex-1 py-3 bg-[#F59E0B] text-white font-semibold rounded-lg hover:bg-[#D97706]"
                data-testid="save-new-user-button"
              >
                Add User
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminDashboard;

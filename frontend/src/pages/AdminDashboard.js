import React, { useState, useEffect } from 'react';
import { useAuth, API } from '../AuthContext';
import axios from 'axios';
import { Shield, Users, FileText, Settings, LogOut, Plus, Edit, Trash2, Search } from 'lucide-react';

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
      
      // Mock user data - in production, fetch from backend
      const mockUsers = [
        { id: '1', email: 'admin@exambureau.com', full_name: 'Admin User', role: 'admin', is_active: true },
        { id: '2', email: 'teacher@exambureau.com', full_name: 'Teacher User', role: 'teacher', is_active: true },
        { id: '3', email: 'student@test.com', full_name: 'Student User', role: 'student', grade: 'grade_5', is_active: true },
        { id: '4', email: 'parent@test.com', full_name: 'Parent User', role: 'parent', is_active: true }
      ];
      setUsers(mockUsers);

      // Calculate stats
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
      <div className="min-h-screen flex items-center justify-center" style={{background: '#FFFBF0'}}>
        <div className="spinner"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen" style={{background: 'linear-gradient(135deg, #FFF9E6, #FFFACD)'}}>
      {/* Header */}
      <div className="bg-white shadow-md border-b-4" style={{borderColor: '#F59E0B'}}>
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex justify-between items-center">
            <div>
              <h1 className="text-3xl font-extrabold" style={{color: '#92400E', fontFamily: 'Nunito'}}>
                <Shield className="inline w-8 h-8 mr-2" />
                Admin Dashboard
              </h1>
              <p className="text-gray-600">Welcome, {user.full_name}!</p>
            </div>
            <div className="flex gap-3">
              <button
                onClick={() => setShowAddUser(true)}
                className="px-5 py-3 bg-gradient-to-r from-blue-500 to-blue-600 text-white font-bold rounded-xl shadow-lg hover:shadow-xl transition-all"
                data-testid="add-user-button"
              >
                <Plus className="inline w-5 h-5 mr-2" />
                Add User
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

      <div className="max-w-7xl mx-auto p-6">
        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <div className="bg-white rounded-2xl p-6 shadow-lg border-3" style={{borderColor: '#3B82F6'}}>
            <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center mb-4">
              <Users className="w-6 h-6 text-blue-600" />
            </div>
            <div className="text-3xl font-extrabold mb-1" style={{color: '#2563EB'}}>{stats.students}</div>
            <div className="text-sm font-semibold text-gray-600">Total Students</div>
          </div>

          <div className="bg-white rounded-2xl p-6 shadow-lg border-3" style={{borderColor: '#10B981'}}>
            <div className="w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center mb-4">
              <FileText className="w-6 h-6 text-green-600" />
            </div>
            <div className="text-3xl font-extrabold mb-1" style={{color: '#059669'}}>{stats.exams}</div>
            <div className="text-sm font-semibold text-gray-600">Active Exams</div>
          </div>

          <div className="bg-white rounded-2xl p-6 shadow-lg border-3" style={{borderColor: '#F59E0B'}}>
            <div className="w-12 h-12 bg-yellow-100 rounded-xl flex items-center justify-center mb-4">
              <Shield className="w-6 h-6 text-yellow-600" />
            </div>
            <div className="text-3xl font-extrabold mb-1" style={{color: '#D97706'}}>{stats.teachers}</div>
            <div className="text-sm font-semibold text-gray-600">Teachers</div>
          </div>

          <div className="bg-white rounded-2xl p-6 shadow-lg border-3" style={{borderColor: '#8B5CF6'}}>
            <div className="w-12 h-12 bg-purple-100 rounded-xl flex items-center justify-center mb-4">
              <Users className="w-6 h-6 text-purple-600" />
            </div>
            <div className="text-3xl font-extrabold mb-1" style={{color: '#7C3AED'}}>{stats.parents}</div>
            <div className="text-sm font-semibold text-gray-600">Parents</div>
          </div>
        </div>

        {/* User Management */}
        <div className="bg-white rounded-3xl shadow-xl p-8 border-4" style={{borderColor: '#F59E0B'}}>
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-extrabold" style={{color: '#92400E', fontFamily: 'Nunito'}}>
              <Users className="inline w-6 h-6 mr-2" />
              User Management
            </h2>
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input
                type="text"
                placeholder="Search users..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 pr-4 py-2 border-2 border-gray-300 rounded-xl w-64"
                data-testid="search-users-input"
              />
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b-2 border-yellow-300">
                  <th className="text-left py-3 px-4 font-bold" style={{color: '#92400E'}}>Name</th>
                  <th className="text-left py-3 px-4 font-bold" style={{color: '#92400E'}}>Email</th>
                  <th className="text-left py-3 px-4 font-bold" style={{color: '#92400E'}}>Role</th>
                  <th className="text-left py-3 px-4 font-bold" style={{color: '#92400E'}}>Status</th>
                  <th className="text-left py-3 px-4 font-bold" style={{color: '#92400E'}}>Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredUsers.map(user => (
                  <tr key={user.id} className="border-b border-gray-200 hover:bg-yellow-50" data-testid={`user-row-${user.id}`}>
                    <td className="py-3 px-4 font-semibold">{user.full_name}</td>
                    <td className="py-3 px-4 text-gray-600">{user.email}</td>
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
          <div className="bg-white rounded-3xl shadow-2xl border-4 p-8 max-w-md w-full" style={{borderColor: '#F59E0B'}}>
            <h3 className="text-2xl font-extrabold mb-6" style={{color: '#92400E', fontFamily: 'Nunito'}}>
              Add New User
            </h3>

            <div className="space-y-4">
              <div>
                <label className="block font-semibold mb-2 text-gray-700">Full Name *</label>
                <input
                  type="text"
                  value={newUser.full_name}
                  onChange={(e) => setNewUser({...newUser, full_name: e.target.value})}
                  className="w-full px-4 py-3 border-2 border-gray-300 rounded-xl"
                  placeholder="Enter full name"
                  data-testid="new-user-name-input"
                />
              </div>

              <div>
                <label className="block font-semibold mb-2 text-gray-700">Email *</label>
                <input
                  type="email"
                  value={newUser.email}
                  onChange={(e) => setNewUser({...newUser, email: e.target.value})}
                  className="w-full px-4 py-3 border-2 border-gray-300 rounded-xl"
                  placeholder="Enter email"
                  data-testid="new-user-email-input"
                />
              </div>

              <div>
                <label className="block font-semibold mb-2 text-gray-700">Password *</label>
                <input
                  type="password"
                  value={newUser.password}
                  onChange={(e) => setNewUser({...newUser, password: e.target.value})}
                  className="w-full px-4 py-3 border-2 border-gray-300 rounded-xl"
                  placeholder="Enter password"
                  data-testid="new-user-password-input"
                />
              </div>

              <div>
                <label className="block font-semibold mb-2 text-gray-700">Role *</label>
                <select
                  value={newUser.role}
                  onChange={(e) => setNewUser({...newUser, role: e.target.value})}
                  className="w-full px-4 py-3 border-2 border-gray-300 rounded-xl"
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
                  <label className="block font-semibold mb-2 text-gray-700">Grade *</label>
                  <select
                    value={newUser.grade}
                    onChange={(e) => setNewUser({...newUser, grade: e.target.value})}
                    className="w-full px-4 py-3 border-2 border-gray-300 rounded-xl"
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
                className="flex-1 py-3 bg-gray-200 text-gray-700 font-bold rounded-xl hover:bg-gray-300"
              >
                Cancel
              </button>
              <button
                onClick={handleAddUser}
                className="flex-1 py-3 bg-gradient-to-r from-blue-500 to-blue-600 text-white font-bold rounded-xl shadow-lg hover:shadow-xl"
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

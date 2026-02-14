import React, { useState, useEffect } from 'react';
import { useAuth, API } from '../AuthContext';
import axios from 'axios';
import { X, Save, FileText } from 'lucide-react';

const Paper2Marking = ({ onClose }) => {
  const { token } = useAuth();
  const [submissions, setSubmissions] = useState([]);
  const [selectedSubmission, setSelectedSubmission] = useState(null);
  const [marks, setMarks] = useState({
    essay_marks: 0,
    short_answer_marks: Array(10).fill(0),
    comments: ''
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadSubmissions();
  }, []);

  const loadSubmissions = async () => {
    try {
      // Mock data - in production, fetch from backend
      setSubmissions([
        {
          id: 'sub1',
          student_name: 'Sample Student',
          exam_title: 'January 2024 - Grade 5 Exam',
          submitted_via: 'whatsapp',
          essay_marks: 0,
          total_marks: 0,
          marked: false
        }
      ]);
      setLoading(false);
    } catch (error) {
      console.error('Failed to load submissions:', error);
      setLoading(false);
    }
  };

  const handleMarkSubmission = async () => {
    if (!selectedSubmission) return;

    try {
      await axios.put(
        `${API}/paper2/${selectedSubmission.id}/mark`,
        marks,
        { headers: { Authorization: `Bearer ${token}` } }
      );
      alert('Paper 2 marked successfully!');
      setSelectedSubmission(null);
      loadSubmissions();
    } catch (error) {
      alert('Failed to mark paper: ' + (error.response?.data?.detail || error.message));
    }
  };

  if (loading) {
    return (
      <div className="fixed inset-0 bg-black/40 backdrop-blur-sm z-50 flex items-center justify-center">
        <div className="spinner"></div>
      </div>
    );
  }

  return (
    <div className="fixed inset-0 bg-black/40 backdrop-blur-sm z-50 overflow-y-auto p-6">
      <div className="max-w-5xl mx-auto bg-white rounded-3xl shadow-2xl border-4" style={{borderColor: '#F59E0B'}}>
        <div className="p-8">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-3xl font-extrabold" style={{color: '#92400E', fontFamily: 'Nunito'}}>
              <FileText className="inline w-7 h-7 mr-2" />
              Paper 2 Marking
            </h2>
            <button
              onClick={onClose}
              className="p-2 hover:bg-gray-100 rounded-xl transition-colors"
            >
              <X className="w-6 h-6" />
            </button>
          </div>

          {!selectedSubmission ? (
            <div>
              <p className="text-gray-600 mb-6">Select a submission to mark</p>
              
              {submissions.length === 0 ? (
                <div className="text-center py-12">
                  <div className="text-6xl mb-4">📝</div>
                  <p className="text-lg text-gray-600">No Paper 2 submissions yet</p>
                </div>
              ) : (
                <div className="space-y-4">
                  {submissions.map(sub => (
                    <div
                      key={sub.id}
                      className="p-6 bg-yellow-50 border-3 border-yellow-200 rounded-2xl hover:shadow-lg transition-shadow cursor-pointer"
                      onClick={() => setSelectedSubmission(sub)}
                    >
                      <div className="flex justify-between items-center">
                        <div>
                          <h3 className="text-xl font-bold" style={{color: '#92400E'}}>{sub.student_name}</h3>
                          <p className="text-sm text-gray-600">{sub.exam_title}</p>
                          <p className="text-sm text-gray-500">Submitted via: {sub.submitted_via}</p>
                        </div>
                        <div>
                          {sub.marked ? (
                            <span className="px-4 py-2 bg-green-500 text-white font-semibold rounded-xl">
                              Marked ({sub.total_marks}/40)
                            </span>
                          ) : (
                            <span className="px-4 py-2 bg-red-500 text-white font-semibold rounded-xl">
                              Pending
                            </span>
                          )}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          ) : (
            <div>
              <div className="mb-6 p-4 bg-blue-50 rounded-xl border-2 border-blue-300">
                <h3 className="font-bold text-lg" style={{color: '#2563EB'}}>Marking: {selectedSubmission.student_name}</h3>
                <p className="text-sm text-gray-600">{selectedSubmission.exam_title}</p>
              </div>

              {/* Essay Marking */}
              <div className="mb-6 p-6 bg-white rounded-2xl border-3 border-yellow-200">
                <h4 className="font-bold text-lg mb-4" style={{color: '#92400E'}}>Essay (20 marks)</h4>
                <input
                  type="number"
                  min="0"
                  max="20"
                  value={marks.essay_marks}
                  onChange={(e) => setMarks({...marks, essay_marks: parseInt(e.target.value) || 0})}
                  className="w-full px-4 py-3 border-3 border-yellow-300 rounded-xl text-xl font-bold"
                  placeholder="Enter marks (0-20)"
                />
              </div>

              {/* Short Answers Marking */}
              <div className="mb-6 p-6 bg-white rounded-2xl border-3 border-yellow-200">
                <h4 className="font-bold text-lg mb-4" style={{color: '#92400E'}}>Short Answers (10 × 2 marks = 20 marks)</h4>
                <div className="grid grid-cols-5 gap-4">
                  {marks.short_answer_marks.map((mark, idx) => (
                    <div key={idx}>
                      <label className="text-sm font-semibold text-gray-600">Q{idx + 1}</label>
                      <input
                        type="number"
                        min="0"
                        max="2"
                        value={mark}
                        onChange={(e) => {
                          const newMarks = [...marks.short_answer_marks];
                          newMarks[idx] = parseInt(e.target.value) || 0;
                          setMarks({...marks, short_answer_marks: newMarks});
                        }}
                        className="w-full px-3 py-2 border-2 border-yellow-300 rounded-lg font-bold"
                      />
                    </div>
                  ))}
                </div>
              </div>

              {/* Total Marks Display */}
              <div className="mb-6 p-4 bg-green-50 rounded-xl border-3 border-green-300">
                <p className="text-2xl font-extrabold" style={{color: '#059669'}}>
                  Total: {marks.essay_marks + marks.short_answer_marks.reduce((a, b) => a + b, 0)} / 40
                </p>
              </div>

              {/* Comments */}
              <div className="mb-6">
                <label className="block font-bold mb-2" style={{color: '#92400E'}}>Teacher Comments</label>
                <textarea
                  value={marks.comments}
                  onChange={(e) => setMarks({...marks, comments: e.target.value})}
                  className="w-full px-4 py-3 border-3 border-yellow-300 rounded-xl"
                  rows={4}
                  placeholder="Add feedback for the student..."
                />
              </div>

              {/* Actions */}
              <div className="flex gap-4">
                <button
                  onClick={() => setSelectedSubmission(null)}
                  className="flex-1 py-3 bg-gray-200 text-gray-700 font-bold rounded-xl hover:bg-gray-300"
                >
                  Back to List
                </button>
                <button
                  onClick={handleMarkSubmission}
                  className="flex-1 py-3 bg-gradient-to-r from-green-500 to-green-600 text-white font-bold rounded-xl shadow-lg hover:shadow-xl"
                >
                  <Save className="inline w-5 h-5 mr-2" />
                  Save Marks
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Paper2Marking;

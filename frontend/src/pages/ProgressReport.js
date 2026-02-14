import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useAuth, API } from '../AuthContext';
import axios from 'axios';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, Radar } from 'recharts';
import { TrendingUp, TrendingDown, Award, AlertCircle, ArrowLeft, Activity } from 'lucide-react';

const ProgressReport = () => {
  const { studentId } = useParams();
  const { token } = useAuth();
  const navigate = useNavigate();
  const [progress, setProgress] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadProgress();
  }, []);

  const loadProgress = async () => {
    try {
      const response = await axios.get(
        `${API}/students/${studentId}/progress`,
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setProgress(response.data);
      setLoading(false);
    } catch (error) {
      console.error('Failed to load progress:', error);
      setLoading(false);
    }
  };

  const getSkillLabel = (skill) => {
    const labels = {
      'mathematical_reasoning': 'Math Reasoning',
      'language_proficiency': 'Language',
      'general_knowledge': 'General Knowledge',
      'comprehension_skills': 'Comprehension',
      'problem_solving': 'Problem Solving',
      'logical_thinking': 'Logical Thinking',
      'spatial_reasoning': 'Spatial Reasoning',
      'memory_recall': 'Memory & Recall',
      'analytical_skills': 'Analytical Skills',
      'critical_thinking': 'Critical Thinking'
    };
    return labels[skill] || skill;
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-[#FFFBF0] to-[#FFF4E6]">
        <div className="text-center">
          <div className="spinner mx-auto mb-4"></div>
          <p className="text-xl font-semibold text-[#92400E]">Loading progress report...</p>
        </div>
      </div>
    );
  }

  if (!progress || progress.monthly_progress.length === 0) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-[#FFFBF0] to-[#FFF4E6] p-6">
        <div className="max-w-4xl mx-auto">
          <button
            onClick={() => navigate(-1)}
            className="mb-6 flex items-center gap-2 text-[#6B7280] hover:text-[#F59E0B] transition-colors"
          >
            <ArrowLeft className="w-5 h-5" />
            <span className="font-semibold">Back</span>
          </button>
          
          <div className="bg-white rounded-xl shadow-lg p-12 text-center border-2 border-[#E5E7EB]">
            <div className="text-6xl mb-4">📊</div>
            <h2 className="text-2xl font-bold text-[#1F2937] mb-2" style={{fontFamily: 'Manrope, sans-serif'}}>No Data Available Yet</h2>
            <p className="text-[#6B7280]">Student needs to complete exams to view progress report</p>
          </div>
        </div>
      </div>
    );
  }

  // Prepare data for line chart
  const lineChartData = progress.monthly_progress.map(month => {
    const data = { month: month.month.substring(5) };
    Object.entries(month.skill_percentages || {}).forEach(([skill, percentage]) => {
      data[getSkillLabel(skill)] = percentage;
    });
    return data;
  });

  // Prepare data for radar chart
  const latestMonth = progress.monthly_progress[progress.monthly_progress.length - 1];
  const radarData = Object.entries(latestMonth.skill_percentages || {}).map(([skill, percentage]) => ({
    skill: getSkillLabel(skill),
    percentage: percentage
  }));

  const skillColors = [
    '#F59E0B', '#10B981', '#3B82F6', '#EF4444', '#8B5CF6',
    '#EC4899', '#14B8A6', '#F97316', '#06B6D4', '#84CC16'
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#FFFBF0] to-[#FFF4E6] p-4 md:p-6">
      <div className="max-w-6xl mx-auto">
        {/* Back Button */}
        <button
          onClick={() => navigate(-1)}
          className="mb-6 flex items-center gap-2 text-[#6B7280] hover:text-[#F59E0B] transition-colors"
        >
          <ArrowLeft className="w-5 h-5" />
          <span className="font-semibold">Back to Dashboard</span>
        </button>

        {/* Header */}
        <div className="bg-white rounded-xl shadow-lg p-6 md:p-8 mb-8 border-2 border-[#F59E0B]">
          <div className="flex items-start gap-4">
            <div className="w-12 h-12 md:w-16 md:h-16 bg-[#FFF7E5] rounded-lg flex items-center justify-center">
              <Activity className="w-6 h-6 md:w-8 md:h-8 text-[#F59E0B]" />
            </div>
            <div className="flex-1">
              <h1 className="text-2xl md:text-4xl font-bold mb-2 text-[#1F2937]" style={{fontFamily: 'Manrope, sans-serif'}}>
                Student Progress Report
              </h1>
              <p className="text-base md:text-lg text-[#6B7280] font-semibold">Comprehensive Skill Analysis</p>
              <p className="text-sm text-[#9CA3AF] mt-1">Track performance across 10 key academic skills</p>
            </div>
          </div>
        </div>

        {/* Overall Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="bg-white rounded-xl p-6 shadow-md border-2 border-[#E5E7EB]">
            <div className="flex items-center gap-3 mb-2">
              <Award className="w-8 h-8 text-[#F59E0B]" />
              <div>
                <div className="text-3xl font-bold text-[#1F2937]" style={{fontFamily: 'Manrope, sans-serif'}}>
                  {progress.overall_average}%
                </div>
                <div className="text-sm font-medium text-[#6B7280]">Overall Average</div>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl p-6 shadow-md border-2 border-[#E5E7EB]">
            <div className="flex items-center gap-3 mb-2">
              <TrendingUp className="w-8 h-8 text-green-600" />
              <div>
                <div className="text-3xl font-bold text-green-600" style={{fontFamily: 'Manrope, sans-serif'}}>
                  {progress.monthly_progress.length}
                </div>
                <div className="text-sm font-medium text-[#6B7280]">Exams Completed</div>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl p-6 shadow-md border-2 border-[#E5E7EB]">
            <div className="flex items-center gap-3 mb-2">
              <Activity className="w-8 h-8 text-blue-600" />
              <div>
                <div className="text-3xl font-bold text-blue-600" style={{fontFamily: 'Manrope, sans-serif'}}>
                  10
                </div>
                <div className="text-sm font-medium text-[#6B7280]">Skills Tracked</div>
              </div>
            </div>
          </div>
        </div>

        {/* Skill Snapshot - Radar Chart */}
        <div className="bg-white rounded-xl shadow-lg p-6 md:p-8 mb-8 border-2 border-[#E5E7EB]">
          <h2 className="text-xl md:text-2xl font-bold mb-6 text-[#1F2937]" style={{fontFamily: 'Manrope, sans-serif'}}>
            Current Skills Snapshot
          </h2>
          <ResponsiveContainer width="100%" height={400}>
            <RadarChart data={radarData}>
              <PolarGrid stroke="#E5E7EB" />
              <PolarAngleAxis dataKey="skill" tick={{ fill: '#6B7280', fontSize: 12 }} />
              <PolarRadiusAxis angle={90} domain={[0, 100]} tick={{ fill: '#6B7280' }} />
              <Radar name="Performance" dataKey="percentage" stroke="#F59E0B" fill="#F59E0B" fillOpacity={0.5} />
              <Tooltip />
            </RadarChart>
          </ResponsiveContainer>
        </div>

        {/* Monthly Progress - Line Chart */}
        <div className="bg-white rounded-xl shadow-lg p-6 md:p-8 mb-8 border-2 border-[#E5E7EB]">
          <h2 className="text-xl md:text-2xl font-bold mb-6 text-[#1F2937]" style={{fontFamily: 'Manrope, sans-serif'}}>
            Month-on-Month Progress
          </h2>
          <ResponsiveContainer width="100%" height={400}>
            <LineChart data={lineChartData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#E5E7EB" />
              <XAxis dataKey="month" tick={{ fill: '#6B7280' }} />
              <YAxis domain={[0, 100]} tick={{ fill: '#6B7280' }} />
              <Tooltip />
              <Legend />
              {Object.keys(lineChartData[0] || {}).filter(key => key !== 'month').map((skill, index) => (
                <Line 
                  key={skill}
                  type="monotone" 
                  dataKey={skill} 
                  stroke={skillColors[index % skillColors.length]} 
                  strokeWidth={2}
                  dot={{ r: 4 }}
                />
              ))}
            </LineChart>
          </ResponsiveContainer>
        </div>

        {/* Skill-wise Breakdown */}
        <div className="bg-white rounded-xl shadow-lg p-6 md:p-8 border-2 border-[#E5E7EB]">
          <h2 className="text-xl md:text-2xl font-bold mb-6 text-[#1F2937]" style={{fontFamily: 'Manrope, sans-serif'}}>
            Detailed Skill Analysis
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {radarData.map((item, index) => {
              const isStrong = item.percentage >= 70;
              const isAverage = item.percentage >= 50 && item.percentage < 70;
              const color = isStrong ? '#10B981' : isAverage ? '#F59E0B' : '#EF4444';
              
              return (
                <div key={item.skill} className="bg-gradient-to-r from-gray-50 to-white p-4 rounded-lg border-2 border-[#E5E7EB]">
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-sm font-bold text-[#374151]">{item.skill}</span>
                    <span className="text-xl font-bold" style={{color}}>
                      {item.percentage}%
                    </span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-3">
                    <div 
                      className="h-3 rounded-full transition-all" 
                      style={{
                        width: `${item.percentage}%`,
                        backgroundColor: color
                      }}
                    ></div>
                  </div>
                  <div className="mt-2 flex items-center gap-2">
                    {isStrong ? (
                      <><TrendingUp className="w-4 h-4 text-green-600" /><span className="text-xs text-green-600 font-semibold">Strong</span></>
                    ) : isAverage ? (
                      <><Activity className="w-4 h-4 text-orange-600" /><span className="text-xs text-orange-600 font-semibold">Average</span></>
                    ) : (
                      <><AlertCircle className="w-4 h-4 text-red-600" /><span className="text-xs text-red-600 font-semibold">Needs Improvement</span></>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Footer */}
        <div className="mt-8 text-center text-sm text-[#6B7280]">
          <p>© 2026 Education Reforms. All rights reserved.</p>
        </div>
      </div>
    </div>
  );
};

export default ProgressReport;

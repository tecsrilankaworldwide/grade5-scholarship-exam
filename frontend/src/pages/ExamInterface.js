import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useAuth, API } from '../AuthContext';
import axios from 'axios';
import { Clock, Flag, CheckCircle, AlertCircle, BookOpen, ArrowLeft, ArrowRight } from 'lucide-react';

const ExamInterface = () => {
  const { examId } = useParams();
  const { token, user } = useAuth();
  const navigate = useNavigate();
  
  const [exam, setExam] = useState(null);
  const [attempt, setAttempt] = useState(null);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState({});
  const [timeLeft, setTimeLeft] = useState(3600);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [result, setResult] = useState(null);
  const [flagged, setFlagged] = useState(new Set());

  useEffect(() => {
    startOrResumeExam();
  }, []);

  useEffect(() => {
    if (!exam || result) return;

    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          handleSubmit();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [exam, result]);

  const startOrResumeExam = async () => {
    try {
      const response = await axios.post(
        `${API}/exams/${examId}/start`,
        {},
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setExam(response.data.exam);
      setAttempt(response.data.attempt);
      setAnswers(response.data.attempt.answers || {});
      setTimeLeft(response.data.time_left);
      setLoading(false);
    } catch (error) {
      console.error('Failed to start exam:', error);
      alert('Failed to start exam: ' + (error.response?.data?.detail || error.message));
      navigate('/dashboard');
    }
  };

  const handleAnswerSelect = (questionId, option) => {
    setAnswers(prev => ({
      ...prev,
      [questionId]: option
    }));
  };

  const handleSubmit = async () => {
    if (submitting) return;
    
    const confirmed = window.confirm(
      `Are you sure you want to submit your exam?\n\nAnswered: ${Object.keys(answers).length}/${exam.questions.length}`
    );
    
    if (!confirmed) return;

    setSubmitting(true);
    try {
      const response = await axios.post(
        `${API}/exams/${examId}/submit`,
        { answers },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setResult(response.data);
    } catch (error) {
      console.error('Failed to submit exam:', error);
      alert('Failed to submit exam: ' + (error.response?.data?.detail || error.message));
      setSubmitting(false);
    }
  };

  const toggleFlag = (questionId) => {
    setFlagged(prev => {
      const newSet = new Set(prev);
      if (newSet.has(questionId)) {
        newSet.delete(questionId);
      } else {
        newSet.add(questionId);
      }
      return newSet;
    });
  };

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-[#FFFBF0] to-[#FFF4E6]">
        <div className="text-center">
          <div className="spinner mx-auto mb-4"></div>
          <p className="text-xl font-semibold text-[#92400E]">Loading your exam...</p>
        </div>
      </div>
    );
  }

  if (result) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-[#FFFBF0] to-[#FFF4E6] p-4 md:p-6">
        <div className="max-w-4xl mx-auto">
          <div className="bg-white rounded-2xl shadow-xl p-6 md:p-10 border-2 border-[#10B981]">
            <div className="text-center mb-8">
              <div className="w-20 h-20 md:w-24 md:h-24 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <CheckCircle className="w-10 h-10 md:w-12 md:h-12 text-green-600" />
              </div>
              <h1 className="text-3xl md:text-4xl font-bold mb-2 text-green-600" style={{fontFamily: 'Manrope, sans-serif'}}>Exam Submitted Successfully!</h1>
              <p className="text-base md:text-lg text-[#6B7280]">Great job completing the exam!</p>
            </div>

            {/* Score Card */}
            <div className="bg-gradient-to-r from-green-50 to-blue-50 rounded-xl p-6 md:p-8 mb-6 border-2 border-[#E5E7EB]">
              <div className="grid grid-cols-3 gap-4 md:gap-6 text-center">
                <div>
                  <div className="text-4xl md:text-5xl font-bold mb-2 text-green-600" style={{fontFamily: 'Manrope, sans-serif'}}>{result.score}</div>
                  <div className="text-xs md:text-sm font-semibold text-[#6B7280]">Your Score</div>
                </div>
                <div>
                  <div className="text-4xl md:text-5xl font-bold mb-2 text-[#92400E]" style={{fontFamily: 'Manrope, sans-serif'}}>{result.total}</div>
                  <div className="text-xs md:text-sm font-semibold text-[#6B7280]">Total Marks</div>
                </div>
                <div>
                  <div className="text-4xl md:text-5xl font-bold mb-2 text-[#F59E0B]" style={{fontFamily: 'Manrope, sans-serif'}}>{result.percentage}%</div>
                  <div className="text-xs md:text-sm font-semibold text-[#6B7280]">Percentage</div>
                </div>
              </div>
            </div>

            {/* Skill Breakdown */}
            <div className="mb-8">
              <h3 className="text-xl md:text-2xl font-bold mb-4 text-[#1F2937]" style={{fontFamily: 'Manrope, sans-serif'}}>Performance by Skill</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {Object.entries(result.skill_percentages || {}).map(([skill, percentage]) => (
                  <div key={skill} className="bg-white border-2 border-[#E5E7EB] rounded-lg p-4">
                    <div className="flex justify-between items-center mb-2">
                      <span className="text-sm font-semibold text-[#374151] capitalize">
                        {skill.replace(/_/g, ' ')}
                      </span>
                      <span className="text-lg md:text-xl font-bold" style={{color: percentage >= 70 ? '#10B981' : percentage >= 50 ? '#F59E0B' : '#EF4444'}}>
                        {percentage}%
                      </span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div 
                        className="h-2 rounded-full" 
                        style={{
                          width: `${percentage}%`,
                          background: percentage >= 70 ? '#10B981' : percentage >= 50 ? '#F59E0B' : '#EF4444'
                        }}
                      ></div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <button
              onClick={() => navigate('/dashboard')}
              className="w-full py-4 bg-[#F59E0B] text-white font-bold rounded-lg hover:bg-[#D97706] transition-all text-base md:text-lg"
              style={{fontFamily: 'Manrope, sans-serif'}}
            >
              Back to Dashboard →
            </button>
          </div>
        </div>
      </div>
    );
  }

  const questions = exam.questions || [];
  const currentQuestion = questions[currentQuestionIndex];
  const progress = ((currentQuestionIndex + 1) / questions.length) * 100;
  const answeredCount = Object.keys(answers).length;

  if (!currentQuestion) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-[#FFFBF0] to-[#FFF4E6]">
        <div className="text-center">
          <div className="spinner mx-auto mb-4"></div>
          <p className="text-lg font-semibold text-[#92400E]">Loading Question...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#FFFBF0] to-[#FFF4E6]">
      {/* Header with Timer */}
      <div className="bg-white shadow-md border-b-4 border-[#F59E0B]">
        <div className="max-w-6xl mx-auto px-4 md:px-6 py-4">
          <div className="flex flex-col md:flex-row justify-between items-center gap-3">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-[#F59E0B] rounded-lg flex items-center justify-center">
                <BookOpen className="w-5 h-5 text-white" />
              </div>
              <div>
                <h1 className="text-lg md:text-xl font-bold text-[#1F2937]" style={{fontFamily: 'Manrope, sans-serif'}}>{exam.title}</h1>
                <p className="text-xs md:text-sm text-[#6B7280]">Question {currentQuestionIndex + 1} of {questions.length}</p>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <div className={`flex items-center gap-2 px-4 py-2 rounded-lg font-bold ${timeLeft < 300 ? 'bg-red-100 text-red-600' : 'bg-blue-100 text-blue-600'}`}>
                <Clock className="w-5 h-5" />
                <span className="text-lg">{formatTime(timeLeft)}</span>
              </div>
              <button
                onClick={handleSubmit}
                disabled={submitting}
                className="px-4 py-2 bg-green-600 text-white font-semibold rounded-lg hover:bg-green-700 disabled:opacity-50"
              >
                {submitting ? 'Submitting...' : 'Submit'}
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Progress Bar */}
      <div className="bg-gray-200 h-2">
        <div 
          className="bg-[#F59E0B] h-2 transition-all duration-300"
          style={{ width: `${progress}%` }}
        ></div>
      </div>

      {/* Main Content */}
      <div className="max-w-4xl mx-auto p-4 md:p-6">
        <div className="bg-white rounded-xl shadow-lg p-6 md:p-8 mb-6 border-2 border-[#E5E7EB]">
          {/* Question */}
          <div className="flex justify-between items-start mb-6">
            <h2 className="text-xl md:text-2xl font-bold text-[#1F2937] flex-1" style={{fontFamily: 'Manrope, sans-serif'}}>
              {currentQuestion.question_text}
            </h2>
            <button
              onClick={() => toggleFlag(currentQuestion.id)}
              className={`ml-4 p-2 rounded-lg transition-colors ${
                flagged.has(currentQuestion.id) 
                  ? 'bg-red-100 text-red-600' 
                  : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
              }`}
            >
              <Flag className="w-5 h-5" fill={flagged.has(currentQuestion.id) ? 'currentColor' : 'none'} />
            </button>
          </div>

          {/* Options */}
          <div className="space-y-3">
            {['A', 'B', 'C', 'D', 'E'].map((option) => {
              const optionText = currentQuestion[`option_${option.toLowerCase()}`];
              if (!optionText) return null;
              
              const isSelected = answers[currentQuestion.id] === option;
              
              return (
                <button
                  key={option}
                  onClick={() => handleAnswerSelect(currentQuestion.id, option)}
                  className={`w-full p-4 text-left rounded-lg border-2 transition-all ${
                    isSelected
                      ? 'border-[#F59E0B] bg-[#FFF7E5] font-semibold'
                      : 'border-[#E5E7EB] hover:border-[#F59E0B] hover:bg-[#FFFBF0]'
                  }`}
                  style={{fontFamily: 'Figtree, sans-serif'}}
                >
                  <span className="font-bold text-[#F59E0B] mr-3">{option}.</span>
                  <span className="text-[#1F2937]">{optionText}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Navigation */}
        <div className="flex justify-between items-center">
          <button
            onClick={() => setCurrentQuestionIndex(prev => Math.max(0, prev - 1))}
            disabled={currentQuestionIndex === 0}
            className="flex items-center gap-2 px-6 py-3 bg-gray-200 text-gray-700 font-semibold rounded-lg hover:bg-gray-300 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <ArrowLeft className="w-5 h-5" />
            Previous
          </button>
          
          <div className="text-center">
            <p className="text-sm text-[#6B7280] font-semibold">
              Answered: {answeredCount} / {questions.length}
            </p>
          </div>
          
          <button
            onClick={() => setCurrentQuestionIndex(prev => Math.min(questions.length - 1, prev + 1))}
            disabled={currentQuestionIndex === questions.length - 1}
            className="flex items-center gap-2 px-6 py-3 bg-[#F59E0B] text-white font-semibold rounded-lg hover:bg-[#D97706] disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Next
            <ArrowRight className="w-5 h-5" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default ExamInterface;

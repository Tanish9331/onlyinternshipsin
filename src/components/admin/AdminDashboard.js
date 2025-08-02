import React, { useState } from 'react';
import { useAuth } from '../../contexts/AuthContext';
import { 
  FaSignOutAlt, 
  FaToggleOn, 
  FaToggleOff,
  FaUsers,
  FaChartBar,
  FaTrophy,
  FaCog,
  FaEye,
  FaEdit,
  FaTrash,
  FaPlus,
  FaDownload
} from 'react-icons/fa';
import toast from 'react-hot-toast';
import YugaYatraLogo from '../common/YugaYatraLogo';

const AdminDashboard = () => {
  const { user, logout } = useAuth();
  
  const [activeTab, setActiveTab] = useState('overview');
  const [testsEnabled, setTestsEnabled] = useState(true);
  const [showQuestionModal, setShowQuestionModal] = useState(false);
  const [editingQuestion, setEditingQuestion] = useState(null);

  // Mock data for demonstration
  const [candidates] = useState([
    {
      id: 1,
      email: 'student1@example.com',
      name: 'John Doe',
      attempts: 1,
      bestScore: 85,
      percentile: 92,
      lastAttempt: '2024-01-15',
      status: 'passed'
    },
    {
      id: 2,
      email: 'student2@example.com',
      name: 'Jane Smith',
      attempts: 2,
      bestScore: 78,
      percentile: 85,
      lastAttempt: '2024-01-14',
      status: 'passed'
    },
    {
      id: 3,
      email: 'student3@example.com',
      name: 'Mike Johnson',
      attempts: 1,
      bestScore: 45,
      percentile: 35,
      lastAttempt: '2024-01-13',
      status: 'failed'
    },
    {
      id: 4,
      email: 'student4@example.com',
      name: 'Sarah Wilson',
      attempts: 3,
      bestScore: 92,
      percentile: 98,
      lastAttempt: '2024-01-12',
      status: 'passed'
    },
    {
      id: 5,
      email: 'student5@example.com',
      name: 'David Brown',
      attempts: 1,
      bestScore: 55,
      percentile: 45,
      lastAttempt: '2024-01-11',
      status: 'failed'
    }
  ]);

  const [questions] = useState([
    {
      id: 1,
      question: "What is the capital of India?",
      options: ["Mumbai", "Delhi", "Kolkata", "Chennai"],
      correctAnswer: 1,
      difficulty: "easy",
      category: "General Knowledge"
    },
    {
      id: 2,
      question: "Which programming language is known as the 'language of the web'?",
      options: ["Python", "Java", "JavaScript", "C++"],
      correctAnswer: 2,
      difficulty: "moderate",
      category: "Computer Science"
    },
    {
      id: 3,
      question: "What is the Heisenberg Uncertainty Principle?",
      options: [
        "You cannot simultaneously know the position and momentum of a particle",
        "Energy cannot be created or destroyed",
        "Every action has an equal and opposite reaction",
        "Light travels in straight lines"
      ],
      correctAnswer: 0,
      difficulty: "expert",
      category: "Physics"
    }
  ]);

  const stats = {
    totalCandidates: candidates.length,
    totalTests: candidates.reduce((sum, c) => sum + c.attempts, 0),
    passRate: Math.round((candidates.filter(c => c.status === 'passed').length / candidates.length) * 100),
    averageScore: Math.round(candidates.reduce((sum, c) => sum + c.bestScore, 0) / candidates.length),
    revenue: candidates.length * 295
  };

  const meritList = candidates
    .filter(c => c.status === 'passed')
    .sort((a, b) => b.percentile - a.percentile)
    .slice(0, Math.ceil(candidates.length * 0.1)); // Top 10%

  const handleToggleTests = () => {
    setTestsEnabled(!testsEnabled);
    toast.success(`Tests ${!testsEnabled ? 'enabled' : 'disabled'} successfully!`);
  };

  const handleAddQuestion = () => {
    setEditingQuestion(null);
    setShowQuestionModal(true);
  };

  const handleEditQuestion = (question) => {
    setEditingQuestion(question);
    setShowQuestionModal(true);
  };

  const handleDeleteQuestion = (questionId) => {
    if (window.confirm('Are you sure you want to delete this question?')) {
      toast.success('Question deleted successfully!');
    }
  };

  const getStatusBadge = (status) => {
    return status === 'passed' ? 'success-badge' : 'danger-badge';
  };

  const getDifficultyBadge = (difficulty) => {
    const colors = {
      easy: 'bg-green-100 text-green-800',
      moderate: 'bg-yellow-100 text-yellow-800',
      expert: 'bg-red-100 text-red-800'
    };
    return colors[difficulty] || 'bg-gray-100 text-gray-800';
  };

  return (
    <div className="min-h-screen bg-light-bg">
      {/* Header */}
      <header className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <div className="flex items-center">
              <YugaYatraLogo className="w-12 h-12" showText={false} />
              <div className="ml-3">
                <h1 className="text-2xl font-bold text-primary-dark">Admin Dashboard</h1>
                <p className="text-sm text-gray-600">Welcome back, {user?.name}!</p>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <button
                onClick={handleToggleTests}
                className={`flex items-center px-4 py-2 rounded-lg font-medium ${
                  testsEnabled 
                    ? 'bg-green-100 text-green-800' 
                    : 'bg-red-100 text-red-800'
                }`}
              >
                {testsEnabled ? <FaToggleOn className="mr-2" /> : <FaToggleOff className="mr-2" />}
                Tests {testsEnabled ? 'Enabled' : 'Disabled'}
              </button>
              <button
                onClick={logout}
                className="flex items-center text-accent-red hover:text-red-600 transition-colors"
              >
                <FaSignOutAlt className="mr-2" />
                Logout
              </button>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Tab Navigation */}
        <div className="flex space-x-1 bg-white rounded-lg p-1 mb-8 shadow-sm">
          {[
            { id: 'overview', label: 'Overview', icon: FaChartBar },
            { id: 'candidates', label: 'Candidates', icon: FaUsers },
            { id: 'merit', label: 'Merit List', icon: FaTrophy },
            { id: 'questions', label: 'Questions', icon: FaCog }
          ].map((tab) => {
            const Icon = tab.icon;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center px-4 py-2 rounded-md font-medium transition-all duration-200 ${
                  activeTab === tab.id
                    ? 'bg-primary-dark text-white shadow-sm'
                    : 'text-gray-600 hover:text-primary-dark hover:bg-gray-100'
                }`}
              >
                <Icon className="mr-2" />
                {tab.label}
              </button>
            );
          })}
        </div>

        {/* Overview Tab */}
        {activeTab === 'overview' && (
          <div className="space-y-8">
            {/* Statistics Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <div className="card text-center">
                <FaUsers className="text-3xl text-blue-500 mx-auto mb-3" />
                <h3 className="text-2xl font-bold text-primary-dark">{stats.totalCandidates}</h3>
                <p className="text-gray-600">Total Candidates</p>
              </div>
              <div className="card text-center">
                <FaChartBar className="text-3xl text-green-500 mx-auto mb-3" />
                <h3 className="text-2xl font-bold text-primary-dark">{stats.totalTests}</h3>
                <p className="text-gray-600">Tests Taken</p>
              </div>
              <div className="card text-center">
                <FaTrophy className="text-3xl text-yellow-500 mx-auto mb-3" />
                <h3 className="text-2xl font-bold text-primary-dark">{stats.passRate}%</h3>
                <p className="text-gray-600">Pass Rate</p>
              </div>
              <div className="card text-center">
                <FaCog className="text-3xl text-purple-500 mx-auto mb-3" />
                <h3 className="text-2xl font-bold text-primary-dark">₹{stats.revenue.toLocaleString()}</h3>
                <p className="text-gray-600">Total Revenue</p>
              </div>
            </div>

            {/* Recent Activity */}
            <div className="card">
              <h2 className="text-xl font-semibold text-primary-dark mb-6">Recent Test Activity</h2>
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b border-gray-200">
                      <th className="text-left py-3 px-4 font-medium text-gray-700">Candidate</th>
                      <th className="text-left py-3 px-4 font-medium text-gray-700">Score</th>
                      <th className="text-left py-3 px-4 font-medium text-gray-700">Status</th>
                      <th className="text-left py-3 px-4 font-medium text-gray-700">Date</th>
                    </tr>
                  </thead>
                  <tbody>
                    {candidates.slice(0, 5).map((candidate) => (
                      <tr key={candidate.id} className="border-b border-gray-100">
                        <td className="py-3 px-4">
                          <div>
                            <p className="font-medium text-primary-dark">{candidate.name}</p>
                            <p className="text-sm text-gray-600">{candidate.email}</p>
                          </div>
                        </td>
                        <td className="py-3 px-4">
                          <span className="font-medium">{candidate.bestScore}%</span>
                          <span className="text-sm text-gray-600 ml-2">(P{candidate.percentile})</span>
                        </td>
                        <td className="py-3 px-4">
                          <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusBadge(candidate.status)}`}>
                            {candidate.status.toUpperCase()}
                          </span>
                        </td>
                        <td className="py-3 px-4 text-sm text-gray-600">
                          {new Date(candidate.lastAttempt).toLocaleDateString()}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {/* Candidates Tab */}
        {activeTab === 'candidates' && (
          <div className="card">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-xl font-semibold text-primary-dark">All Candidates</h2>
              <button className="btn-outline flex items-center">
                <FaDownload className="mr-2" />
                Export Data
              </button>
            </div>
            
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-gray-200">
                    <th className="text-left py-3 px-4 font-medium text-gray-700">Name</th>
                    <th className="text-left py-3 px-4 font-medium text-gray-700">Email</th>
                    <th className="text-left py-3 px-4 font-medium text-gray-700">Attempts</th>
                    <th className="text-left py-3 px-4 font-medium text-gray-700">Best Score</th>
                    <th className="text-left py-3 px-4 font-medium text-gray-700">Percentile</th>
                    <th className="text-left py-3 px-4 font-medium text-gray-700">Status</th>
                    <th className="text-left py-3 px-4 font-medium text-gray-700">Last Attempt</th>
                    <th className="text-left py-3 px-4 font-medium text-gray-700">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {candidates.map((candidate) => (
                    <tr key={candidate.id} className="border-b border-gray-100">
                      <td className="py-3 px-4 font-medium text-primary-dark">{candidate.name}</td>
                      <td className="py-3 px-4 text-gray-600">{candidate.email}</td>
                      <td className="py-3 px-4">{candidate.attempts}</td>
                      <td className="py-3 px-4 font-medium">{candidate.bestScore}%</td>
                      <td className="py-3 px-4">P{candidate.percentile}</td>
                      <td className="py-3 px-4">
                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusBadge(candidate.status)}`}>
                          {candidate.status.toUpperCase()}
                        </span>
                      </td>
                      <td className="py-3 px-4 text-sm text-gray-600">
                        {new Date(candidate.lastAttempt).toLocaleDateString()}
                      </td>
                      <td className="py-3 px-4">
                        <button className="text-primary-dark hover:text-accent-red transition-colors mr-2">
                          <FaEye />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* Merit List Tab */}
        {activeTab === 'merit' && (
          <div className="card">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-xl font-semibold text-primary-dark">Merit List (Top 10%)</h2>
              <button className="btn-outline flex items-center">
                <FaDownload className="mr-2" />
                Download Merit List
              </button>
            </div>
            
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-gray-200">
                    <th className="text-left py-3 px-4 font-medium text-gray-700">Rank</th>
                    <th className="text-left py-3 px-4 font-medium text-gray-700">Name</th>
                    <th className="text-left py-3 px-4 font-medium text-gray-700">Email</th>
                    <th className="text-left py-3 px-4 font-medium text-gray-700">Score</th>
                    <th className="text-left py-3 px-4 font-medium text-gray-700">Percentile</th>
                    <th className="text-left py-3 px-4 font-medium text-gray-700">Attempts</th>
                  </tr>
                </thead>
                <tbody>
                  {meritList.map((candidate, index) => (
                    <tr key={candidate.id} className="border-b border-gray-100">
                      <td className="py-3 px-4">
                        <div className="flex items-center">
                          {index < 3 ? (
                            <FaTrophy className={`text-xl mr-2 ${
                              index === 0 ? 'text-yellow-500' : 
                              index === 1 ? 'text-gray-400' : 'text-orange-500'
                            }`} />
                          ) : null}
                          <span className="font-bold text-primary-dark">#{index + 1}</span>
                        </div>
                      </td>
                      <td className="py-3 px-4 font-medium text-primary-dark">{candidate.name}</td>
                      <td className="py-3 px-4 text-gray-600">{candidate.email}</td>
                      <td className="py-3 px-4 font-medium text-success">{candidate.bestScore}%</td>
                      <td className="py-3 px-4 font-bold text-accent-red">P{candidate.percentile}</td>
                      <td className="py-3 px-4">{candidate.attempts}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* Questions Tab */}
        {activeTab === 'questions' && (
          <div className="card">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-xl font-semibold text-primary-dark">Question Bank</h2>
              <button
                onClick={handleAddQuestion}
                className="btn-primary flex items-center"
              >
                <FaPlus className="mr-2" />
                Add Question
              </button>
            </div>
            
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-gray-200">
                    <th className="text-left py-3 px-4 font-medium text-gray-700">Question</th>
                    <th className="text-left py-3 px-4 font-medium text-gray-700">Category</th>
                    <th className="text-left py-3 px-4 font-medium text-gray-700">Difficulty</th>
                    <th className="text-left py-3 px-4 font-medium text-gray-700">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {questions.map((question) => (
                    <tr key={question.id} className="border-b border-gray-100">
                      <td className="py-3 px-4">
                        <div className="max-w-md">
                          <p className="font-medium text-primary-dark">{question.question}</p>
                          <p className="text-sm text-gray-600 mt-1">
                            Correct: {String.fromCharCode(65 + question.correctAnswer)}
                          </p>
                        </div>
                      </td>
                      <td className="py-3 px-4 text-gray-600">{question.category}</td>
                      <td className="py-3 px-4">
                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${getDifficultyBadge(question.difficulty)}`}>
                          {question.difficulty.charAt(0).toUpperCase() + question.difficulty.slice(1)}
                        </span>
                      </td>
                      <td className="py-3 px-4">
                        <div className="flex space-x-2">
                          <button
                            onClick={() => handleEditQuestion(question)}
                            className="text-blue-600 hover:text-blue-800 transition-colors"
                          >
                            <FaEdit />
                          </button>
                          <button
                            onClick={() => handleDeleteQuestion(question.id)}
                            className="text-red-600 hover:text-red-800 transition-colors"
                          >
                            <FaTrash />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </div>

      {/* Question Modal */}
      {showQuestionModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl max-w-2xl w-full max-h-[80vh] overflow-y-auto">
            <div className="p-6">
              <h3 className="text-2xl font-bold text-primary-dark mb-6">
                {editingQuestion ? 'Edit Question' : 'Add New Question'}
              </h3>
              
              <form className="space-y-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Question Text
                  </label>
                  <textarea
                    className="input-field"
                    rows={3}
                    placeholder="Enter the question..."
                    defaultValue={editingQuestion?.question || ''}
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Category
                    </label>
                    <select className="input-field">
                      <option>General Knowledge</option>
                      <option>Computer Science</option>
                      <option>Mathematics</option>
                      <option>Science</option>
                      <option>Physics</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Difficulty
                    </label>
                    <select className="input-field">
                      <option value="easy">Easy</option>
                      <option value="moderate">Moderate</option>
                      <option value="expert">Expert</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Options
                  </label>
                  <div className="space-y-3">
                    {['A', 'B', 'C', 'D'].map((option, index) => (
                      <div key={option} className="flex items-center space-x-3">
                        <input
                          type="radio"
                          name="correctAnswer"
                          value={index}
                          defaultChecked={editingQuestion?.correctAnswer === index}
                          className="text-primary-dark"
                        />
                        <input
                          type="text"
                          className="input-field flex-1"
                          placeholder={`Option ${option}`}
                          defaultValue={editingQuestion?.options[index] || ''}
                        />
                      </div>
                    ))}
                  </div>
                </div>

                <div className="flex justify-end space-x-4">
                  <button
                    type="button"
                    onClick={() => setShowQuestionModal(false)}
                    className="btn-outline px-6 py-2"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="btn-primary px-6 py-2"
                  >
                    {editingQuestion ? 'Update Question' : 'Add Question'}
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminDashboard; 
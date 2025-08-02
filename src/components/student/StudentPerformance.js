import React, { useState } from 'react';
import { useAuth } from '../../contexts/AuthContext';
import { 
  FaChartLine,
  FaTrophy,
  FaClock,
  FaCheckCircle,
  FaArrowUp,
  FaArrowDown,
  FaMinus,
  FaCalendarAlt,
  FaBullseye,
  FaMedal
} from 'react-icons/fa';
import StudentNavigation from './StudentNavigation';

const StudentPerformance = () => {
  const [selectedPeriod, setSelectedPeriod] = useState('all');

  // Mock performance data
  const performanceData = {
    totalTests: 5,
    averageScore: 78.4,
    bestScore: 92,
    worstScore: 65,
    totalTime: 145, // minutes
    averageTime: 29, // minutes
    passingRate: 80, // percentage
    certificates: 4,
    rank: 15,
    totalCandidates: 150,
    percentile: 85,
    improvement: 12, // percentage improvement
    recentScores: [85, 78, 92, 71, 88],
    categoryPerformance: {
      'Programming': 82,
      'Data Structures': 75,
      'Algorithms': 80,
      'Database': 85,
      'Web Development': 78
    },
    timeAnalysis: {
      '0-15 min': 1,
      '15-25 min': 2,
      '25-30 min': 2
    },
    monthlyProgress: [
      { month: 'Jan', score: 65, tests: 1 },
      { month: 'Feb', score: 78, tests: 2 },
      { month: 'Mar', score: 85, tests: 1 },
      { month: 'Apr', score: 92, tests: 1 }
    ]
  };

  const getScoreColor = (score) => {
    if (score >= 90) return 'text-green-600';
    if (score >= 80) return 'text-blue-600';
    if (score >= 70) return 'text-yellow-600';
    return 'text-red-600';
  };

  const getScoreLabel = (score) => {
    if (score >= 90) return 'Excellent';
    if (score >= 80) return 'Very Good';
    if (score >= 70) return 'Good';
    if (score >= 60) return 'Average';
    return 'Needs Improvement';
  };

  const getImprovementIcon = (improvement) => {
    if (improvement > 0) return <FaArrowUp className="text-green-500" />;
    if (improvement < 0) return <FaArrowDown className="text-red-500" />;
    return <FaMinus className="text-gray-500" />;
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Navigation */}
      <StudentNavigation />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 pt-32">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Performance Analytics</h1>
          <p className="text-gray-600">Detailed insights into your test performance and progress</p>
        </div>

        {/* Period Filter */}
        <div className="mb-6">
          <div className="flex space-x-2">
            {['all', 'month', 'quarter', 'year'].map((period) => (
              <button
                key={period}
                onClick={() => setSelectedPeriod(period)}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                  selectedPeriod === period
                    ? 'bg-gold-100 text-gold-800'
                    : 'bg-white text-gray-600 hover:text-gold-600 hover:bg-gold-50'
                }`}
              >
                {period.charAt(0).toUpperCase() + period.slice(1)}
              </button>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Stats */}
          <div className="lg:col-span-2 space-y-6">
            {/* Key Metrics */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              <div className="card text-center">
                <FaChartLine className="text-3xl text-blue-500 mx-auto mb-3" />
                <h3 className="text-2xl font-bold text-blue-800">{performanceData.averageScore}%</h3>
                <p className="text-sm text-blue-600">Average Score</p>
                <div className="flex items-center justify-center mt-2">
                  {getImprovementIcon(performanceData.improvement)}
                  <span className="text-xs ml-1">{Math.abs(performanceData.improvement)}%</span>
                </div>
              </div>

              <div className="card text-center">
                <FaTrophy className="text-3xl text-green-500 mx-auto mb-3" />
                <h3 className="text-2xl font-bold text-green-800">{performanceData.bestScore}%</h3>
                <p className="text-sm text-green-600">Best Score</p>
                <p className="text-xs text-gray-500 mt-1">Personal Record</p>
              </div>

              <div className="card text-center">
                <FaClock className="text-3xl text-purple-500 mx-auto mb-3" />
                <h3 className="text-2xl font-bold text-purple-800">{performanceData.averageTime}m</h3>
                <p className="text-sm text-purple-600">Avg Time</p>
                <p className="text-xs text-gray-500 mt-1">Per Test</p>
              </div>

              <div className="card text-center">
                <FaCheckCircle className="text-3xl text-yellow-500 mx-auto mb-3" />
                <h3 className="text-2xl font-bold text-yellow-800">{performanceData.passingRate}%</h3>
                <p className="text-sm text-yellow-600">Pass Rate</p>
                <p className="text-xs text-gray-500 mt-1">Success Rate</p>
              </div>
            </div>

            {/* Progress Chart */}
            <div className="card">
              <h2 className="text-xl font-semibold text-primary-dark mb-6">Monthly Progress</h2>
              <div className="space-y-4">
                {performanceData.monthlyProgress.map((item, index) => (
                  <div key={index} className="flex items-center justify-between">
                    <div className="flex items-center space-x-4">
                      <div className="w-12 text-center">
                        <FaCalendarAlt className="text-gray-400 mx-auto mb-1" />
                        <span className="text-sm font-medium">{item.month}</span>
                      </div>
                      <div className="flex-1">
                        <div className="flex justify-between text-sm mb-1">
                          <span>Score: {item.score}%</span>
                          <span>{item.tests} test{item.tests > 1 ? 's' : ''}</span>
                        </div>
                        <div className="w-full bg-gray-200 rounded-full h-2">
                          <div
                            className={`h-2 rounded-full ${getScoreColor(item.score).replace('text-', 'bg-')}`}
                            style={{ width: `${item.score}%` }}
                          ></div>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Category Performance */}
            <div className="card">
              <h2 className="text-xl font-semibold text-primary-dark mb-6">Category Performance</h2>
              <div className="space-y-4">
                {Object.entries(performanceData.categoryPerformance).map(([category, score]) => (
                  <div key={category} className="flex items-center justify-between">
                    <span className="font-medium text-gray-700">{category}</span>
                    <div className="flex items-center space-x-3">
                      <div className="w-32 bg-gray-200 rounded-full h-2">
                        <div
                          className={`h-2 rounded-full ${getScoreColor(score).replace('text-', 'bg-')}`}
                          style={{ width: `${score}%` }}
                        ></div>
                      </div>
                      <span className={`font-semibold ${getScoreColor(score)}`}>{score}%</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Ranking */}
            <div className="card">
              <h2 className="text-xl font-semibold text-primary-dark mb-4">Your Ranking</h2>
              <div className="text-center">
                <FaMedal className="text-6xl text-gold-500 mx-auto mb-4" />
                <h3 className="text-3xl font-bold text-gold-800 mb-2">
                  #{performanceData.rank}
                </h3>
                <p className="text-gray-600 mb-2">out of {performanceData.totalCandidates} candidates</p>
                <div className="bg-gold-100 text-gold-800 px-4 py-2 rounded-lg">
                  <span className="font-semibold">{performanceData.percentile}th Percentile</span>
                </div>
              </div>
            </div>

            {/* Recent Scores */}
            <div className="card">
              <h2 className="text-xl font-semibold text-primary-dark mb-4">Recent Scores</h2>
              <div className="space-y-3">
                {performanceData.recentScores.map((score, index) => (
                  <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                    <div className="flex items-center">
                      <span className="text-sm text-gray-500">Test #{performanceData.recentScores.length - index}</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <span className={`font-semibold ${getScoreColor(score)}`}>{score}%</span>
                      <span className="text-xs text-gray-500">{getScoreLabel(score)}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Time Analysis */}
            <div className="card">
              <h2 className="text-xl font-semibold text-primary-dark mb-4">Time Analysis</h2>
              <div className="space-y-3">
                {Object.entries(performanceData.timeAnalysis).map(([range, count]) => (
                  <div key={range} className="flex items-center justify-between">
                    <span className="text-sm text-gray-600">{range}</span>
                    <div className="flex items-center space-x-2">
                      <div className="w-16 bg-gray-200 rounded-full h-2">
                        <div
                          className="bg-blue-500 h-2 rounded-full"
                          style={{ width: `${(count / performanceData.totalTests) * 100}%` }}
                        ></div>
                      </div>
                      <span className="text-sm font-medium">{count}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Achievements */}
            <div className="card">
              <h2 className="text-xl font-semibold text-primary-dark mb-4">Achievements</h2>
              <div className="space-y-3">
                <div className="flex items-center space-x-3 p-3 bg-green-50 rounded-lg">
                  <FaTrophy className="text-green-500" />
                  <div>
                    <p className="font-medium text-green-800">First Certificate</p>
                    <p className="text-sm text-green-600">Earned your first certificate</p>
                  </div>
                </div>
                <div className="flex items-center space-x-3 p-3 bg-blue-50 rounded-lg">
                  <FaBullseye className="text-blue-500" />
                  <div>
                    <p className="font-medium text-blue-800">Consistent Performer</p>
                    <p className="text-sm text-blue-600">3 tests above 80%</p>
                  </div>
                </div>
                <div className="flex items-center space-x-3 p-3 bg-purple-50 rounded-lg">
                  <FaChartLine className="text-purple-500" />
                  <div>
                    <p className="font-medium text-purple-800">Improving</p>
                    <p className="text-sm text-purple-600">12% score improvement</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StudentPerformance; 
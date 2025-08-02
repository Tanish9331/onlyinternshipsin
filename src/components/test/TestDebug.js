import React from 'react';
import { useTest } from '../../contexts/TestContext';
import { useAuth } from '../../contexts/AuthContext';

const TestDebug = () => {
  const { 
    testStarted, 
    questions, 
    currentQuestionIndex, 
    answers, 
    timeRemaining, 
    warnings,
    loading,
    testCompleted,
    results
  } = useTest();
  
  const { user } = useAuth();

  return (
    <div className="min-h-screen bg-light-bg p-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold text-primary-dark mb-8">Test Debug Information</h1>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* User Information */}
          <div className="card">
            <h2 className="text-xl font-semibold text-primary-dark mb-4">User Information</h2>
            <div className="space-y-2">
              <p><strong>Name:</strong> {user?.name || 'Not set'}</p>
              <p><strong>Email:</strong> {user?.email || 'Not set'}</p>
              <p><strong>Profile Complete:</strong> {user?.profileComplete ? 'Yes' : 'No'}</p>
            </div>
          </div>

          {/* Test State */}
          <div className="card">
            <h2 className="text-xl font-semibold text-primary-dark mb-4">Test State</h2>
            <div className="space-y-2">
              <p><strong>Test Started:</strong> {testStarted ? 'Yes' : 'No'}</p>
              <p><strong>Test Completed:</strong> {testCompleted ? 'Yes' : 'No'}</p>
              <p><strong>Loading:</strong> {loading ? 'Yes' : 'No'}</p>
              <p><strong>Questions Count:</strong> {questions.length}</p>
              <p><strong>Current Question:</strong> {currentQuestionIndex + 1}</p>
              <p><strong>Time Remaining:</strong> {timeRemaining}s</p>
              <p><strong>Warnings:</strong> {warnings}/3</p>
              <p><strong>Answers Given:</strong> {Object.keys(answers).length}</p>
            </div>
          </div>

          {/* Questions Preview */}
          <div className="card md:col-span-2">
            <h2 className="text-xl font-semibold text-primary-dark mb-4">Questions Preview</h2>
            {questions.length > 0 ? (
              <div className="space-y-4">
                {questions.slice(0, 3).map((question, index) => (
                  <div key={question.id} className="border border-gray-200 rounded-lg p-4">
                    <div className="flex justify-between items-start mb-2">
                      <span className="bg-primary-dark text-white px-2 py-1 rounded text-sm">
                        Q{index + 1}
                      </span>
                      <span className={`px-2 py-1 rounded text-sm ${
                        question.difficulty === 'easy' ? 'bg-green-100 text-green-800' :
                        question.difficulty === 'moderate' ? 'bg-yellow-100 text-yellow-800' :
                        'bg-red-100 text-red-800'
                      }`}>
                        {question.difficulty}
                      </span>
                    </div>
                    <p className="font-medium mb-2">{question.question}</p>
                    <div className="text-sm text-gray-600">
                      <p>Category: {question.category}</p>
                      <p>Correct Answer: {String.fromCharCode(65 + question.correctAnswer)}</p>
                      <p>User Answer: {answers[question.id] !== undefined ? String.fromCharCode(65 + answers[question.id]) : 'Not answered'}</p>
                    </div>
                  </div>
                ))}
                {questions.length > 3 && (
                  <p className="text-gray-600 text-center">... and {questions.length - 3} more questions</p>
                )}
              </div>
            ) : (
              <p className="text-gray-600">No questions loaded</p>
            )}
          </div>

          {/* Results */}
          {results && (
            <div className="card md:col-span-2">
              <h2 className="text-xl font-semibold text-primary-dark mb-4">Test Results</h2>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div className="text-center p-4 bg-blue-50 rounded-lg">
                  <p className="text-2xl font-bold text-blue-600">{results.score}%</p>
                  <p className="text-sm text-blue-800">Score</p>
                </div>
                <div className="text-center p-4 bg-green-50 rounded-lg">
                  <p className="text-2xl font-bold text-green-600">{results.correctAnswers}/{results.totalQuestions}</p>
                  <p className="text-sm text-green-800">Correct</p>
                </div>
                <div className="text-center p-4 bg-yellow-50 rounded-lg">
                  <p className="text-2xl font-bold text-yellow-600">{results.passed ? 'PASSED' : 'FAILED'}</p>
                  <p className="text-sm text-yellow-800">Status</p>
                </div>
                <div className="text-center p-4 bg-purple-50 rounded-lg">
                  <p className="text-2xl font-bold text-purple-600">{results.warnings}</p>
                  <p className="text-sm text-purple-800">Warnings</p>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default TestDebug; 
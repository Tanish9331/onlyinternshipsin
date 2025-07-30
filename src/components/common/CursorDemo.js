import React, { useState } from 'react';
import useLoadingCursor from '../../hooks/useLoadingCursor';
import YugaYatraLogo from './YugaYatraLogo';

const CursorDemo = () => {
  const [isLoading, setIsLoading] = useState(false);
  const { startLoading, stopLoading, withLoading } = useLoadingCursor();

  const handleLoadingDemo = async () => {
    setIsLoading(true);
    startLoading();
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 3000));
    
    setIsLoading(false);
    stopLoading();
  };

  const handleAsyncDemo = async () => {
    await withLoading(async () => {
      // Simulate async operation
      await new Promise(resolve => setTimeout(resolve, 2000));
      alert('Async operation completed!');
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 p-8">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-800 mb-4">
            Yuga Yatra Logo Cursor Demo
          </h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Experience the custom cursor system featuring the exact Yuga Yatra logo with original colors, 
            smooth animations, and interactive states.
          </p>
        </div>

        {/* Cursor Visibility Test */}
        <div className="bg-white rounded-lg shadow-lg p-8 mb-8">
          <h2 className="text-2xl font-bold text-gray-800 mb-4">🎯 Cursor Visibility Test</h2>
          <p className="text-gray-600 mb-4">
            Move your mouse around this area. You should see the Yuga Yatra logo following your cursor.
            If you can't see it, try refreshing the page or check the browser console for errors.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="bg-gray-100 p-4 rounded-lg text-center">
              <p className="text-sm text-gray-600">Light Background</p>
            </div>
            <div className="bg-gray-800 p-4 rounded-lg text-center">
              <p className="text-sm text-white">Dark Background</p>
            </div>
            <div className="bg-gradient-to-r from-blue-500 to-purple-600 p-4 rounded-lg text-center">
              <p className="text-sm text-white">Gradient Background</p>
            </div>
          </div>
        </div>

        {/* Interactive Elements */}
        <div className="bg-white rounded-lg shadow-lg p-8 mb-8">
          <h2 className="text-2xl font-bold text-gray-800 mb-6">✨ Interactive Elements</h2>
          <p className="text-gray-600 mb-6">
            Hover over these elements to see the cursor change to a white-gold glow effect.
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {/* Gold Gradient Buttons */}
            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-gray-700">Gold Gradient Buttons</h3>
              <button 
                className="w-full bg-gradient-to-r from-yellow-400 via-yellow-500 to-yellow-600 hover:from-yellow-500 hover:to-yellow-700 text-white font-semibold py-3 px-6 rounded-lg shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105"
                onClick={handleLoadingDemo}
                disabled={isLoading}
              >
                {isLoading ? 'Loading...' : 'Test Loading State'}
              </button>
              
              <button 
                className="w-full bg-gradient-to-r from-yellow-400 via-yellow-500 to-yellow-600 hover:from-yellow-500 hover:to-yellow-700 text-white font-semibold py-3 px-6 rounded-lg shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105"
                onClick={handleAsyncDemo}
              >
                Async Operation
              </button>
            </div>

            {/* Links */}
            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-gray-700">Interactive Links</h3>
              <button 
                className="block w-full bg-blue-500 hover:bg-blue-600 text-white font-semibold py-3 px-6 rounded-lg shadow-lg hover:shadow-xl transition-all duration-300 text-center"
                onClick={(e) => e.preventDefault()}
              >
                Clickable Link
              </button>
              
              <button 
                className="block w-full bg-green-500 hover:bg-green-600 text-white font-semibold py-3 px-6 rounded-lg shadow-lg hover:shadow-xl transition-all duration-300 text-center"
                onClick={(e) => e.preventDefault()}
              >
                Another Link
              </button>
            </div>

            {/* Form Elements */}
            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-gray-700">Form Elements</h3>
              <input 
                type="text" 
                placeholder="Type here..." 
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-500 focus:border-transparent transition-all duration-300"
              />
              
              <select className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-500 focus:border-transparent transition-all duration-300">
                <option>Select an option</option>
                <option>Option 1</option>
                <option>Option 2</option>
                <option>Option 3</option>
              </select>
            </div>
          </div>
        </div>

        {/* Logo Showcase */}
        <div className="bg-white rounded-lg shadow-lg p-8 mb-8">
          <h2 className="text-2xl font-bold text-gray-800 mb-6">🎨 Logo Showcase</h2>
          <p className="text-gray-600 mb-6">
            Different states and sizes of the Yuga Yatra logo cursor.
          </p>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            <div className="text-center">
              <div className="bg-gray-100 p-4 rounded-lg mb-2">
                <YugaYatraLogo size={48} preserveOriginal={true} />
              </div>
              <p className="text-sm text-gray-600">Default (32x32)</p>
            </div>
            
            <div className="text-center">
              <div className="bg-gray-100 p-4 rounded-lg mb-2">
                <YugaYatraLogo size={48} preserveOriginal={true} animated={true} />
              </div>
              <p className="text-sm text-gray-600">Animated</p>
            </div>
            
            <div className="text-center">
              <div className="bg-gray-100 p-4 rounded-lg mb-2">
                <YugaYatraLogo size={48} preserveOriginal={true} loading={true} />
              </div>
              <p className="text-sm text-gray-600">Loading State</p>
            </div>
            
            <div className="text-center">
              <div className="bg-gray-100 p-4 rounded-lg mb-2">
                <YugaYatraLogo size={48} color="#FFD700" preserveOriginal={false} />
              </div>
              <p className="text-sm text-gray-600">Custom Color</p>
            </div>
          </div>
        </div>

        {/* Technical Details */}
        <div className="bg-white rounded-lg shadow-lg p-8">
          <h2 className="text-2xl font-bold text-gray-800 mb-6">🔧 Technical Details</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h3 className="text-lg font-semibold text-gray-700 mb-3">Features</h3>
              <ul className="space-y-2 text-gray-600">
                <li>• Exact Yuga Yatra logo with original colors</li>
                <li>• 32x32 cursor size with proper scaling</li>
                <li>• White-gold glow on interactive elements</li>
                <li>• Gold gradient button styling</li>
                <li>• Loading state with gold spinner</li>
                <li>• Smooth transitions and animations</li>
                <li>• SVG-based for crisp scaling</li>
                <li>• Accessibility support</li>
              </ul>
            </div>
            
            <div>
              <h3 className="text-lg font-semibold text-gray-700 mb-3">States</h3>
              <ul className="space-y-2 text-gray-600">
                <li>• <strong>Default:</strong> Gold logo with subtle shadow</li>
                <li>• <strong>Hover:</strong> White-gold glow effect</li>
                <li>• <strong>Loading:</strong> Spinning gold animation</li>
                <li>• <strong>Clicking:</strong> Compressed with enhanced glow</li>
                <li>• <strong>Text:</strong> Gold vertical line for text inputs</li>
                <li>• <strong>Disabled:</strong> Grayscale with reduced opacity</li>
              </ul>
            </div>
          </div>
        </div>

        {/* Debug Info */}
        <div className="mt-8 p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
          <h3 className="text-lg font-semibold text-yellow-800 mb-2">🐛 Debug Information</h3>
          <p className="text-yellow-700 text-sm">
            If you can't see the cursor: Check browser console for errors, ensure JavaScript is enabled, 
            and verify you're not on a touch device. The cursor is hidden on mobile/touch devices.
          </p>
        </div>
      </div>
    </div>
  );
};

export default CursorDemo; 
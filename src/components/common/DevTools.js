import React, { useState, useEffect } from 'react';
import { FaCog, FaCode, FaMouse, FaKeyboard, FaTimes } from 'react-icons/fa';

const DevTools = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [features] = useState({
    rightClick: false,
    keyboardShortcuts: false,
    console: false,
    tabSwitching: false
  });

  // Debug logging
  useEffect(() => {
    console.log('🔧 DevTools: Component mounted');
    console.log('🔧 DevTools: All features always allowed - no restrictions');
    
    // Test if component is rendering
    setTimeout(() => {
      console.log('🔧 DevTools: Component should be visible now');
      console.log('🔧 DevTools: Look for blue gear icon in bottom-right corner');
    }, 1000);

    // Make DevTools accessible globally for testing
    window.testDevTools = () => {
      console.log('🧪 Testing DevTools...');
      console.log('Current state:', { isVisible, features });
      setIsVisible(true);
      console.log('DevTools panel should now be visible');
      console.log('✅ All features are always allowed');
    };

    // Add to window for easy access
    window.devToolsComponent = {
      toggle: () => setIsVisible(!isVisible),
      enableAntiCheating: () => {
        console.log('✅ Anti-cheating DISABLED - all features always allowed');
      },
      disableAntiCheating: () => {
        console.log('✅ Anti-cheating DISABLED - all features always allowed');
      },
      getState: () => ({ isVisible, features }),
      testRightClick: () => {
        console.log('🧪 Testing right-click functionality...');
        console.log('✅ Right-click should work everywhere now');
        console.log('✅ Try right-clicking on any element');
        console.log('✅ Context menu should appear normally');
      }
    };

    console.log('🔧 DevTools: Available globally as window.devToolsComponent');
    console.log('🔧 DevTools: Test with window.testDevTools()');
    console.log('🔧 DevTools: All features always allowed - no restrictions');
  }, []);

  // Cleanup on unmount - DISABLED
  useEffect(() => {
    return () => {
      console.log('DevTools cleanup - no event listeners to remove');
    };
  }, []);

  return (
    <>
      {/* Toggle Button */}
      <button
        onClick={() => {
          console.log('🔧 DevTools: Toggle button clicked, current state:', isVisible);
          setIsVisible(!isVisible);
        }}
        className="fixed bottom-4 right-4 z-50 bg-blue-500 hover:bg-blue-600 text-white p-3 rounded-full shadow-lg transition-all duration-200 border-2 border-white"
        title="Development Tools"
        style={{ boxShadow: '0 4px 12px rgba(59, 130, 246, 0.4)' }}
      >
        <FaCog className="w-5 h-5" />
      </button>

      {/* Verification Badge */}
      <div className="fixed bottom-4 right-16 z-50 bg-green-500 text-white px-2 py-1 rounded text-xs font-medium">
        DevTools ✓
      </div>

      {/* Dev Tools Panel */}
      {isVisible && (
        <div className="fixed bottom-20 right-4 z-50 bg-white border border-gray-200 rounded-lg shadow-xl p-4 w-80">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-lg font-semibold text-gray-800 flex items-center">
              <FaCode className="mr-2" />
              Dev Tools
            </h3>
            <button
              onClick={() => setIsVisible(false)}
              className="text-gray-400 hover:text-gray-600"
            >
              <FaTimes className="w-4 h-4" />
            </button>
          </div>
          
          <div className="space-y-4">
            {/* Status Message */}
            <div className="flex items-center justify-between p-3 bg-green-50 rounded-lg">
              <span className="text-sm font-medium text-green-700">All Features Enabled:</span>
              <span className="px-3 py-1 bg-green-100 text-green-700 rounded text-xs font-medium">
                ✅ No Restrictions
              </span>
            </div>

            {/* Feature Status */}
            <div className="space-y-2">
              <h4 className="text-sm font-medium text-gray-700">Feature Status:</h4>
              <div className="space-y-2 text-xs">
                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <FaMouse className="mr-2 text-gray-500" />
                    <span className="text-gray-600">Right-click</span>
                  </div>
                  <span className="px-2 py-1 rounded text-xs bg-green-100 text-green-700">
                    Always Allowed
                  </span>
                </div>
                
                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <FaKeyboard className="mr-2 text-gray-500" />
                    <span className="text-gray-600">Keyboard shortcuts</span>
                  </div>
                  <span className="px-2 py-1 rounded text-xs bg-green-100 text-green-700">
                    Always Allowed
                  </span>
                </div>
                
                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <FaCode className="mr-2 text-gray-500" />
                    <span className="text-gray-600">Console access</span>
                  </div>
                  <span className="px-2 py-1 rounded text-xs bg-green-100 text-green-700">
                    Always Allowed
                  </span>
                </div>
                
                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <FaCog className="mr-2 text-gray-500" />
                    <span className="text-gray-600">Tab switching</span>
                  </div>
                  <span className="px-2 py-1 rounded text-xs bg-green-100 text-green-700">
                    Always Allowed
                  </span>
                </div>
              </div>
            </div>

            {/* Instructions */}
            <div className="pt-3 border-t border-gray-200">
              <p className="text-xs text-gray-500 mb-2">
                <strong>All Features Enabled:</strong>
              </p>
              <ul className="text-xs text-gray-500 space-y-1">
                <li>• Right-click works everywhere</li>
                <li>• All keyboard shortcuts work</li>
                <li>• Console access is unrestricted</li>
                <li>• Tab switching is allowed</li>
                <li>• No restrictions anywhere</li>
              </ul>
            </div>

            {/* Quick Actions */}
            <div className="pt-3 border-t border-gray-200">
              <div className="p-2 bg-green-50 rounded text-xs text-green-600">
                <p className="mb-1"><strong>✅ All Features Working:</strong></p>
                <p>Right-click, console, keyboard shortcuts, and tab switching all work normally</p>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default DevTools; 
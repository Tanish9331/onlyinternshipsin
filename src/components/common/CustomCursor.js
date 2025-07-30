import React, { useEffect, useRef, useState } from 'react';
import YugaYatraLogo from './YugaYatraLogo';
import '../../styles/cursor.css';

const CustomCursor = () => {
  const cursorRef = useRef(null);
  const [isVisible, setIsVisible] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isClicking, setIsClicking] = useState(false);

  // Debug: Log when component mounts
  console.log('🎯 CustomCursor component mounted');

  useEffect(() => {
    const cursor = cursorRef.current;
    if (!cursor) return;

    let mouseX = 0;
    let mouseY = 0;
    let cursorX = 0;
    let cursorY = 0;

    // Mouse move handler
    const handleMouseMove = (e) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
      setIsVisible(true);
      // Debug: Log cursor position (only every 10th movement to avoid spam)
      if (Math.random() < 0.1) {
        console.log('Cursor position:', mouseX, mouseY, 'Visible:', true);
      }
    };

    // Mouse leave handler
    const handleMouseLeave = () => {
      setIsVisible(false);
      console.log('Mouse left viewport - cursor hidden');
    };

    // Mouse enter handler
    const handleMouseEnter = () => {
      setIsVisible(true);
      console.log('Mouse entered viewport - cursor visible');
    };

    // Mouse down handler
    const handleMouseDown = () => {
      setIsClicking(true);
    };

    // Mouse up handler
    const handleMouseUp = () => {
      setIsClicking(false);
    };

    // Hover detection
    const handleMouseOver = (e) => {
      const target = e.target;
      const isInteractive = 
        target.tagName === 'BUTTON' ||
        target.tagName === 'A' ||
        target.tagName === 'INPUT' ||
        target.tagName === 'TEXTAREA' ||
        target.tagName === 'SELECT' ||
        target.closest('[role="button"]') ||
        target.closest('[tabindex]') ||
        target.closest('.clickable') ||
        target.closest('button') ||
        target.closest('a') ||
        target.closest('[data-interactive]') ||
        target.closest('.interactive');

      if (isInteractive) {
        cursor.classList.add('hover');
        console.log('Hover state activated on:', target.tagName, target.className);
      } else {
        cursor.classList.remove('hover');
      }

      // Text cursor for text inputs
      if ((target.tagName === 'INPUT' && target.type === 'text') ||
          target.tagName === 'TEXTAREA') {
        cursor.classList.add('text');
      } else {
        cursor.classList.remove('text');
      }
    };

    // Smooth cursor animation
    const animateCursor = () => {
      const ease = 0.15;
      cursorX += (mouseX - cursorX) * ease;
      cursorY += (mouseY - cursorY) * ease;

      cursor.style.transform = `translate(${cursorX - 16}px, ${cursorY - 16}px)`;
      requestAnimationFrame(animateCursor);
    };

    // Event listeners
    document.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseleave', handleMouseLeave);
    document.addEventListener('mouseenter', handleMouseEnter);
    document.addEventListener('mousedown', handleMouseDown);
    document.addEventListener('mouseup', handleMouseUp);
    document.addEventListener('mouseover', handleMouseOver);

    // Start animation
    animateCursor();

    // Cleanup
    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseleave', handleMouseLeave);
      document.removeEventListener('mouseenter', handleMouseEnter);
      document.removeEventListener('mousedown', handleMouseDown);
      document.removeEventListener('mouseup', handleMouseUp);
      document.removeEventListener('mouseover', handleMouseOver);
    };
  }, []);

  // Global loading state management
  useEffect(() => {
    const handleLoadingStart = () => setIsLoading(true);
    const handleLoadingEnd = () => setIsLoading(false);

    // Listen for custom loading events
    window.addEventListener('loading-start', handleLoadingStart);
    window.addEventListener('loading-end', handleLoadingEnd);

    // Listen for fetch requests
    const originalFetch = window.fetch;
    window.fetch = async (...args) => {
      setIsLoading(true);
      try {
        const response = await originalFetch(...args);
        return response;
      } finally {
        setIsLoading(false);
      }
    };

    return () => {
      window.removeEventListener('loading-start', handleLoadingStart);
      window.removeEventListener('loading-end', handleLoadingEnd);
      window.fetch = originalFetch;
    };
  }, []);

  // Check if device supports hover
  const isTouchDevice = () => {
    return 'ontouchstart' in window || navigator.maxTouchPoints > 0;
  };

  // Don't render on touch devices
  if (isTouchDevice()) {
    console.log('Touch device detected - cursor disabled');
    return null;
  }

  // Force cursor to be visible for testing
  console.log('🎯 CustomCursor rendering - should be visible!');

  return (
    <div
      ref={cursorRef}
      className={`custom-cursor ${
        !isVisible ? 'opacity-0' : 'opacity-100'
      } ${
        isLoading ? 'loading' : ''
      } ${
        isClicking ? 'clicking' : ''
      }`}
      style={{
        transition: 'opacity 0.3s ease',
        // FORCE cursor to be visible for testing
        opacity: 1,
        display: 'block',
        visibility: 'visible',
        position: 'fixed',
        zIndex: 999999,
        pointerEvents: 'none'
      }}
    >
      <YugaYatraLogo 
        size={32}
        color="#D4AF37"
        animated={true}
        loading={isLoading}
        preserveOriginal={true}
      />
    </div>
  );
};

export default CustomCursor; 
"use client"
import React, { useState, useEffect, useRef } from 'react';
import Cookies from 'js-cookie';
import { jwtDecode } from 'jwt-decode';

// If the above import fails, try:
// import { default as jwt_decode } from 'jwt-decode';

function SessionTimer() {
    const [timeLeft, setTimeLeft] = useState(null);
    const timerRef = useRef();
  
    function formatTime(ms) {
      if (ms == null) return '';
      const totalSeconds = Math.floor(ms / 1000);
      const minutes = Math.floor(totalSeconds / 60);
      const seconds = totalSeconds % 60;
      return `${minutes}:${seconds.toString().padStart(2, '0')}`;
    }

    useEffect(() => {
      function getTokenExpiration() {
        const token = Cookies.get('token') || (typeof window !== 'undefined' && localStorage.getItem('token'));
        if (!token) return null;
        try {
          const decoded = jwtDecode(token);
          if (decoded && decoded.exp) {
            return decoded.exp * 1000;
          }
        } catch (e) {
          return null;
        }
        return null;
      }
  
      function updateTimer() {
        const exp = getTokenExpiration();
        if (!exp) {
          setTimeLeft(null);
          return;
        }
        const now = Date.now();
        const diff = exp - now;
        setTimeLeft(diff > 0 ? diff : 0);
      }
  
      updateTimer();
      timerRef.current = setInterval(() => {
        updateTimer();
      }, 1000);

      // Listen for manual logout
      const handleManualLogout = () => {
        clearInterval(timerRef.current);
        setTimeLeft(null);
      };
      window.addEventListener('manualLogout', handleManualLogout);

      return () => {
        clearInterval(timerRef.current);
        window.removeEventListener('manualLogout', handleManualLogout);
      };
    }, []);

    useEffect(() => {
      if (timeLeft != null && timeLeft > 0) {
        console.log('Session expires in:', formatTime(timeLeft));
      }
    }, [timeLeft]);
  
    useEffect(() => {
      if (timeLeft === 0) {
        Cookies.remove('token');
        localStorage.removeItem('token');
        localStorage.removeItem('user');
        alert('Session expired. Please log in again.');
        window.location.href = '/login';
      }
    }, [timeLeft]);
  
    if (timeLeft == null) return null;
    return (
      <div className="fixed bottom-6 right-6 z-50 bg-blue-900 text-blue-200 text-center py-2 px-4 rounded-lg shadow-lg text-sm opacity-90">
        Session expires in: <span className="font-mono font-semibold">{formatTime(timeLeft)}</span>
      </div>
    );
  }

export default SessionTimer;
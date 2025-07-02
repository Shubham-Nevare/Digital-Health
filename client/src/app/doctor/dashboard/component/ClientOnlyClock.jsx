'use client';

import { useState, useEffect } from 'react';
import { FiClock } from 'react-icons/fi';

export default function ClientOnlyClock() {
  const [isLoading, setIsLoading] = useState(true);
  const [time, setTime] = useState({
    timeString: '',
    dateString: ''
  });

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      setTime({
        timeString: now.toLocaleTimeString(),
        dateString: now.toLocaleDateString('en-US', {
          weekday: 'long',
          month: 'long',
          day: 'numeric'
        })
      });
      setIsLoading(false);
    };

    updateTime();
    const timer = setInterval(updateTime, 1000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="text-blue-200 flex items-center">
      <FiClock className="mr-2" />
      {isLoading ? 'Loading...' : `${time.timeString} • ${time.dateString}`}
    </div>
  );
}
import React, { useEffect, useRef, useState } from 'react';

const ControllButton = () => {
  const [counter, setCounter] = useState(0);
  const progressRef = useRef(null);

  useEffect(() => {
    let start = null;
    const duration = 5000;
    const endValue = 100;
    
    const step = (timestamp) => {
      if (!start) start = timestamp;
      const progress = Math.min((timestamp - start) / duration, 1);
      setCounter(Math.ceil(progress * endValue));
      
      if (progress < 1) {
        window.requestAnimationFrame(step);
      }
    };

    window.requestAnimationFrame(step);
  }, []);

  useEffect(() => {
    let start = null;
    const duration = 5000;
    const endValue = 251.2;
    
    const animateStroke = (timestamp) => {
      if (!start) start = timestamp;
      const progress = Math.min((timestamp - start) / duration, 1);
      const value = progress * endValue;
      progressRef.current.style.strokeDasharray = `${value}, 251.2`;

      if (progress < 1) {
        window.requestAnimationFrame(animateStroke);
      }
    };

    window.requestAnimationFrame(animateStroke);
  }, []);

  return (
    <div>
      <div id="count">{counter}%</div>
      <svg id="animated" width="100" height="100">
        <circle
          ref={progressRef}
          id="progress"
          cx="50"
          cy="50"
          r="40"
          stroke="blue"
          strokeWidth="5"
          fill="none"
        />
      </svg>
    </div>
  );
};

export default ControllButton;

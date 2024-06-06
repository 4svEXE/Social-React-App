import React, { useEffect, useRef } from 'react';
import PropTypes from 'prop-types';
import './button.css';

const ControllButton = ({ onClick, percentage, children }) => {
  const progressRef = useRef(null);

  useEffect(() => {
    const duration = 5000;
    const endValue = 251.2;

    const animateStroke = (timestamp, start = null) => {
      if (!start) start = timestamp;
      const progress = Math.min((timestamp - start) / duration, 1);
      const value = percentage;
      if (progressRef.current) {
        progressRef.current.style.strokeDasharray = `${value / 100 * 115}, 251.2`;
      }

      if (progress < 1) {
        window.requestAnimationFrame((newTimestamp) => animateStroke(newTimestamp, start));
      }
    };

    window.requestAnimationFrame(animateStroke);
  }, [percentage]);

  return (
    <div className="controll-button" onClick={onClick}>
      <svg id="animated" width="40" height="40">
        <circle
          ref={progressRef}
          id="progress"
          cx="20"
          cy="20"
          r="18"
          stroke="blue"
          strokeWidth="2"
          fill="none"
        />
      </svg>
      {/* <div className="percentage">
        {percentage}%
      </div> */}
      <div className="control">
        {children}
      </div>
    </div>
  );
};

ControllButton.propTypes = {
  onClick: PropTypes.func.isRequired,
  percentage: PropTypes.number.isRequired,
  children: PropTypes.node.isRequired,
};

export default ControllButton;
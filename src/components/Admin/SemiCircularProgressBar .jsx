import React from 'react';

const SemiCircularProgressBar = ({ percentage }) => {
  const radius = 50;
  const strokeWidth = 10;
  const normalizedRadius = radius - strokeWidth / 2;
  const circumference = normalizedRadius * 2 * Math.PI;
  const strokeDashoffset = circumference - (percentage / 100) * circumference;

  return (
    <div className="col-md-4">
      <label className="font-weight-bold">Project Progress:</label>
      <br />
      <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', position: 'relative', width: '100%', height: '100px', marginTop: '10px' }}>
        <svg height="100" width="100" style={{ transform: 'rotate(-90deg)' }}>
          <circle
            stroke="#e0e0e0"
            fill="transparent"
            strokeWidth={strokeWidth}
            r={normalizedRadius}
            cx="50"
            cy="50"
          />
          <circle
            stroke="#44e220"
            fill="transparent"
            strokeWidth={strokeWidth}
            strokeDasharray={circumference + ' ' + circumference}
            style={{ strokeDashoffset, transition: 'stroke-dashoffset 1s ease-in-out' }}
            r={normalizedRadius}
            cx="50"
            cy="50"
          />
        </svg>
        <div style={{ position: 'absolute', top: '70%', left: '50%', transform: 'translate(-50%, -50%)' }}>
          <span>{percentage} %</span>
        </div>
      </div>
    </div>
  );
};

export default SemiCircularProgressBar;

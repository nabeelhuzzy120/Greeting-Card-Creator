import React from 'react';

interface GradCapProps {
  color: string;
}

const GradCap: React.FC<GradCapProps> = ({ color }) => {
  return (
    <div className="relative w-24 h-24">
      <style>
        {`
          @keyframes tassel-swing {
            0%, 100% { transform: rotate(5deg); }
            50% { transform: rotate(-5deg); }
          }
          .tassel {
            transform-origin: top center;
            animation: tassel-swing 2.5s ease-in-out infinite;
          }
        `}
      </style>
      <svg
        className="w-full h-full"
        viewBox="0 0 100 100"
        xmlns="http://www.w3.org/2000/svg"
        fill="#4A4A4A"
      >
        {/* Cap Top */}
        <polygon points="50,10 95,30 50,50 5,30" />
        {/* Cap Base */}
        <path d="M15,50 Q50,70 85,50 L85,60 Q50,80 15,60 Z" />
        {/* Tassel Button */}
        <circle cx="50" cy="30" r="4" fill={color} />
        {/* Tassel */}
        <g className="tassel">
          <line x1="50" y1="30" x2="50" y2="55" stroke={color} strokeWidth="2" />
          <circle cx="50" cy="65" r="10" fill={color} />
        </g>
      </svg>
    </div>
  );
};

export default GradCap;

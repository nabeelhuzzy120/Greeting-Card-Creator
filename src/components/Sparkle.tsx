import React from 'react';

interface SparkleProps {
    color: string;
}

const Sparkle: React.FC<SparkleProps> = ({ color }) => {
    return (
        <div className="relative w-20 h-20">
            <style>
                {`
                @keyframes sparkle-anim {
                    0%, 100% { transform: scale(0.8); opacity: 0.7; }
                    50% { transform: scale(1); opacity: 1; }
                }
                .sparkle-star {
                    position: absolute;
                    animation: sparkle-anim 2s ease-in-out infinite;
                }
                `}
            </style>
            <svg
                className="sparkle-star w-full h-full"
                viewBox="0 0 24 24"
                fill="none"
                stroke={color}
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
                style={{ animationDelay: '0s' }}
            >
                <path d="M12 2L14.5 9.5L22 12L14.5 14.5L12 22L9.5 14.5L2 12L9.5 9.5L12 2Z" />
            </svg>
            <svg
                className="sparkle-star w-1/2 h-1/2 top-0 left-0"
                viewBox="0 0 24 24"
                fill="none"
                stroke={color}
                strokeWidth="1"
                strokeLinecap="round"
                strokeLinejoin="round"
                style={{ animationDelay: '0.5s' }}
            >
                <path d="M12 2L14.5 9.5L22 12L14.5 14.5L12 22L9.5 14.5L2 12L9.5 9.5L12 2Z" />
            </svg>
            <svg
                className="sparkle-star w-1/2 h-1/2 bottom-0 right-0"
                viewBox="0 0 24 24"
                fill="none"
                stroke={color}
                strokeWidth="1"
                strokeLinecap="round"
                strokeLinejoin="round"
                style={{ animationDelay: '1s' }}
            >
                <path d="M12 2L14.5 9.5L22 12L14.5 14.5L12 22L9.5 14.5L2 12L9.5 9.5L12 2Z" />
            </svg>
        </div>
    );
};

export default Sparkle;

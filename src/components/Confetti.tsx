import React from 'react';

const Confetti: React.FC = () => {
    const particles = Array.from({ length: 50 });
    const colors = ['#a864fd', '#29cdff', '#78ff44', '#ff718d', '#fdff6a'];

    return (
        <div className="relative w-full h-full">
            <style>
                {`
                @keyframes confetti-fall {
                    0% { transform: translateY(-100px) rotateZ(0deg); opacity: 1; }
                    100% { transform: translateY(100px) rotateZ(720deg); opacity: 0; }
                }
                .confetti-particle {
                    position: absolute;
                    width: 8px;
                    height: 16px;
                    opacity: 0;
                    animation: confetti-fall 2.5s ease-out infinite;
                }
                `}
            </style>
            {particles.map((_, i) => {
                const top = `${Math.random() * 100}%`;
                const left = `${Math.random() * 100}%`;
                const animationDelay = `${Math.random() * 2}s`;
                const backgroundColor = colors[i % colors.length];

                return (
                    <div
                        key={i}
                        className="confetti-particle"
                        style={{ top, left, animationDelay, backgroundColor }}
                    />
                );
            })}
        </div>
    );
};

export default Confetti;

import React from 'react';

const Fireworks: React.FC = () => {
    const particles = Array.from({ length: 15 });
    const colors = ['#FFC700', '#FF0000', '#2E3192', '#41BBC4', '#ff718d'];

    const createFirework = (x: number, y: number, delay: number) => {
        return (
            <g transform={`translate(${x}, ${y})`} key={`${x}-${y}-${delay}`}>
                {particles.map((_, i) => {
                    const angle = (i / particles.length) * 360;
                    const distance = Math.random() * 20 + 15;
                    const endX = Math.cos(angle * (Math.PI / 180)) * distance;
                    const endY = Math.sin(angle * (Math.PI / 180)) * distance;
                    const color = colors[i % colors.length];

                    return (
                        <g key={i}>
                            <circle cx="0" cy="0" r="2" fill={color} opacity="0">
                                <animateMotion
                                    path={`M 0 0 L ${endX} ${endY}`}
                                    dur="1.5s"
                                    begin={`${delay}s`}
                                    repeatCount="indefinite"
                                    fill="freeze"
                                />
                                <animate
                                    attributeName="opacity"
                                    from="1"
                                    to="0"
                                    dur="1.5s"
                                    begin={`${delay}s`}
                                    repeatCount="indefinite"
                                />
                                 <animate
                                    attributeName="r"
                                    from="2"
                                    to="0"
                                    dur="1.5s"
                                    begin={`${delay}s`}
                                    repeatCount="indefinite"
                                />
                            </circle>
                        </g>
                    );
                })}
            </g>
        )
    };
    
    return (
        <div className="relative w-full h-full flex justify-center items-center">
             <svg viewBox="0 0 100 100" className="w-full h-full absolute top-0 left-0">
                {createFirework(50, 50, 0)}
                {createFirework(25, 30, 0.5)}
                {createFirework(75, 60, 1)}
            </svg>
        </div>
    );
};

export default Fireworks;

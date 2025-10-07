import React from 'react';
import PulsatingHeart from './PulsatingHeart';
import Background from './Background';
import Fireworks from './Fireworks';
import Confetti from './Confetti';
import GradCap from './GradCap';
import Sparkle from './Sparkle';

interface CardProps {
  message: string;
  signature: string;
  name: string;
  recipient: string;
  font: string;
  design: string;
  backgroundImages: string[];
  cardType: string;
  customTitle: string;
  borderColor: string;
  headingColor: string;
  messageColor: string;
  signatureColor: string;
  nameColor: string;
}

const Card: React.FC<CardProps> = ({ 
    message, signature, name, recipient, font, design, backgroundImages, 
    cardType, customTitle, borderColor, headingColor, messageColor, signatureColor, nameColor 
}) => {
  const hasBackground = backgroundImages.length > 0;
  
  const getCardTitle = () => {
    switch (cardType) {
      case 'congrats':
        return `Congratulations, ${recipient}!`;
      case 'grad':
        return `Congrats Grad, ${recipient}!`;
      case 'thank-you':
        return `Thank You, ${recipient}!`;
      case 'custom':
        return `${customTitle || 'A Special Note For'}, ${recipient}!`;
      case 'birthday':
      default:
        return `Happy Birthday, ${recipient}!`;
    }
  };

  const renderCenterpiece = () => {
    switch(cardType) {
      case 'birthday':
        return <PulsatingHeart />;
      case 'congrats':
        return <Fireworks />;
      case 'grad':
        return <GradCap color={borderColor} />;
      case 'thank-you':
        return <Confetti />;
      case 'custom':
      default:
        return <Sparkle color={borderColor} />;
    }
  }

  return (
    <div 
      className={`bg-white/70 backdrop-blur-lg rounded-2xl shadow-2xl p-8 sm:p-12 transform transition-all duration-500 hover:scale-105 hover:shadow-rose-300/50 overflow-hidden relative`}
      style={{ fontFamily: font }}
    >
      <Background images={backgroundImages} />

      <div className={`relative ${design !== 'none' ? 'border-2 border-dashed' : ''} rounded-xl p-6 sm:p-8 ${hasBackground ? 'bg-white/80 backdrop-blur-sm rounded-xl' : ''}`} style={{ borderColor: design !== 'none' ? borderColor : 'transparent' }}>
        
        {design === 'dashed-border' && (
            <>
                <CornerDecorationStar position="top-left" color={borderColor} />
                <CornerDecorationStar position="top-right" color={borderColor} />
            </>
        )}
        {design === 'floral-corners' && (
            <>
                <CornerDecorationFloral position="top-left" color={borderColor} />
                <CornerDecorationFloral position="top-right" transform="scaleX(-1)" color={borderColor} />
            </>
        )}


        <h1 className="font-fancy text-5xl sm:text-6xl drop-shadow-sm mb-4" style={{ color: headingColor }}>
          {getCardTitle()}
        </h1>
        
        <div className="my-8 flex justify-center h-24 items-center">
          {renderCenterpiece()}
        </div>
        
        <p className="text-base sm:text-lg leading-relaxed mb-8 whitespace-pre-wrap" style={{ color: messageColor }}>
          {message}
        </p>

        <div className="mt-6 text-right">
          <p className="font-fancy text-3xl" style={{ color: signatureColor }}>{signature}</p>
          <p className="font-semibold mt-1" style={{ color: nameColor }}>{name}</p>
        </div>

        {design === 'dashed-border' && (
            <>
                <CornerDecorationStar position="bottom-left" color={borderColor} />
                <CornerDecorationStar position="bottom-right" color={borderColor} />
            </>
        )}
        {design === 'floral-corners' && (
            <>
                <CornerDecorationFloral position="bottom-left" transform="scaleY(-1)" color={borderColor}/>
                <CornerDecorationFloral position="bottom-right" transform="scale(-1,-1)" color={borderColor} />
            </>
        )}
      </div>
    </div>
  );
};

interface CornerDecorationProps {
    position: 'top-left' | 'top-right' | 'bottom-left' | 'bottom-right';
    transform?: string;
    color: string;
}

const CornerDecorationStar: React.FC<CornerDecorationProps> = ({ position, color }) => {
    const positionClasses: {[key: string]: string} = {
        'top-left': 'top-0 left-0 -translate-x-1/2 -translate-y-1/2',
        'top-right': 'top-0 right-0 translate-x-1/2 -translate-y-1/2',
        'bottom-left': 'bottom-0 left-0 -translate-x-1/2 translate-y-1/2',
        'bottom-right': 'bottom-0 right-0 translate-x-1/2 translate-y-1/2',
    }
    return (
        <div className={`absolute ${positionClasses[position]} w-8 h-8`} style={{ color }}>
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" d="M11.48 3.499a.562.562 0 011.04 0l2.125 5.111a.563.563 0 00.475.321h5.365a.562.562 0 01.321.988l-4.204 3.602a.563.563 0 00-.182.557l1.285 5.385a.562.562 0 01-.84.61l-4.725-2.885a.563.563 0 00-.586 0L6.982 20.54a.562.562 0 01-.84-.61l1.285-5.386a.562.562 0 00-.182-.557l-4.204-3.602a.563.563 0 01.321-.988h5.365a.563.563 0 00.475-.321L11.48 3.5z" />
            </svg>
        </div>
    )
}

const CornerDecorationFloral: React.FC<CornerDecorationProps> = ({ position, transform, color }) => {
    const positionClasses: {[key: string]: string} = {
        'top-left': 'top-0 left-0',
        'top-right': 'top-0 right-0',
        'bottom-left': 'bottom-0 left-0',
        'bottom-right': 'bottom-0 right-0',
    }
    return (
        <div className={`absolute ${positionClasses[position]} w-16 h-16`} style={{transform, color}}>
             <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100" fill="currentColor">
                <path d="M50,0 C60,0 70,10 70,20 C70,30 60,40 50,40 C40,40 30,30 30,20 C30,10 40,0 50,0 Z" transform="rotate(45 50 20)"/>
                <path d="M50,0 C60,0 70,10 70,20 C70,30 60,40 50,40 C40,40 30,30 30,20 C30,10 40,0 50,0 Z" transform="rotate(135 50 20)"/>
                <path d="M50,0 C60,0 70,10 70,20 C70,30 60,40 50,40 C40,40 30,30 30,20 C30,10 40,0 50,0 Z" transform="rotate(225 50 20)"/>
                <path d="M50,0 C60,0 70,10 70,20 C70,30 60,40 50,40 C40,40 30,30 30,20 C30,10 40,0 50,0 Z" transform="rotate(315 50 20)"/>
            </svg>
        </div>
    )
}


export default Card;

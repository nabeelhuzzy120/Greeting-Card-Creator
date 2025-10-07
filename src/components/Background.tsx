import React from 'react';

interface BackgroundProps {
  images: string[];
}

const Background: React.FC<BackgroundProps> = ({ images }) => {
  if (images.length === 0) {
    return null;
  }

  // Single image background
  if (images.length === 1) {
    return (
      <div
        className="absolute inset-0 bg-cover bg-center -m-8 sm:-m-12"
        style={{ backgroundImage: `url(${images[0]})` }}
      >
        <div className="absolute inset-0 bg-white/20"></div>
      </div>
    );
  }

  // Collage for multiple images
  const gridClasses: {[key: number]: string} = {
    2: 'grid-cols-2 grid-rows-1',
    3: 'grid-cols-2 grid-rows-2',
    4: 'grid-cols-2 grid-rows-2',
    5: 'grid-cols-3 grid-rows-2',
  };

  const spanClasses: {[key: number]: string[]} = {
      3: ['row-span-2', 'col-start-2', 'col-start-2 row-start-2'],
      5: ['col-span-1 row-span-2', 'col-span-1', 'col-span-1', 'col-start-2 row-start-2', 'col-start-3 row-start-2']
  }

  return (
    <div className={`absolute inset-0 grid ${gridClasses[images.length] || 'grid-cols-2 grid-rows-2'} gap-1 -m-8 sm:-m-12`}>
      {images.map((image, index) => (
        <div
          key={index}
          className={`bg-cover bg-center ${spanClasses[images.length]?.[index] || ''}`}
          style={{ backgroundImage: `url(${image})` }}
        />
      ))}
       <div className="absolute inset-0 bg-white/20"></div>
    </div>
  );
};

export default Background;

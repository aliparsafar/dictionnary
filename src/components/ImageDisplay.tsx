import React from 'react';

interface ImageDisplayProps {
  imageUrl: string;
}

const ImageDisplay: React.FC<ImageDisplayProps> = ({ imageUrl }) => {
  return (
    <div className="mt-6">
      <img src={imageUrl} alt="Word visualization" className="w-full rounded-lg shadow-md" />
    </div>
  );
};

export default ImageDisplay;


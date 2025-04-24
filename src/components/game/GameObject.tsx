'use client';

import React from 'react';

interface GameObjectProps {
  position: { x: number; y: number };
  spriteUrl: string;
  size: { width: string; height: string };
  zIndex?: number;
  style?: React.CSSProperties;
  alt?: string; // Optional alt text for accessibility
}

const GameObject: React.FC<GameObjectProps> = ({ 
  position, 
  spriteUrl, 
  size, 
  zIndex = 10, // Default zIndex if not provided
  style, 
  alt = 'game object' // Default alt text
}) => {
  const objectStyle: React.CSSProperties = {
    position: 'absolute',
    width: size.width,
    height: size.height,
    backgroundImage: `url(${spriteUrl})`,
    backgroundSize: 'contain',
    backgroundRepeat: 'no-repeat',
    left: `${position.x}%`,
    top: `${position.y}%`,
    zIndex: zIndex,
    ...style, // Allow overriding base styles
  };

  return (
    <div style={objectStyle} aria-label={alt} role="img" />
  );
};

export default GameObject;
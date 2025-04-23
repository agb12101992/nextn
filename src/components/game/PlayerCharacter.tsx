'use client';

import React from 'react';

// Define playerStyle directly in this file
const playerStyle: React.CSSProperties = {
  position: 'absolute', 
  width: '5rem', 
  height: '5rem', 
  backgroundColor: 'blue', // Placeholder color
  // backgroundImage: 'url(/Sprites/Player/playerfront.png)', // Use when sprite is ready
  backgroundSize: 'contain', 
  backgroundRepeat: 'no-repeat', 
  transform: 'translate(-50%, -50%)', // Center on position
  zIndex: 50, 
  pointerEvents: 'none' // Prevent player from intercepting clicks
};

interface PlayerCharacterProps {
  position: { x: number; y: number };
  isMoving: boolean;
}

const PlayerCharacter: React.FC<PlayerCharacterProps> = ({ position, isMoving }) => {
  return (
    <div
      style={{
        ...playerStyle,
        left: `${position.x}%`,
        top: `${position.y}%`,
        transition: isMoving ? 'left 0.5s linear, top 0.5s linear' : 'none',
      }}
    />
  );
};

export default PlayerCharacter;

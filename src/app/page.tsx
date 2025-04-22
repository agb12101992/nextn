
'use client';

import React, { useState, useCallback } from 'react';

export default function Home() {
  const [playerPosition, setPlayerPosition] = useState({ x: 50, y: 50 }); // Player position in percentage
  const [isMoving, setIsMoving] = useState(false);

  const roomStyle = {
    width: '100vw',
    height: '100vh',
    backgroundColor: 'hsl(var(--background))',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    overflow: 'hidden',
  };

  const objectBaseStyle = {
    position: 'absolute',
    cursor: 'pointer',
    transition: 'background-color 0.3s, transform 0.5s',
    borderRadius: '0.5rem',
    boxShadow: '0 4px 6px rgba(0,0,0,0.1)',
    padding: '1rem',
    backgroundColor: 'white',
  };

  const playerStyle = {
    position: 'absolute',
    left: `${playerPosition.x}%`,
    top: `${playerPosition.y}%`,
    transform: 'translate(-50%, -50%)',
    width: '3rem',
    height: '3rem',
    borderRadius: '50%',
    backgroundColor: 'teal',
    transition: 'left 0.5s, top 0.5s',
    zIndex: 10,
  };

  const movePlayer = useCallback((targetX: number, targetY: number) => {
    setIsMoving(true);
    // Directly update the state for MVP simplicity
    setPlayerPosition({ x: targetX, y: targetY });
    setTimeout(() => setIsMoving(false), 500); // Match the transition duration
  }, [setPlayerPosition]);

  const doorStyle = {
    ...objectBaseStyle,
    width: '5rem',
    height: '7rem',
    backgroundColor: 'white',
    left: '80%',
    top: '50%',
    transform: 'translate(-50%, -50%)',
  };

  const fridgeStyle = {
    ...objectBaseStyle,
    width: '6rem',
    height: '9rem',
    backgroundColor: 'white',
    left: '20%',
    top: '50%',
    transform: 'translate(-50%, -50%)',
  };

  const rugStyle = {
    ...objectBaseStyle,
    width: '10rem',
    height: '5rem',
    backgroundColor: 'white',
    left: '50%',
    top: '80%',
    transform: 'translate(-50%, -50%)',
  };

  const labelStyle = {
    position: 'absolute',
    left: '50%',
    top: '50%',
    transform: 'translate(-50%, -150%)',
    color: 'hsl(var(--secondary-foreground))',
    fontWeight: 'bold',
    backgroundColor: 'hsl(var(--secondary))',
    padding: '0.25rem 0.5rem',
    borderRadius: '0.25rem',
    boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
    zIndex: 1,
  };

  return (
    <div style={roomStyle}>
      {/* Player Character */}
      <div style={playerStyle} />

      {/* Door */}
      <div
        style={doorStyle}
        onClick={() => !isMoving && movePlayer(80, 40)}
      >
        <span className="object-label">Door</span>
      </div>

      {/* Fridge */}
      <div
        style={fridgeStyle}
        onClick={() => !isMoving && movePlayer(20, 40)}
      >
        <span className="object-label">Fridge</span>
      </div>

      {/* Rug */}
      <div
        style={rugStyle}
        onClick={() => !isMoving && movePlayer(50, 80)}
      >
        <span className="object-label">Rug</span>
      </div>
    </div>
  );
}

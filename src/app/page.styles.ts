import React from 'react';

export const roomStyle: React.CSSProperties = {
  position: 'relative',
  width: '100vw',
  height: '100vh',
  backgroundImage: 'url("/Sprites/temp - basement_apartment.png")',
  backgroundSize: 'cover',
  backgroundPosition: 'center',
  overflow: 'hidden',
  color: 'white',
  cursor: 'crosshair'
};

export const gameTitleStyle: React.CSSProperties = {
  position: 'absolute',
  top: '10px',
  left: '50%',
  transform: 'translateX(-50%)',
  zIndex: 190,
  fontSize: '1.5rem',
  backgroundColor: 'rgba(0, 0, 0, 0.5)',
  padding: '5px 15px',
  borderRadius: '5px',
  pointerEvents: 'none'
};

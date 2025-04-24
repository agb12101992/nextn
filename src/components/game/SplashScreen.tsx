'use client';

import React from 'react';

// --- Props Interface ---
interface SplashScreenProps {
  onContinue: () => void;
}

// --- Style Definitions ---
const splashStyle: React.CSSProperties = {
  width: '100vw', height: '100vh', display: 'flex', flexDirection: 'column',
  justifyContent: 'center', alignItems: 'center', backgroundColor: '#333', color: 'white', cursor: 'pointer'
};
const titleStyle: React.CSSProperties = {
  fontSize: '4rem', marginBottom: '1rem', color: '#eee'
};
const promptStyle: React.CSSProperties = {
  fontSize: '1.2rem', color: '#ccc'
};

// --- Splash Screen Component ---
const SplashScreen: React.FC<SplashScreenProps> = ({ onContinue }) => {
  return (
    <div style={splashStyle} onClick={onContinue}>
      <h1 style={titleStyle}>Zen Idle</h1>
      <p style={promptStyle}>Click anywhere to continue</p>
    </div>
  );
};

export default SplashScreen;

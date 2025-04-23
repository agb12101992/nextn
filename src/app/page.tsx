'use client';

import React, { useState, useCallback, useEffect } from 'react';
// Import the new components
import PlayerCharacter from '../components/game/PlayerCharacter';
import PlayerStatsUI from '../components/game/PlayerStatsUI';
import DebugDisplay from '../components/game/DebugDisplay';

// --- Type Definitions ---
interface PlayerStats {
    health: number;
    hunger: number;
    attack: number;
    combo: number;
    styleLevel: number;
    currentStyleName: string;
}

// --- Splash Screen Component ---
const SplashScreen = ({ onContinue }: { onContinue: () => void }) => {
  // Assuming style definitions exist externally
  return (
    <div style={splashStyle} onClick={onContinue}>
      <h1 style={titleStyle}>Zen Idle</h1>
      <p style={promptStyle}>Click anywhere to continue</p>
    </div>
  );
};

// --- Game Area Component ---
const GameArea = () => {
  // Game State
  const [playerPosition, setPlayerPosition] = useState({ x: 50, y: 50 });
  const [isMoving, setIsMoving] = useState(false);

  // UI State
  const [health, setHealth] = useState(100);
  const [hunger, setHunger] = useState(100);
  const [attack, setAttack] = useState(1);
  const [combo, setCombo] = useState(1);
  const [styleLevel, setStyleLevel] = useState(1);
  const [currentStyleName, setCurrentStyleName] = useState<string>("Street");
  const MAX_VALUE = 100;
  const [showDebugMenu, setShowDebugMenu] = useState(false);

  // --- Game Logic ---
  const movePlayer = useCallback((targetX: number, targetY: number) => {
    setIsMoving(true);
    setPlayerPosition({ x: targetX, y: targetY });
    setTimeout(() => {
      setIsMoving(false);
    }, 500);
  }, []);

  useEffect(() => {
    const interactionInterval = setInterval(() => {
      const { x, y } = playerPosition;
      const isOnCouch = x > 45 && x < 55 && y > 80 && y < 90;
      if (!isMoving && isOnCouch) {
        setHealth(prev => Math.min(MAX_VALUE, prev + 1));
      }
    }, 1000);
    return () => clearInterval(interactionInterval);
  }, [playerPosition, isMoving, setHealth]);

  const restoreStats = () => {
    setHealth(MAX_VALUE); setHunger(MAX_VALUE); setAttack(1); setCombo(1); setStyleLevel(1);
    setCurrentStyleName("Street");
  };

  const handleBackgroundClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if ((e.target as HTMLElement).closest('[style*="z-index: 150"]') ||
        (e.target as HTMLElement).closest('[style*="z-index: 200"]') ||
        (e.target as HTMLElement).closest('[style*="z-index: 190"]')) {
        return;
    }
    const rect = e.currentTarget.getBoundingClientRect();
    const targetX = ((e.clientX - rect.left) / rect.width) * 100;
    const targetY = ((e.clientY - rect.top) / rect.height) * 100;
    movePlayer(targetX, targetY);
  };

  const toggleDebugMenu = useCallback(() => {
    setShowDebugMenu(prev => !prev);
  }, []);

  // --- Main Render Logic ---
  return (
    <div style={roomStyle} onClick={handleBackgroundClick}>
      <h2 style={gameTitleStyle}>Basement Apartment</h2>

      {/* Render the PlayerCharacter component */}
      <PlayerCharacter position={playerPosition} isMoving={isMoving} />

      {/* Render the PlayerStatsUI component */}
      <PlayerStatsUI
        health={health}
        hunger={hunger}
        attack={attack}
        combo={combo}
        styleLevel={styleLevel}
        currentStyleName={currentStyleName}
        MAX_VALUE={MAX_VALUE}
      />

      {/* Render the DebugDisplay component */}
      <DebugDisplay
        showDebugMenu={showDebugMenu}
        onToggleDebug={toggleDebugMenu} // Pass the memoized toggle function
        onRestoreStats={restoreStats}
      />

    </div>
  );
}

// --- Main Page Component ---
export default function Home() {
  const [showSplash, setShowSplash] = useState(true);
  const handleContinue = () => { setShowSplash(false); };
  return (<>{showSplash ? <SplashScreen onContinue={handleContinue} /> : <GameArea />}</>);
}


// --- Style Definitions (Placed Externally) ---
// Styles needed by SplashScreen or GameArea itself
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
const roomStyle: React.CSSProperties = {
  position: 'relative', width: '100vw', height: '100vh',
  backgroundImage: 'url("/Sprites/temp - basement_apartment.png")',
  backgroundSize: 'cover', backgroundPosition: 'center',
  overflow: 'hidden', color: 'white', cursor: 'crosshair'
};
const gameTitleStyle: React.CSSProperties = {
  position: 'absolute', top: '10px', left: '50%', transform: 'translateX(-50%)',
  zIndex: 10, fontSize: '1.5rem', backgroundColor: 'rgba(0, 0, 0, 0.5)',
  padding: '5px 15px', borderRadius: '5px', pointerEvents: 'none'
};
// Styles moved to PlayerStatsUI.tsx: uiContainerStyle, meterContainerStyle, meterLabelValueContainerStyle, meterLabelStyle, meterValueStyle, meterBarStyle, meterFillBaseStyle
// Styles moved to DebugDisplay.tsx: debugToggleStyle, debugMenuStyle, debugButtonStyle


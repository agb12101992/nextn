'use client';

import React, { useState, useCallback, useEffect } from 'react';

// --- Type Definitions ---
// Removed FridgeItem, StoreItem

interface PlayerStats {
    health: number;
    hunger: number;
    attack: number;
    combo: number;
    styleLevel: number;
    currentStyleName: string;
}

// --- Item Data ---
// Removed STORE_ITEMS

// --- Helper Functions ---
// Removed getRandomInt (not currently used)

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
  // Removed object/menu state: fridgeInventory, showFridgeMenu, showStoreMenu, showDoorOptionsMenu

  // UI State
  const [health, setHealth] = useState(100);
  const [hunger, setHunger] = useState(100); // Keep hunger for now, maybe used later
  const [attack, setAttack] = useState(1);
  const [combo, setCombo] = useState(1);
  const [styleLevel, setStyleLevel] = useState(1);
  const [currentStyleName, setCurrentStyleName] = useState<string>("Street");
  const MAX_VALUE = 100;
  const [showDebugMenu, setShowDebugMenu] = useState(false);

  // --- Styles --- (Assume remaining styles are defined externally)
  // Removed object/menu styles
  const healthFillStyle: React.CSSProperties = { ...meterFillBaseStyle, width: `${(health / MAX_VALUE) * 100}%`, backgroundColor: '#4CAF50' };
  const hungerFillStyle: React.CSSProperties = { ...meterFillBaseStyle, width: `${(hunger / MAX_VALUE) * 100}%`, backgroundColor: '#FFC107' };


  // --- Game Logic ---
  // Simplified movePlayer - no specific objects/menus to handle
  const movePlayer = useCallback((targetX: number, targetY: number) => {
    setIsMoving(true);
    setPlayerPosition({ x: targetX, y: targetY });
    setTimeout(() => {
      setIsMoving(false);
    }, 500); // Movement duration
  }, []); // No dependencies needed now

  // Removed handleGetItem, handleUseItem, handleOpenStore, handleGoBackToDoorOptions, handleObjectClick

  // --- Periodic Interaction Logic ---
  useEffect(() => {
    const interactionInterval = setInterval(() => {
      // HP Recovery on Couch (Example Location: x=50, y=85)
      // Note: Player can't actually *go* to the couch currently without object clicks
      // We'll add a basic click-to-move-anywhere soon
      const { x, y } = playerPosition;
      // Define couch area approximately
      const isOnCouch = x > 45 && x < 55 && y > 80 && y < 90; // Example bounds
      if (!isMoving && isOnCouch) {
        setHealth(prev => Math.min(MAX_VALUE, prev + 1)); // Heal 1 HP per second
      }

      // Maybe add Hunger drain later?
      // setHunger(prev => Math.max(0, prev - 0.1));

    }, 1000); // Run every second

    return () => clearInterval(interactionInterval);
  // Updated dependencies
  }, [playerPosition, isMoving, setHealth]);


  // Debug Menu Handlers
  const restoreStats = () => {
    setHealth(MAX_VALUE); setHunger(MAX_VALUE); setAttack(1); setCombo(1); setStyleLevel(1);
    setCurrentStyleName("Street");
    // Removed fridgeInventory reset
  };

  // --- Simplified Background Click Logic ---
  const handleBackgroundClick = (e: React.MouseEvent<HTMLDivElement>) => {
      // Ignore clicks on UI elements (simple check based on zIndex)
      if ((e.target as HTMLElement).closest('[style*="z-index: 150"]') ||
          (e.target as HTMLElement).closest('[style*="z-index: 200"]') ||
          (e.target as HTMLElement).closest('[style*="z-index: 190"]')) { // Added check for debug menu z-index
          return;
      }

      // Calculate click position relative to the viewport size
      const rect = e.currentTarget.getBoundingClientRect();
      const targetX = ((e.clientX - rect.left) / rect.width) * 100;
      const targetY = ((e.clientY - rect.top) / rect.height) * 100;

      movePlayer(targetX, targetY);
  };


  // --- Main Render Logic ---
  // Render the Game Area
  return (
    // Add onClick to the main room div for background clicks
    <div style={roomStyle} onClick={handleBackgroundClick}>
      <h2 style={gameTitleStyle}>Basement Apartment</h2>
      {/* Player Character - Position updated based on state */}
      <div style={{ ...playerStyle, left: `${playerPosition.x}%`, top: `${playerPosition.y}%`, transition: isMoving ? 'left 0.5s linear, top 0.5s linear' : 'none' }} />

      {/* UI Meters (Top Left) */}
       <div style={uiContainerStyle}>
         {/* Health Meter */}
         <div style={meterContainerStyle}>
            <div style={meterLabelValueContainerStyle}>
               <span style={meterLabelStyle}>Health:</span>
               <span style={meterValueStyle}>{health.toFixed(0)}/{MAX_VALUE}</span>
             </div>
           <div style={meterBarStyle}>
             <div style={healthFillStyle} />
           </div>
         </div>
         {/* Hunger Meter */}
          <div style={meterContainerStyle}>
            <div style={meterLabelValueContainerStyle}>
               <span style={meterLabelStyle}>Hunger:</span>
               <span style={meterValueStyle}>{hunger.toFixed(0)}/{MAX_VALUE}</span>
            </div>
            <div style={meterBarStyle}>
              <div style={hungerFillStyle} />
            </div>
          </div>
          {/* Other Stats */}
          <div style={{fontSize: '0.9rem', marginTop: '0.5rem'}}>Attack: {attack.toFixed(1)}</div>
          <div style={{fontSize: '0.9rem'}}>Combo: {combo}</div>
          <div style={{fontSize: '0.9rem'}}>Style: {currentStyleName} (Lv {styleLevel})</div>
       </div>

       {/* Debug Menu Toggle (Bottom Left) */}
       <button style={debugToggleStyle} onClick={(e) => { e.stopPropagation(); setShowDebugMenu(!showDebugMenu); }}>
         {showDebugMenu ? 'Hide' : 'Debug'}
       </button>

       {/* Debug Menu (Above Toggle Button) */}
        {showDebugMenu && (
          // Add stopPropagation to prevent clicks inside the menu from triggering background click
          <div style={debugMenuStyle} onClick={(e) => e.stopPropagation()}> 
              <button style={debugButtonStyle} onClick={restoreStats}>Restore Stats</button>
              {/* Add other debug buttons here */} 
          </div>
        )}

      {/* Removed Menus (Fridge, Door Options, Store) */}
      {/* Removed Interactive Objects */} 
    </div>
  );
}

// --- Main Page Component ---
export default function Home() {
  const [showSplash, setShowSplash] = useState(true);
  const handleContinue = () => { setShowSplash(false); };
  return (<>{showSplash ? <SplashScreen onContinue={handleContinue} /> : <GameArea />}</>);
}


// --- Remaining Style Definitions (Placed Externally) ---
// Styles for Splash, Room, Player, Stats UI, Debug Menu
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
  overflow: 'hidden', color: 'white', cursor: 'crosshair' // Indicate clickable background
};
const gameTitleStyle: React.CSSProperties = {
  position: 'absolute', top: '10px', left: '50%', transform: 'translateX(-50%)',
  zIndex: 10, fontSize: '1.5rem', backgroundColor: 'rgba(0, 0, 0, 0.5)',
  padding: '5px 15px', borderRadius: '5px', pointerEvents: 'none' // Prevent title from intercepting clicks
};
// Removed objectBaseStyle
const playerStyle: React.CSSProperties = {
  position: 'absolute', width: '5rem', height: '5rem', backgroundColor: 'blue', // Placeholder color
  // backgroundImage: 'url(/Sprites/Player/playerfront.png)', // Use when sprite is ready
  backgroundSize: 'contain', backgroundRepeat: 'no-repeat', 
  transform: 'translate(-50%, -50%)',
  zIndex: 50, pointerEvents: 'none' // Prevent player from intercepting clicks
};
const uiContainerStyle: React.CSSProperties = {
  position: 'absolute', top: '20px', left: '20px', backgroundColor: 'rgba(0, 0, 0, 0.6)',
  padding: '1rem', borderRadius: '8px', color: 'white', zIndex: 150, // High z-index
  display: 'flex', flexDirection: 'column', gap: '0.75rem' 
};
const meterContainerStyle: React.CSSProperties = { marginBottom: '0.5rem' };
const meterLabelValueContainerStyle: React.CSSProperties = {
  display: 'flex', justifyContent: 'space-between', marginBottom: '4px', fontSize: '0.9rem'
};
const meterLabelStyle: React.CSSProperties = { marginRight: '10px', fontWeight: 'bold' };
const meterValueStyle: React.CSSProperties = { fontFamily: 'monospace' };
const meterBarStyle: React.CSSProperties = {
  width: '150px', height: '12px', backgroundColor: '#555',
  borderRadius: '6px', overflow: 'hidden',
};
const meterFillBaseStyle: React.CSSProperties = {
  height: '100%', borderRadius: '6px', transition: 'width 0.3s ease-in-out',
};
const debugToggleStyle: React.CSSProperties = {
  position: 'absolute', 
  bottom: '20px', // Moved to bottom
  left: '20px',   // Moved to left
  padding: '8px 12px',
  backgroundColor: 'rgba(0, 0, 0, 0.6)', color: 'white', border: '1px solid #777',
  borderRadius: '5px', cursor: 'pointer', zIndex: 200, // High z-index
};
const debugMenuStyle: React.CSSProperties = {
  position: 'absolute', 
  bottom: '60px', // Position above the toggle button
  left: '20px',    // Align with toggle button
  backgroundColor: 'rgba(0, 0, 0, 0.8)',
  padding: '1rem', borderRadius: '8px', border: '1px solid #777', zIndex: 190, // Slightly lower than toggle
  display: 'flex', flexDirection: 'column', gap: '10px',
};
const debugButtonStyle: React.CSSProperties = {
  padding: '8px 10px', backgroundColor: '#444', color: 'white', border: '1px solid #666',
  borderRadius: '4px', cursor: 'pointer', textAlign: 'center'
};
// Removed menu/object related styles


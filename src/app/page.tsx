'use client';

import React, { useState, useCallback, useEffect } from 'react';
// Import game components
import PlayerCharacter from '../components/game/PlayerCharacter';
import PlayerStatsUI from '../components/game/PlayerStatsUI';
import DebugDisplay from '../components/game/DebugDisplay';
import SceneObjects, { SceneObjectConfig } from '../components/game/SceneObjects'; 
import SplashScreen from '../components/game/SplashScreen'; 
import { roomStyle, gameTitleStyle } from './page.styles'; // Import styles

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
  const [styleExp, setStyleExp] = useState(0); 
  const [currentStyleName, setCurrentStyleName] = useState<string>("Street");
  const MAX_VALUE = 100;
  const MAX_STYLE_EXP = 100; 
  const [showDebugMenu, setShowDebugMenu] = useState(false);

  // --- Game Logic ---
  const movePlayer = useCallback((targetX: number, targetY: number) => {
    if (isMoving) return;
    setIsMoving(true);
    setPlayerPosition({ x: targetX, y: targetY });
    setTimeout(() => {
      setIsMoving(false);
    }, 500);
  }, [isMoving]);

  // Click Handlers for Objects
  const handleCouchClick = useCallback(() => { movePlayer(50, 80); }, [movePlayer]);
  const handleFridgeClick = useCallback(() => { movePlayer(18, 40); }, [movePlayer]);
  const handleBooktableClick = useCallback(() => { movePlayer(25, 80); }, [movePlayer]);
  const handleRugClick = useCallback(() => { movePlayer(50, 30); }, [movePlayer]);
  const handlePunchingBagClick = useCallback(() => { movePlayer(75, 90); }, [movePlayer]); 
  const handleDoorClick = useCallback(() => { movePlayer(75, 30); }, [movePlayer]); // New handler

   // --- Scene Object Configuration ---
  const sceneObjectsData: SceneObjectConfig[] = [
    {
      id: 'couch',
      position: { left: '50%', top: '80%' },
      size: { width: '10.6rem', height: '10.6rem' },
      spriteUrl: '/Sprites/couch.png',
      alt: 'A comfy couch',
      clickHandler: handleCouchClick,
      wrapperZIndex: 11,
      objectZIndex: 10
    },
    {
      id: 'fridge',
      position: { left: '18%', top: '40%' },
      size: { width: '11.25rem', height: '22.5rem' },
      spriteUrl: '/Sprites/fridge.png',
      alt: 'A refrigerator',
      clickHandler: handleFridgeClick,
      wrapperZIndex: 11,
      objectZIndex: 10
    },
    {
      id: 'booktable',
      position: { left: '25%', top: '80%' },
      size: { width: '7.5rem', height: '7.5rem' },
      spriteUrl: '/Sprites/booktable.png',
      alt: 'A small table with books',
      clickHandler: handleBooktableClick,
      wrapperZIndex: 11,
      objectZIndex: 10
    },
    {
      id: 'rug',
      position: { left: '50%', top: '30%' },
      size: { width: '16.5rem', height: '9.9rem' },
      spriteUrl: '/Sprites/rug.png',
      alt: 'A worn rug',
      clickHandler: handleRugClick,
      wrapperZIndex: 9, 
      objectZIndex: 8  
    },
    {
      id: 'punchingBag',
      position: { left: '75%', top: '90%' }, 
      size: { width: '10.8rem', height: '21.7rem' }, 
      spriteUrl: '/Sprites/punchingbag.png',
      alt: 'A punching bag',
      clickHandler: handlePunchingBagClick,
      wrapperZIndex: 11,
      objectZIndex: 10
    },
    {
      id: 'door',
      position: { left: '75%', top: '30%' }, // Right of rug, above punching bag
      size: { width: '8rem', height: '16rem' }, // Adjust size as needed
      spriteUrl: '/Sprites/door.png',
      alt: 'An exit door',
      clickHandler: handleDoorClick,
      wrapperZIndex: 11,
      objectZIndex: 10
    }
  ];

  // --- Interaction Logic --- 
  useEffect(() => {
    const interactionInterval = setInterval(() => {
      const { x, y } = playerPosition;
      let isInteractingWithObject = false; 

      if (hunger <= 0 && health > 0) { 
        setHealth(prev => Math.max(0, prev - 0.05)); 
      }

      // --- Couch Interaction ---
      const isOnCouch = x > 47.5 && x < 52.5 && y > 79 && y < 81; 
      if (!isMoving && isOnCouch) {
        setHealth(prev => Math.min(MAX_VALUE, prev + 0.01)); 
        setHunger(prev => Math.max(0, prev - 0.005)); 
        isInteractingWithObject = true;
      }

      // --- Booktable Interaction ---
      const booktableCenterX = 25;
      const booktableCenterY = 80;
      const booktableInteractRangeX = 3.75; 
      const booktableInteractRangeY = 3.75; 
      const isOnBooktable = 
          x > booktableCenterX - booktableInteractRangeX && 
          x < booktableCenterX + booktableInteractRangeX &&
          y > booktableCenterY - booktableInteractRangeY &&
          y < booktableCenterY + booktableInteractRangeY;

      if (!isMoving && isOnBooktable) {
        setHunger(prev => Math.max(0, prev - 0.005)); 
        const baseExpRate = 0.1; 
        const expRateMultiplier = Math.max(0.1, 1 - (styleLevel - 1) * 0.005);
        const expGainPerTick = (baseExpRate * expRateMultiplier) / 10; 
        setStyleExp(prevExp => {
          const newExp = prevExp + expGainPerTick;
          if (newExp >= MAX_STYLE_EXP) {
            setStyleLevel(prevLevel => prevLevel + 1);
            return 0; 
          } else {
            return newExp;
          }
        });
        isInteractingWithObject = true;
      }

      // --- Rug Interaction ---
      const rugCenterX = 50; 
      const rugCenterY = 30;
      const rugInteractRangeX = 8; 
      const rugInteractRangeY = 5; 
      const isOnRug =
          x > rugCenterX - rugInteractRangeX &&
          x < rugCenterX + rugInteractRangeX &&
          y > rugCenterY - rugInteractRangeY &&
          y < rugCenterY + rugInteractRangeY;

      if (!isMoving && isOnRug) {
        setAttack(prev => prev + 0.01); 
        setHunger(prev => Math.max(0, prev - 0.01)); 
        isInteractingWithObject = true;
      }

      // --- Punching Bag Interaction ---
      const punchingBagCenterX = 75; 
      const punchingBagCenterY = 90; 
      const punchingBagInteractRangeX = 5;  
      const punchingBagInteractRangeY = 10; 
      const isOnPunchingBag = 
          x > punchingBagCenterX - punchingBagInteractRangeX &&
          x < punchingBagCenterX + punchingBagInteractRangeX &&
          y > punchingBagCenterY - punchingBagInteractRangeY &&
          y < punchingBagCenterY + punchingBagInteractRangeY;
          
      if (!isMoving && isOnPunchingBag) {
          setCombo(prev => prev + 0.01); 
          setHunger(prev => Math.max(0, prev - 0.005)); 
          isInteractingWithObject = true;
      }

      // --- Door Interaction (Placeholder) ---
      // const doorCenterX = 75;
      // const doorCenterY = 30;
      // const doorInteractRangeX = 4; // Approx half-width % for 8rem
      // const doorInteractRangeY = 8; // Approx half-height % for 16rem
      // const isOnDoor = 
      //     x > doorCenterX - doorInteractRangeX &&
      //     x < doorCenterX + doorInteractRangeX &&
      //     y > doorCenterY - doorInteractRangeY &&
      //     y < doorCenterY + doorInteractRangeY;

      // if (!isMoving && isOnDoor) {
      //    // Add door functionality later
      // }

    }, 100); 

    return () => clearInterval(interactionInterval);
  }, [playerPosition, isMoving, health, hunger, styleLevel, setHealth, setHunger, setStyleLevel, setStyleExp, setAttack, setCombo, MAX_VALUE, MAX_STYLE_EXP]); 

  // --- Debug Handlers ---
  const restoreStats = () => {
    setHealth(MAX_VALUE); setHunger(MAX_VALUE); setAttack(1); setCombo(1); 
    setStyleLevel(1); setStyleExp(0); 
    setCurrentStyleName("Street");
  };
  const modifyHealth = useCallback((amount: number) => {
    setHealth(prev => Math.max(0, Math.min(MAX_VALUE, prev + amount)));
  }, [MAX_VALUE]);
  const modifyHunger = useCallback((amount: number) => {
    setHunger(prev => Math.max(0, Math.min(MAX_VALUE, prev + amount)));
  }, [MAX_VALUE]);
  const modifyAttack = useCallback((amount: number) => {
    setAttack(prev => Math.max(0.1, prev + amount)); 
  }, []);
  const modifyCombo = useCallback((amount: number) => {
    setCombo(prev => Math.max(1, prev + amount));
  }, []);
  const modifyStyleLevel = useCallback((amount: number) => {
      setStyleLevel(prev => Math.max(1, prev + amount)); 
  }, []);
  const modifyStyleExp = useCallback((amount: number) => {
      setStyleExp(prev => {
          const newExp = prev + amount;
          if (newExp >= MAX_STYLE_EXP) {
              setStyleLevel(prevLevel => prevLevel + 1);
              return newExp - MAX_STYLE_EXP; 
          } else if (newExp < 0) {
              setStyleLevel(prevLevel => Math.max(1, prevLevel - 1)); 
              return Math.max(0, MAX_STYLE_EXP + newExp); 
          } else {
              return newExp;
          }
      });
  }, [MAX_STYLE_EXP]);

  // --- End Debug Handlers ---

  const handleBackgroundClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (isMoving || (e.target as HTMLElement).closest('[data-clickable-object="true"]') || 
        (e.target as HTMLElement).closest('[style*="z-index: 150"]') || 
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

      <SceneObjects objects={sceneObjectsData} />

      <PlayerCharacter position={playerPosition} isMoving={isMoving} />

      <PlayerStatsUI
        health={health}
        hunger={hunger}
        attack={attack} 
        combo={combo} 
        styleLevel={styleLevel}
        styleExp={styleExp} 
        currentStyleName={currentStyleName}
        MAX_VALUE={MAX_VALUE}
        MAX_STYLE_EXP={MAX_STYLE_EXP}
      />

      <DebugDisplay
        showDebugMenu={showDebugMenu}
        onToggleDebug={toggleDebugMenu}
        onRestoreStats={restoreStats}
        onModifyHealth={modifyHealth} 
        onModifyHunger={modifyHunger}
        onModifyAttack={modifyAttack} 
        onModifyStyleLevel={modifyStyleLevel} 
        onModifyStyleExp={modifyStyleExp}    
        onModifyCombo={modifyCombo} 
      />

    </div>
  );
};

// --- Main Page Component ---
export default function Home() {
  const [showSplash, setShowSplash] = useState(true);
  const handleContinue = () => { setShowSplash(false); };

  return (
    <>
      {showSplash ? (
        <SplashScreen onContinue={handleContinue} />
      ) : (
        <GameArea />
      )}
    </>
  );
}

// Styles moved to page.styles.ts

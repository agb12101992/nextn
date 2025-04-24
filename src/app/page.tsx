'use client';

import React, { useState, useCallback, useEffect } from 'react'; 
// Import game components
import PlayerCharacter from '../components/game/PlayerCharacter';
import PlayerStatsUI from '../components/game/PlayerStatsUI';
import DebugDisplay from '../components/game/DebugDisplay';
import SceneObjects, { SceneObjectConfig } from '../components/game/SceneObjects'; 
import SplashScreen from '../components/game/SplashScreen'; 
import { roomStyle, gameTitleStyle } from './page.styles'; // Import styles
import FridgeMenu from '../components/game/FridgeMenu';
import DoorMenu from '../components/game/DoorMenu'; // Import DoorMenu
import StoreMenu from '../components/game/StoreMenu'; // Import StoreMenu

// --- Game Area Component ---
const GameArea = () => {
  // Game State
  const [isFridgeMenuOpen, setIsFridgeMenuOpen] = useState(false);
  const [isDoorMenuOpen, setIsDoorMenuOpen] = useState(false); // State for DoorMenu
  const [isStoreMenuOpen, setIsStoreMenuOpen] = useState(false); // State for StoreMenu
  const [fridgeInventory, setFridgeInventory] = useState([
    { item: null, count: 0 },
    { item: null, count: 0 },
    { item: null, count: 0 },
    { item: null, count: 0 },
    { item: null, count: 0 },
  ]);

  const [playerPosition, setPlayerPosition] = useState({ x: 50, y: 50 });
  const [isMoving, setIsMoving] = useState(false);

  // Target positions for menus
  const [fridgeTarget, setFridgeTarget] = useState<{x: number, y:number} | null>(null);
  const [doorTarget, setDoorTarget] = useState<{x: number, y:number} | null>(null);

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
  const movePlayer = useCallback((targetX: number, targetY: number): Promise<void> => {
    return new Promise<void>((resolve) => {
      if (isMoving) {
        resolve();
        return;
      }
      setIsMoving(true);
      setPlayerPosition({ x: targetX, y: targetY });
      setTimeout(() => {
        setIsMoving(false);
        resolve();
      }, 500);
    });
  }, [isMoving]);

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

  // Click Handlers for Objects
  const handleCouchClick = useCallback(() => { movePlayer(50, 80); }, [movePlayer]);
  const handleFridgeClick = useCallback(async () => {
    await movePlayer(18, 40);
    setFridgeTarget({x: 18, y: 40});
  }, [movePlayer]);
  const handleBooktableClick = useCallback(() => { movePlayer(25, 80); }, [movePlayer]);
  const handleRugClick = useCallback(() => { movePlayer(50, 30); }, [movePlayer]);
  const handlePunchingBagClick = useCallback(() => { movePlayer(75, 90); }, [movePlayer]); 
  const handleDoorClick = useCallback(async () => {
    await movePlayer(75, 30);
    setDoorTarget({x: 75, y: 30});
  }, [movePlayer]); // Modified handler

  // Door Menu Handlers (Placeholders)
  const handleStoreOption = () => {
    setIsStoreMenuOpen(true);
    setIsDoorMenuOpen(false);
  }

  const handleFightOption = () => {
      console.log("Fight option selected");
      setIsDoorMenuOpen(false);
      setDoorTarget(null);
  }

    // Store Menu Handlers
    const handleBuyEnergyDrink = () => {
        setHunger(prev => Math.min(MAX_VALUE, prev + 20));
        setFridgeInventory(prev => {
          let newInventory = [...prev];
          for (let i = 0; i < newInventory.length; i++) {
            if (newInventory[i].item === null || newInventory[i].item === "Energy Drink" && newInventory[i].count < 3) {
              newInventory[i] = { item: "Energy Drink", count: newInventory[i].count + 1 };
              return newInventory;
            }
          }
          return prev; // No available slot
        });
    };

    const handleBuyPizza = () => {
        setHunger(prev => Math.min(MAX_VALUE, prev + 50));
        setFridgeInventory(prev => {
          let newInventory = [...prev];
          for (let i = 0; i < newInventory.length; i++) {
            if (newInventory[i].item === null || newInventory[i].item === "Pizza" && newInventory[i].count < 3) {
              newInventory[i] = { item: "Pizza", count: newInventory[i].count + 1 };
              return newInventory;
            }
          }
          return prev; // No available slot
        });
    };

    const handleBuyProteinShake = () => {
        setHunger(prev => Math.min(MAX_VALUE, prev + 30));
        setFridgeInventory(prev => {
          let newInventory = [...prev];
          for (let i = 0; i < newInventory.length; i++) {
            if (newInventory[i].item === null || newInventory[i].item === "Protein Shake" && newInventory[i].count < 3) {
              newInventory[i] = { item: "Protein Shake", count: newInventory[i].count + 1 };
              return newInventory;
            }
          }
          return prev; // No available slot
        });
    };

    const handleGoBack = () => {
        setIsStoreMenuOpen(false);
        setIsDoorMenuOpen(true);
    }

    const handleEatItem = (item: string | null, index: number) => {
      if (!item) return;

      let hungerRestore = 0;
      switch (item) {
        case "Energy Drink":
          hungerRestore = 20;
          break;
        case "Pizza":
          hungerRestore = 50;
          break;
        case "Protein Shake":
          hungerRestore = 30;
          break;
        default:
          break;
      }

      setHunger(prev => Math.min(MAX_VALUE, prev + hungerRestore));
      setFridgeInventory(prev => {
        let newInventory = [...prev];
        newInventory[index] = { item: newInventory[index].item, count: newInventory[index].count - 1 };
        if (newInventory[index].count <= 0) {
          newInventory[index] = { item: null, count: 0 };
        }
        return newInventory;
      });
    };

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
        objectZIndex: 10,
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
          x < rugCenterX + booktableInteractRangeX &&
          y > rugCenterY - rugInteractRangeY &&
          y > rugCenterY + booktableInteractRangeY;

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

    }, 100); 

    return () => clearInterval(interactionInterval);
  }, [playerPosition, isMoving, health, hunger, styleLevel, setHealth, setHunger, setStyleLevel, setStyleExp, setAttack, setCombo, MAX_VALUE, MAX_STYLE_EXP]); 

  useEffect(() => {
    const distanceThreshold = 2; // Adjust as needed

    if (fridgeTarget) {
      const fridgeDistance = Math.sqrt(
        Math.pow(playerPosition.x - fridgeTarget.x, 2) + Math.pow(playerPosition.y - fridgeTarget.y, 2)
      );
      if (fridgeDistance <= distanceThreshold) {
        setIsFridgeMenuOpen(true);
        setIsDoorMenuOpen(false);
        setIsStoreMenuOpen(false);
        setFridgeTarget(null);
      } else {
        setIsFridgeMenuOpen(false);
      }
    } else if (doorTarget) {
      const doorDistance = Math.sqrt(
        Math.pow(playerPosition.x - doorTarget.x, 2) + Math.pow(playerPosition.y - doorTarget.y, 2)
      );
      if (doorDistance <= distanceThreshold) {
        setIsDoorMenuOpen(true);
        setIsFridgeMenuOpen(false);
        setIsStoreMenuOpen(false);
        setDoorTarget(null);
      } else {
        setIsDoorMenuOpen(false);
      }
    }
  }, [playerPosition, fridgeTarget, doorTarget]);

  const handleBackgroundClick = (e: React.MouseEvent<HTMLDivElement>) => {
      if (isFridgeMenuOpen || isDoorMenuOpen || isStoreMenuOpen) {
          return; // Prevent movement when any menu is open
      }
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

  return (
    <div style={roomStyle} onClick={handleBackgroundClick}>
      <h2 style={gameTitleStyle}>Basement Apartment</h2>

      {isFridgeMenuOpen && (
        <FridgeMenu
          inventory={fridgeInventory}
          onClose={() => {
            setIsFridgeMenuOpen(false);
            setFridgeTarget(null); // Clear target on close
          }}
          onItemClick={handleEatItem}
        />
      )}

      {isDoorMenuOpen && ( // Conditional rendering for DoorMenu
          <DoorMenu 
              onClose={() => setIsDoorMenuOpen(false)}
              onStoreClick={handleStoreOption}
              onFightClick={handleFightOption}
          />
      )}

      {isStoreMenuOpen && (
          <StoreMenu
              onClose={() => setIsStoreMenuOpen(false)}
              onBuyEnergyDrink={handleBuyEnergyDrink}
              onBuyPizza={handleBuyPizza}
              onBuyProteinShake={handleBuyProteinShake}
              onGoBack={handleGoBack}
          />
      )}

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

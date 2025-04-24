'use client';

import React, { useState } from 'react'; // Import useState
import styles from './DebugDisplay.module.css';
// Define styles (keeping them concise)


// Define Prop Types
interface DebugDisplayProps {
  showDebugMenu: boolean;
  onToggleDebug: () => void;
  onRestoreStats: () => void;
  onModifyHealth: (amount: number) => void; 
  onModifyHunger: (amount: number) => void; 
  onModifyAttack: (amount: number) => void; 
  onModifyCombo: (amount: number) => void; // Added Combo modifier prop
  onModifyStyleLevel: (amount: number) => void; 
  onModifyStyleExp: (amount: number) => void;   
  onEnterFightRoom: () => void;
  onGoHome?: () => void;  // Make onGoHome optional
}

// Define SubMenu types
type SubMenu = 'health' | 'hunger' | 'attack' | 'combo' | 'style' | null;

// --- DebugDisplay Component ---
export const DebugDisplay: React.FC<DebugDisplayProps> = ({
  showDebugMenu,
  onToggleDebug,
  onRestoreStats,
  onModifyHealth,
  onModifyHunger,
  onModifyAttack,
  onModifyCombo, // Destructure Combo modifier
  onModifyStyleLevel, 
  onModifyStyleExp,   
   onEnterFightRoom,
   onGoHome
}) => {
  const [activeSubMenu, setActiveSubMenu] = useState<SubMenu>(null);

  const handleToggleClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (showDebugMenu) {
        setActiveSubMenu(null); // Close submenu when hiding main menu
    }
    onToggleDebug();
  };

  const handleMenuClick = (e: React.MouseEvent) => {
    e.stopPropagation(); // Prevent background click
  };
  
  const handleSubMenuToggle = (subMenu: SubMenu) => {
      setActiveSubMenu(prev => prev === subMenu ? null : subMenu);
  }

  return (
    <>
      <button className={styles.debugToggleStyle} onClick={handleToggleClick}>
        {showDebugMenu ? 'Hide' : 'Debug'}
      </button>

      {showDebugMenu && (
        <div className={styles.debugMenuStyle} onClick={handleMenuClick}>
          {/* --- Main Actions --- */}
          <button className={styles.debugButtonStyle} onClick={onRestoreStats}>
            Restore Stats
          </button>
          <hr style={{borderColor: '#555'}}/>

          {/* --- Sub-Menu Toggles --- */}
          <button className={styles.debugButtonStyle} onClick={() => handleSubMenuToggle('health')}>
            Modify Health {activeSubMenu === 'health' ? '▲' : '▼'}
          </button>
          {activeSubMenu === 'health' && (
             <div className={styles.subMenuStyle}>
                <button className={styles.debugButtonStyle} onClick={() => onModifyHealth(10)}>+10</button>
                <button className={styles.debugButtonStyle} onClick={() => onModifyHealth(-10)}>-10</button>
             </div>
          )}
          
          <button className={styles.debugButtonStyle} onClick={() => handleSubMenuToggle('hunger')}>
            Modify Hunger {activeSubMenu === 'hunger' ? '▲' : '▼'}
          </button>
          {activeSubMenu === 'hunger' && (
             <div className={styles.subMenuStyle}>
                <button className={styles.debugButtonStyle} onClick={() => onModifyHunger(10)}>+10</button>
                <button className={styles.debugButtonStyle} onClick={() => onModifyHunger(-10)}>-10</button>
             </div>
          )}

          <button className={styles.debugButtonStyle} onClick={() => handleSubMenuToggle('attack')}>
            Modify Attack {activeSubMenu === 'attack' ? '▲' : '▼'}
          </button>
          {activeSubMenu === 'attack' && (
             <div className={styles.subMenuStyle}>
                <button className={styles.debugButtonStyle} onClick={() => onModifyAttack(1)}>+1</button>
                <button className={styles.debugButtonStyle} onClick={() => onModifyAttack(-1)}>-1</button> 
                <button className={styles.debugButtonStyle} onClick={() => onModifyAttack(0.1)}>+0.1</button>
                <button className={styles.debugButtonStyle} onClick={() => onModifyAttack(-0.1)}>-0.1</button>
             </div>
          )}
          
          <button className={styles.debugButtonStyle} onClick={() => handleSubMenuToggle('combo')}>
            Modify Combo {activeSubMenu === 'combo' ? '▲' : '▼'}
          </button>
          {activeSubMenu === 'combo' && (
             <div className={styles.subMenuStyle}>
                <button className={styles.debugButtonStyle} onClick={() => onModifyCombo(1)}>+1</button>
                <button className={styles.debugButtonStyle} onClick={() => onModifyCombo(-1)}>-1</button> 
                 <button className={styles.debugButtonStyle} onClick={() => onModifyCombo(10)}>+10</button>
                <button className={styles.debugButtonStyle} onClick={() => onModifyCombo(-10)}>-10</button>
             </div>
          )}
          
          <button className={styles.debugButtonStyle} onClick={() => handleSubMenuToggle('style')}>
            Modify Style {activeSubMenu === 'style' ? '▲' : '▼'}
          </button>
          {activeSubMenu === 'style' && (
             <div className={styles.subMenuStyle}>
                <button className={styles.debugButtonStyle} onClick={() => onModifyStyleLevel(1)}>Lvl +1</button>
                <button className={styles.debugButtonStyle} onClick={() => onModifyStyleLevel(-1)}>Lvl -1</button>
                <hr style={{borderColor: '#555', margin: '2px 0'}}/>
                <button className={styles.debugButtonStyle} onClick={() => onModifyStyleExp(10)}>EXP +10</button>
                <button className={styles.debugButtonStyle} onClick={() => onModifyStyleExp(-10)}>EXP -10</button>
                <button className={styles.debugButtonStyle} onClick={() => onModifyStyleExp(100)}>EXP +100</button>
             </div>
          )}

          <button className={styles.debugButtonStyle} onClick={onEnterFightRoom}>Fight Room</button>
          {onGoHome && (<button className={styles.debugButtonStyle} onClick={onGoHome}>Go Home</button>)} 

        </div>
      )}
    </>
  );
};

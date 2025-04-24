'use client';

import React, { useState } from 'react'; // Import useState

// Define styles (keeping them concise)
const debugToggleStyle: React.CSSProperties = {
  position: 'absolute', bottom: '20px', right: '20px', 
  padding: '6px 10px', backgroundColor: 'rgba(0, 0, 0, 0.6)',
  color: 'white', border: '1px solid #777', borderRadius: '5px', 
  cursor: 'pointer', zIndex: 200, 
};
const debugMenuStyle: React.CSSProperties = {
  position: 'absolute', bottom: '60px', right: '20px', 
  backgroundColor: 'rgba(0, 0, 0, 0.8)', padding: '0.75rem', 
  borderRadius: '8px', border: '1px solid #777', zIndex: 190, 
  display: 'flex', flexDirection: 'column', gap: '8px', 
  maxHeight: 'calc(100vh - 100px)', overflowY: 'auto',
  width: '150px' // Give the menu a fixed width
};
const debugButtonStyle: React.CSSProperties = {
  padding: '6px 8px', fontSize: '0.8rem', 
  backgroundColor: '#444', color: 'white', 
  border: '1px solid #666', borderRadius: '4px', 
  cursor: 'pointer', textAlign: 'center',
  width: '100%' // Make buttons fill menu width
};
const subMenuStyle: React.CSSProperties = {
  display: 'flex', flexDirection: 'column', gap: '5px', marginTop: '5px'
};

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
}

// Define SubMenu types
type SubMenu = 'health' | 'hunger' | 'attack' | 'combo' | 'style' | null;

// --- DebugDisplay Component ---
const DebugDisplay: React.FC<DebugDisplayProps> = ({
  showDebugMenu,
  onToggleDebug,
  onRestoreStats,
  onModifyHealth,
  onModifyHunger,
  onModifyAttack,
  onModifyCombo, // Destructure Combo modifier
  onModifyStyleLevel, 
  onModifyStyleExp    
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
      <button style={debugToggleStyle} onClick={handleToggleClick}>
        {showDebugMenu ? 'Hide' : 'Debug'}
      </button>

      {showDebugMenu && (
        <div style={debugMenuStyle} onClick={handleMenuClick}>
          {/* --- Main Actions --- */}
          <button style={debugButtonStyle} onClick={onRestoreStats}>
            Restore Stats
          </button>
          <hr style={{borderColor: '#555'}}/>

          {/* --- Sub-Menu Toggles --- */}
          <button style={debugButtonStyle} onClick={() => handleSubMenuToggle('health')}>
            Modify Health {activeSubMenu === 'health' ? '▲' : '▼'}
          </button>
          {activeSubMenu === 'health' && (
             <div style={subMenuStyle}>
                <button style={debugButtonStyle} onClick={() => onModifyHealth(10)}>+10</button>
                <button style={debugButtonStyle} onClick={() => onModifyHealth(-10)}>-10</button>
             </div>
          )}
          
          <button style={debugButtonStyle} onClick={() => handleSubMenuToggle('hunger')}>
            Modify Hunger {activeSubMenu === 'hunger' ? '▲' : '▼'}
          </button>
          {activeSubMenu === 'hunger' && (
             <div style={subMenuStyle}>
                <button style={debugButtonStyle} onClick={() => onModifyHunger(10)}>+10</button>
                <button style={debugButtonStyle} onClick={() => onModifyHunger(-10)}>-10</button>
             </div>
          )}

          <button style={debugButtonStyle} onClick={() => handleSubMenuToggle('attack')}>
            Modify Attack {activeSubMenu === 'attack' ? '▲' : '▼'}
          </button>
          {activeSubMenu === 'attack' && (
             <div style={subMenuStyle}>
                <button style={debugButtonStyle} onClick={() => onModifyAttack(1)}>+1</button>
                <button style={debugButtonStyle} onClick={() => onModifyAttack(-1)}>-1</button> 
                <button style={debugButtonStyle} onClick={() => onModifyAttack(0.1)}>+0.1</button>
                <button style={debugButtonStyle} onClick={() => onModifyAttack(-0.1)}>-0.1</button>
             </div>
          )}
          
          <button style={debugButtonStyle} onClick={() => handleSubMenuToggle('combo')}>
            Modify Combo {activeSubMenu === 'combo' ? '▲' : '▼'}
          </button>
          {activeSubMenu === 'combo' && (
             <div style={subMenuStyle}>
                <button style={debugButtonStyle} onClick={() => onModifyCombo(1)}>+1</button>
                <button style={debugButtonStyle} onClick={() => onModifyCombo(-1)}>-1</button> 
                 <button style={debugButtonStyle} onClick={() => onModifyCombo(10)}>+10</button>
                <button style={debugButtonStyle} onClick={() => onModifyCombo(-10)}>-10</button>
             </div>
          )}
          
          <button style={debugButtonStyle} onClick={() => handleSubMenuToggle('style')}>
            Modify Style {activeSubMenu === 'style' ? '▲' : '▼'}
          </button>
          {activeSubMenu === 'style' && (
             <div style={subMenuStyle}>
                <button style={debugButtonStyle} onClick={() => onModifyStyleLevel(1)}>Lvl +1</button>
                <button style={debugButtonStyle} onClick={() => onModifyStyleLevel(-1)}>Lvl -1</button>
                <hr style={{borderColor: '#555', margin: '2px 0'}}/>
                <button style={debugButtonStyle} onClick={() => onModifyStyleExp(10)}>EXP +10</button>
                <button style={debugButtonStyle} onClick={() => onModifyStyleExp(-10)}>EXP -10</button>
                <button style={debugButtonStyle} onClick={() => onModifyStyleExp(100)}>EXP +100</button>
             </div>
          )}

        </div>
      )}
    </>
  );
};

export default DebugDisplay;

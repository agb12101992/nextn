'use client';

import React from 'react';

// Define styles needed by this component
const debugToggleStyle: React.CSSProperties = {
  position: 'absolute',
  bottom: '20px',
  left: '20px',
  padding: '8px 12px',
  backgroundColor: 'rgba(0, 0, 0, 0.6)', color: 'white', border: '1px solid #777',
  borderRadius: '5px', cursor: 'pointer', zIndex: 200,
};
const debugMenuStyle: React.CSSProperties = {
  position: 'absolute',
  bottom: '60px',
  left: '20px',
  backgroundColor: 'rgba(0, 0, 0, 0.8)',
  padding: '1rem', borderRadius: '8px', border: '1px solid #777', zIndex: 190,
  display: 'flex', flexDirection: 'column', gap: '10px',
};
const debugButtonStyle: React.CSSProperties = {
  padding: '8px 10px', backgroundColor: '#444', color: 'white', border: '1px solid #666',
  borderRadius: '4px', cursor: 'pointer', textAlign: 'center'
};

interface DebugDisplayProps {
  showDebugMenu: boolean;
  onToggleDebug: () => void;
  onRestoreStats: () => void;
}

const DebugDisplay: React.FC<DebugDisplayProps> = ({
  showDebugMenu,
  onToggleDebug,
  onRestoreStats,
}) => {
  // Prevent clicks on the toggle/menu from triggering background click
  const handleToggleClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    onToggleDebug();
  };

  const handleMenuClick = (e: React.MouseEvent) => {
    e.stopPropagation();
  };

  return (
    <>
      {/* Debug Menu Toggle (Bottom Left) */}
      <button style={debugToggleStyle} onClick={handleToggleClick}>
        {showDebugMenu ? 'Hide' : 'Debug'}
      </button>

      {/* Debug Menu (Above Toggle Button) */}
      {showDebugMenu && (
        <div style={debugMenuStyle} onClick={handleMenuClick}>
          <button style={debugButtonStyle} onClick={onRestoreStats}>
            Restore Stats
          </button>
          {/* Add other debug buttons here later if needed */}
        </div>
      )}
    </>
  );
};

export default DebugDisplay;

'use client';

import React from 'react';

// Adjusted styles for smaller UI
const uiContainerStyle: React.CSSProperties = {
  position: 'absolute', top: '15px', left: '15px', 
  backgroundColor: 'rgba(0, 0, 0, 0.6)',
  padding: '0.6rem', 
  borderRadius: '6px', 
  color: 'white', 
  zIndex: 200, 
  display: 'flex', 
  flexDirection: 'column', 
  gap: '0.5rem' 
};
const meterContainerStyle: React.CSSProperties = { marginBottom: '0.3rem' }; 
const meterLabelValueContainerStyle: React.CSSProperties = {
  display: 'flex', 
  justifyContent: 'space-between', 
  marginBottom: '3px', 
  fontSize: '0.75rem' 
};
const meterLabelStyle: React.CSSProperties = { marginRight: '8px', fontWeight: 'bold' }; 
const meterValueStyle: React.CSSProperties = { fontFamily: 'monospace' };
const meterBarStyle: React.CSSProperties = {
  width: '120px', 
  height: '10px', 
  backgroundColor: '#555',
  borderRadius: '5px', 
  overflow: 'hidden',
};
const meterFillBaseStyle: React.CSSProperties = {
  height: '100%', 
  borderRadius: '5px', 
  transition: 'width 0.3s ease-in-out',
};

const otherStatStyle: React.CSSProperties = { fontSize: '0.75rem' };

// Style EXP Meter specific style
const styleExpMeterContainerStyle: React.CSSProperties = {
   ...meterContainerStyle, // Inherit base margin
   marginTop: '2px' // Add a small top margin to separate from Style Level text
}

interface PlayerStatsUIProps {
  health: number;
  hunger: number;
  attack: number;
  combo: number;
  styleLevel: number;
  styleExp: number; // Added Style EXP
  currentStyleName: string;
  MAX_VALUE: number; // Used for Health/Hunger
  MAX_STYLE_EXP: number; // Added for Style EXP max
}

const PlayerStatsUI: React.FC<PlayerStatsUIProps> = ({
  health,
  hunger,
  attack,
  combo,
  styleLevel,
  styleExp, // Destructure new prop
  currentStyleName,
  MAX_VALUE,
  MAX_STYLE_EXP // Destructure new prop
}) => {
  const healthFillStyle: React.CSSProperties = {
    ...meterFillBaseStyle,
    width: `${(health / MAX_VALUE) * 100}%`,
    backgroundColor: '#DC2626', // Red color for health
  };
  const hungerFillStyle: React.CSSProperties = {
    ...meterFillBaseStyle,
    width: `${(hunger / MAX_VALUE) * 100}%`,
    backgroundColor: '#16A34A', // Green color for hunger
  };
  const styleExpFillStyle: React.CSSProperties = {
    ...meterFillBaseStyle,
    width: `${(styleExp / MAX_STYLE_EXP) * 100}%`,
    backgroundColor: '#6366F1', // Indigo color for style exp
  };

  return (
    <div style={uiContainerStyle}>
      {/* Health Meter */}
      <div style={meterContainerStyle}>
        <div style={meterLabelValueContainerStyle}>
          <span style={meterLabelStyle}>Health:</span>
          <span style={meterValueStyle}>
            {health.toFixed(2)}/{MAX_VALUE}
          </span>
        </div>
        <div style={meterBarStyle}>
          <div style={healthFillStyle} />
        </div>
      </div>
      {/* Hunger Meter */}
      <div style={meterContainerStyle}>
        <div style={meterLabelValueContainerStyle}>
          <span style={meterLabelStyle}>Hunger:</span>
          <span style={meterValueStyle}>
            {hunger.toFixed(2)}/{MAX_VALUE}
          </span>
        </div>
        <div style={meterBarStyle}>
          <div style={hungerFillStyle} />
        </div>
      </div>
      {/* Other Stats */}
      <div style={otherStatStyle}> 
        Attack: {attack.toFixed(2)}
      </div>
      <div style={otherStatStyle}> 
        {/* Display combo with 2 decimal places */}
        Combo: {combo.toFixed(2)} 
      </div>
      <div style={otherStatStyle}> 
        Style: {currentStyleName} (Lv {styleLevel})
      </div>
      {/* Style EXP Meter */}
       <div style={styleExpMeterContainerStyle}>
        <div style={meterLabelValueContainerStyle}>
          <span style={meterLabelStyle}>EXP:</span>
          <span style={meterValueStyle}>
            {styleExp.toFixed(2)}/{MAX_STYLE_EXP}
          </span>
        </div>
        <div style={meterBarStyle}>
          <div style={styleExpFillStyle} />
        </div>
      </div>
    </div>
  );
};

export default PlayerStatsUI;

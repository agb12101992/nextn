'use client';

import React from 'react';

// Define styles needed by this component
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

interface PlayerStatsUIProps {
  health: number;
  hunger: number;
  attack: number;
  combo: number;
  styleLevel: number;
  currentStyleName: string;
  MAX_VALUE: number;
}

const PlayerStatsUI: React.FC<PlayerStatsUIProps> = ({
  health,
  hunger,
  attack,
  combo,
  styleLevel,
  currentStyleName,
  MAX_VALUE,
}) => {
  // Calculate fill styles locally based on props
  const healthFillStyle: React.CSSProperties = {
    ...meterFillBaseStyle,
    width: `${(health / MAX_VALUE) * 100}%`,
    backgroundColor: '#4CAF50',
  };
  const hungerFillStyle: React.CSSProperties = {
    ...meterFillBaseStyle,
    width: `${(hunger / MAX_VALUE) * 100}%`,
    backgroundColor: '#FFC107',
  };

  return (
    <div style={uiContainerStyle}>
      {/* Health Meter */}
      <div style={meterContainerStyle}>
        <div style={meterLabelValueContainerStyle}>
          <span style={meterLabelStyle}>Health:</span>
          <span style={meterValueStyle}>
            {health.toFixed(0)}/{MAX_VALUE}
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
            {hunger.toFixed(0)}/{MAX_VALUE}
          </span>
        </div>
        <div style={meterBarStyle}>
          <div style={hungerFillStyle} />
        </div>
      </div>
      {/* Other Stats */}
      <div style={{ fontSize: '0.9rem', marginTop: '0.5rem' }}>
        Attack: {attack.toFixed(1)}
      </div>
      <div style={{ fontSize: '0.9rem' }}>Combo: {combo}</div>
      <div style={{ fontSize: '0.9rem' }}>
        Style: {currentStyleName} (Lv {styleLevel})
      </div>
    </div>
  );
};

export default PlayerStatsUI;

'use client';

import React, { useState, useCallback, useEffect } from 'react'; 
// Import game components
import PlayerCharacter from '@/components/game/PlayerCharacter';
import PlayerStatsUI from '@/components/game/PlayerStatsUI';
import {DebugDisplay } from '@/components/game/DebugDisplay';
import SceneObjects, { SceneObjectConfig } from '@/components/game/SceneObjects'; 
import { roomStyle, gameTitleStyle } from '../../app/page.styles'; // Adjust path as needed
import FridgeMenu from '../game/FridgeMenu';
import DoorMenu from '../game/DoorMenu'; // Import DoorMenu
import StoreMenu from '../game/StoreMenu'; // Import StoreMenu
import EnemyInfoMenu from '../game/EnemyInfoMenu'; // Import EnemyInfoMenu

interface FightRoomProps {
  onGoHome: () => void;
}

const FightRoom: React.FC<FightRoomProps> = ({onGoHome}) => {
  // Add state and logic for the fight room here
const fightRoomStyle = {
    ...roomStyle,
    backgroundColor: '#F0F0F0',
  };
   const [showDebugMenu, setShowDebugMenu] = useState(false);

  const toggleDebugMenu = useCallback(() => {
    setShowDebugMenu(prev => !prev);
  }, []);
  return (
    <div style={fightRoomStyle}> 
      <h2 style={gameTitleStyle}>Fight Room</h2>
     <DebugDisplay
        showDebugMenu={showDebugMenu}
        onToggleDebug={toggleDebugMenu}
        onRestoreStats={() => {}}
        onModifyHealth={() => {}}
        onModifyHunger={() => {}}
        onModifyAttack={() => {}}
        onModifyCombo={() => {}}
        onModifyStyleLevel={() => {}}
        onModifyStyleExp={() => {}}
        onEnterFightRoom={() => {}}
        onGoHome={onGoHome} // Pass the goHome function
      />
    </div>
  );
};

export default FightRoom;
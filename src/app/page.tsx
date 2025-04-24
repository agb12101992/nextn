'use client';

import React, { useState, useCallback, useEffect } from 'react';
import BasementApartment from '@/components/game/BasementApartment';
import FightRoom from '@/components/game/FightRoom';
import SplashScreen from '@/components/game/SplashScreen'; // Import SplashScreen

export default function Home() {
  const [showSplash, setShowSplash] = useState(true);
  const handleContinue = () => { setShowSplash(false); };
  const [currentRoom, setCurrentRoom] = useState<"basement" | "fight">("basement");

   const handleEnterFightRoom = () => {
     setCurrentRoom("fight");
   };

   const handleGoHome = () => {
    setCurrentRoom("basement");
  };
  return (
    <>
      {showSplash ? (
        <SplashScreen onContinue={handleContinue} />
      ) : (
        <div>
          {currentRoom === "basement" ? (
            <BasementApartment onEnterFightRoom={handleEnterFightRoom}/>
          ) : (
            <FightRoom onGoHome={handleGoHome} />
          )}
        </div>
      )}
    </>
  );
}
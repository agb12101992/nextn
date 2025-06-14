'use client';

import React from 'react';
import GameObject from '@/components/game/GameObject';

// --- Types/Interfaces ---
export interface SceneObjectConfig {
  id: string;
  position: { left: string; top: string };
  size: { width: string; height: string };
  spriteUrl?: string;
  alt: string;
  clickHandler?: () => void;
  wrapperZIndex?: number;
  objectZIndex?: number;
  near?: boolean;
}

interface SceneObjectsProps {
  objects: SceneObjectConfig[];
}

// --- SceneObjects Component ---
const SceneObjects: React.FC<SceneObjectsProps> = ({ objects }) => {
  return (
    <>
      {objects.map((obj) => (
        <div
          key={obj.id}
          onClick={obj.clickHandler}
          data-clickable-object="true"
          style={{
            position: 'absolute',
            left: obj.position.left,
            top: obj.position.top,
            transform: 'translate(-50%, -50%)', // Center the wrapper
            cursor: 'pointer',
            zIndex: obj.wrapperZIndex || 11, // Default zIndex if not provided
            width: obj.size.width,
            height: obj.size.height,
            // border: '1px dashed yellow' // Optional debug border
          }}
        >
          <GameObject
            position={{ x: 0, y: 0 }}
            spriteUrl={obj.spriteUrl}
            size={obj.size}
            alt={obj.alt}
            zIndex={obj.objectZIndex || 10}
          />
        </div>
        
        
      ))}
    </>
  );
};

export default SceneObjects;

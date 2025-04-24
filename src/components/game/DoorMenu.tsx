import React from 'react';

interface DoorMenuProps {
  onClose: () => void;
  onStoreClick: () => void;
  onFightClick: () => void;
}

const DoorMenu: React.FC<DoorMenuProps> = ({ onClose, onStoreClick, onFightClick }) => {
  return (
    <div className="door-menu">
      <h2>Door Options</h2>
      <div className="options-container">
        <button onClick={onStoreClick}>Store</button>
        <button onClick={onFightClick}>Fight</button>
      </div>
      <button onClick={onClose}>Close</button>
      <style jsx>{`
        .door-menu {
          position: absolute;
          top: 50%;
          left: 75%; /* Position near the door */
          transform: translate(-50%, -50%); /* Center based on its own size */
          background-color: rgba(0, 0, 0, 0.8);
          padding: 0.75rem;
          border-radius: 8px;
          border: 1px solid #777;
          z-index: 190;
          display: flex;
          flex-direction: column; /* Stack title, options, close button */
          gap: 15px; /* Space between elements */
          width: 180px; /* Adjust width as needed */
          color: white;
          align-items: center; /* Center items horizontally */
        }
        .options-container {
          display: flex;
          justify-content: space-around; /* Space out buttons */
          width: 100%; /* Make container take full width */
          gap: 10px;
        }
        button {
           padding: 8px 12px; 
           font-size: 0.9rem; 
           background-color: #444; 
           color: white; 
           border: 1px solid #666; 
           border-radius: 4px; 
           cursor: pointer; 
           text-align: center;
           flex-grow: 1; /* Allow buttons to grow */
        }
        button:hover {
            background-color: #555;
        }
        h2 {
            margin: 0 0 10px 0; /* Add some space below the title */
            font-size: 1.1rem;
        }
      `}</style>
    </div>
  );
};

export default DoorMenu;

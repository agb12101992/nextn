import React from 'react';

interface FridgeSlot {
  items: string[];
}

interface FridgeMenuProps {
  inventory: FridgeSlot[];
  onClose: () => void;
}

const FridgeMenu: React.FC<FridgeMenuProps> = ({ inventory, onClose }) => {
  return (
    <div className="fridge-menu">
      <h2>Fridge Inventory</h2>
      <div className="slots-container">
        {inventory.map((slot, index) => (
          <div key={index} className="slot">
            <h3>Slot {index + 1}</h3>
            <ul>
              {slot.items.slice(0, 3).map((item, itemIndex) => (
                <li key={itemIndex}>{item}</li>
              ))}
              {slot.items.length > 3 && <li>...and more</li>}
            </ul>
          </div>
        ))}
      </div>
      <button onClick={onClose}>Close</button>
      <style jsx>{`
        .fridge-menu {
          position: absolute;
          top: 50%;
          left: 25%;
          transform: translate(-25%, -50%);
          background-color: rgba(0, 0, 0, 0.8);
          padding: 0.75rem;
          border-radius: 8px;
          border: 1px solid #777;
          z-index: 190;
          display: flex;
          flex-direction: row;
          gap: 8px;
          max-height: calc(100vh - 100px);
          overflow-x: auto;
          width: 500px;
          color: white;
        }
        .slots-container {
          display: flex;
          gap: 10px;
        }
        .slot {
          border: 1px solid #ddd;
          padding: 10px;
          width: 150px;
          min-height: 100px;
        }
        ul {
          list-style: none;
          padding: 0;
        }
      `}</style>
    </div>
  );
};

export default FridgeMenu;
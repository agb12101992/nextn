import React from 'react';

interface FridgeSlot {
  item: string | null;
  count: number;
}

interface FridgeMenuProps {
  inventory: FridgeSlot[];
  onClose: () => void;
  onItemClick: (item: string | null, index: number) => void;
}

const FridgeMenu: React.FC<FridgeMenuProps> = ({ inventory, onClose, onItemClick }) => {
  return (
    <div className="fridge-menu">
      <h2>Fridge Inventory</h2>
      <div className="slots-container">
        {inventory.map((slot, index) => (
          <button key={index} className="slot" onClick={() => onItemClick(slot.item, index)}>
            <h3>Slot {index + 1}</h3>
            {slot.item ? (
              <p>{slot.item} (x{slot.count})</p>
            ) : (
              <p>Empty</p>
            )}
          </button>
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
          width: 700px;
          color: white;
        }
        .slots-container {
          display: flex;
          gap: 10px;
        }
        .slot {
          border: 1px solid #ddd;
          padding: 10px;
          width: 120px;
          min-height: 100px;
          cursor: pointer;
          text-align: center;
        }
        ul {
          list-style: none;
          padding: 0;
        }
        p {
          margin: 5px 0;
        }
      `}</style>
    </div>
  );
};

export default FridgeMenu;
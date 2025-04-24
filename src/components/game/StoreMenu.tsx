import React from 'react';

interface StoreMenuProps {
    onClose: () => void;
    onBuyEnergyDrink: () => void;
    onBuyPizza: () => void;
    onBuyProteinShake: () => void;
    onGoBack: () => void;
}

const StoreMenu: React.FC<StoreMenuProps> = ({
    onClose,
    onBuyEnergyDrink,
    onBuyPizza,
    onBuyProteinShake,
    onGoBack,
}) => {
    return (
        <div className="store-menu">
            <h2>Store</h2>
            <div className="items-container">
                <button onClick={onBuyEnergyDrink}>Energy Drink (+20 Hunger)</button>
                <button onClick={onBuyPizza}>Pizza (+50 Hunger)</button>
                <button onClick={onBuyProteinShake}>Protein Shake (+30 Hunger)</button>
            </div>
            <button onClick={onGoBack}>Go Back</button>
            <style jsx>{`
            .store-menu {
                position: absolute;
                top: 50%;
                left: 50%;
                transform: translate(-50%, -50%);
                background-color: rgba(0, 0, 0, 0.8);
                padding: 0.75rem;
                border-radius: 8px;
                border: 1px solid #777;
                z-index: 200;
                display: flex;
                flex-direction: column;
                gap: 15px;
                width: 200px;
                color: white;
                align-items: center;
            }
            .items-container {
                display: flex;
                flex-direction: column;
                gap: 10px;
                width: 100%;
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
                width: 100%;
            }

            button:hover {
                background-color: #555;
            }

            h2 {
                margin: 0 0 10px 0;
                font-size: 1.1rem;
            }
            `}</style>
        </div>
    );
};

export default StoreMenu;
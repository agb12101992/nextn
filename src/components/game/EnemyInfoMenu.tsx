import React from 'react';

interface EnemyInfoMenuProps {
    hp: number;
    attack: number;
    combo: number;
    style: number;
    onFight: () => void;
    onGoBack: () => void;
}

const EnemyInfoMenu: React.FC<EnemyInfoMenuProps> = ({ hp, attack, combo, style, onFight, onGoBack }) => {
    return (
        <div className="enemy-info-menu">
            <h2>Enemy Info</h2>
            <p>HP: {hp}</p>
            <p>Attack: {attack}</p>
            <p>Combo: {combo}</p>
            <p>Style: {style}</p>
            <button onClick={onGoBack}>Go Back</button>
            <button onClick={onFight}>Fight!</button>
            <style jsx>{`
            .enemy-info-menu {
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
            p {
              margin: 5px 0;
            }
            `}</style>
        </div>
    );
};

export default EnemyInfoMenu;
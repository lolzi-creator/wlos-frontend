import React from 'react';
import '../../styles/components/ItemCard.css';

interface ItemCardProps {
  id: string;
  name: string;
  type: string;
  image?: string;
  rarity: 'common' | 'uncommon' | 'rare' | 'epic' | 'legendary';
  equipped?: boolean;
  acquired?: string;
  actions?: Array<{
    label: string;
    onClick: () => void;
    color: 'green' | 'yellow' | 'purple' | 'blue' | 'cyan';
  }>;
}

const ItemCard: React.FC<ItemCardProps> = ({
                                             // eslint-disable-next-line @typescript-eslint/no-unused-vars
  id: _id,
  name,
  type,
  image,
  rarity,
  equipped,
  acquired,
  actions
}) => {
  const rarityColors = {
    common: '#CCCCCC',
    uncommon: '#00FF00',
    rare: '#0088FF',
    epic: '#9945FF',
    legendary: '#FFB800'
  };

  const rarityColor = rarityColors[rarity];

  return (
    <div className="item-card">
      {equipped && (
        <div className="equipped-badge">
          EQUIPPED
        </div>
      )}
      
      <div className="item-header">
        <div className="rarity-badge" style={{ backgroundColor: rarityColor, borderColor: rarityColor }}>
          {rarity.toUpperCase()}
        </div>
      </div>
      
      <div className="item-image-container">
        {image ? (
          <img src={image} alt={name} className="item-image" />
        ) : (
          <div 
            className="item-placeholder" 
            style={{ backgroundColor: rarityColor, opacity: 0.7 }}
          />
        )}
      </div>
      
      <div className="item-details">
        <h3 className="item-name">{name}</h3>
        <p className="item-type">{type}</p>
        
        {acquired && (
          <div className="acquired-date">
            <span className="calendar-icon">📅</span> Acquired: {acquired}
          </div>
        )}
      </div>
      
      {actions && actions.length > 0 && (
        <div className="item-actions">
          {actions.map((action, index) => (
            <button
              key={index}
              onClick={action.onClick}
              className={`action-button ${action.color}`}
            >
              {action.label}
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

export default ItemCard; 
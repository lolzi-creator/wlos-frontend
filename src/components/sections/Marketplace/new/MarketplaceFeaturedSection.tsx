import React, { useRef, useEffect, useState } from 'react';
import Button from '../../../common/Button';
import '../../../../styles/modules/marketplace/new/MarketplaceFeaturedSection.css';

interface FeaturedItem {
    id: string;
    name: string;
    type: string;
    rarity: 'common' | 'rare' | 'epic' | 'legendary';
    image?: string;
    price: number;
    seller: string;
}

interface MarketplaceFeaturedSectionProps {
    onViewAll: () => void;
}

const MarketplaceFeaturedSection: React.FC<MarketplaceFeaturedSectionProps> = ({ onViewAll }) => {
    const [isVisible, setIsVisible] = useState(false);
    const sectionRef = useRef<HTMLDivElement>(null);
    
    const featuredItems: FeaturedItem[] = [
        {
            id: 'feat-1',
            name: 'Quantum Blade',
            type: 'Weapon',
            rarity: 'legendary',
            price: 25000,
            seller: 'CyberHunter',
        },
        {
            id: 'feat-2',
            name: 'Shadow Stealth Suit',
            type: 'Armor',
            rarity: 'epic',
            price: 12800,
            seller: 'NeonRaider',
        },
        {
            id: 'feat-3',
            name: 'Neural Interface',
            type: 'Enhancement',
            rarity: 'rare',
            price: 5600,
            seller: 'TechWizard',
        },
        {
            id: 'feat-4',
            name: 'Holographic Decoy',
            type: 'Gadget',
            rarity: 'epic',
            price: 8900,
            seller: 'PhantomX',
        },
    ];
    
    const getRarityColor = (rarity: string) => {
        switch (rarity) {
            case 'legendary': return 'legendary';
            case 'epic': return 'epic';
            case 'rare': return 'rare';
            default: return 'common';
        }
    };
    
    useEffect(() => {
        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    setIsVisible(true);
                    observer.disconnect();
                }
            },
            { threshold: 0.1 }
        );
        
        if (sectionRef.current) {
            observer.observe(sectionRef.current);
        }
        
        return () => {
            if (sectionRef.current) {
                observer.unobserve(sectionRef.current);
            }
        };
    }, []);
    
    return (
        <div className={`featured-section ${isVisible ? 'visible' : ''}`} ref={sectionRef}>
            <div className="section-header">
                <h2 className="section-title">Featured Items</h2>
                <p className="section-subtitle">Discover rare and exclusive items chosen by our curators</p>
            </div>
            
            <div className="featured-grid">
                {featuredItems.map((item) => (
                    <div key={item.id} className={`item-card ${getRarityColor(item.rarity)}`}>
                        <div className="item-image-container">
                            <div className={`item-rarity-indicator ${getRarityColor(item.rarity)}`} />
                            <div className="item-image">
                                <div className="placeholder-img" style={{ backgroundColor: item.rarity === 'legendary' ? '#FFB800' : 
                                    item.rarity === 'epic' ? '#9945FF' : 
                                    item.rarity === 'rare' ? '#0088FF' : '#666' }} />
                            </div>
                        </div>
                        
                        <div className="item-info">
                            <div className="item-name-container">
                                <h3 className="item-name">{item.name}</h3>
                                <p className="item-type">{item.type}</p>
                            </div>
                            
                            <div className="item-details">
                                <div className="item-price">
                                    <span className="price-label">PRICE</span>
                                    <span className="price-value">{item.price.toLocaleString()} WLO</span>
                                </div>
                                <div className="item-seller">
                                    <span className="seller-label">SELLER</span>
                                    <span className="seller-value">{item.seller}</span>
                                </div>
                            </div>
                            
                            <Button 
                                className="view-item-btn"
                                text="View Item" 
                                color="green"
                                onClick={() => {}}
                            />
                        </div>
                        
                        <div className="card-background">
                            <div className="grid-pattern"></div>
                            <div className="glow-effect"></div>
                        </div>
                    </div>
                ))}
            </div>
            
            <div className="view-all-container">
                <Button 
                    text="View All Marketplace Items" 
                    color="blue" 
                    onClick={onViewAll}
                />
            </div>
        </div>
    );
};

export default MarketplaceFeaturedSection; 
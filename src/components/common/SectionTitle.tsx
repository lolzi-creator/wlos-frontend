import React from 'react';

interface SectionTitleProps {
    title: string;
}

const SectionTitle: React.FC<SectionTitleProps> = ({ title }) => {
    return (
        <div className="section-title">
            <h3 className="title-text glow-text">{title}</h3>
            <div className="title-line">
                <div className="line-dot"></div>
            </div>
        </div>
    );
};

export default SectionTitle;
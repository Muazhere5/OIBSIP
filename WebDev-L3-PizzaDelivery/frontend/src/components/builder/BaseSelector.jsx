import React from 'react';
import './BaseSelector.css';

const BaseSelector = ({ selectedBase, setSelectedBase }) => {
    const bases = ['Thin Crust', 'Classic Hand Tossed', 'Cheese Burst', 'Pan Pizza', 'Gluten Free'];

    return (
        <div className="selector-container">
            <h3 className="selector-title">1. Choose Your Base</h3>
            <div className="options-grid">
                {bases.map(base => (
                    <div 
                        key={base}
                        className={`option-card ${selectedBase === base ? 'selected' : ''}`}
                        onClick={() => setSelectedBase(base)}
                    >
                        {base}
                    </div>
                ))}
            </div>
        </div>
    );
};

export default BaseSelector;

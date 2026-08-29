import React from 'react';
import './SauceSelector.css';

const SauceSelector = ({ selectedSauce, setSelectedSauce }) => {
    const sauces = ['Classic Tomato', 'Spicy Arrabiata', 'Garlic Parmesan', 'Pesto', 'BBQ'];

    return (
        <div className="selector-container">
            <h3 className="selector-title">2. Choose Your Sauce</h3>
            <div className="options-grid">
                {sauces.map(sauce => (
                    <div 
                        key={sauce}
                        className={`option-card ${selectedSauce === sauce ? 'selected' : ''}`}
                        onClick={() => setSelectedSauce(sauce)}
                    >
                        {sauce}
                    </div>
                ))}
            </div>
        </div>
    );
};

export default SauceSelector;

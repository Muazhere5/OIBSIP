import React from 'react';
import './CheeseSelector.css';

const CheeseSelector = ({ selectedCheese, setSelectedCheese }) => {
    const cheeses = ['Mozzarella', 'Cheddar', 'Vegan Cheese', 'No Cheese'];

    return (
        <div className="selector-container">
            <h3 className="selector-title">3. Choose Your Cheese</h3>
            <div className="options-grid">
                {cheeses.map(cheese => (
                    <div 
                        key={cheese}
                        className={`option-card ${selectedCheese === cheese ? 'selected' : ''}`}
                        onClick={() => setSelectedCheese(cheese)}
                    >
                        {cheese}
                    </div>
                ))}
            </div>
        </div>
    );
};

export default CheeseSelector;

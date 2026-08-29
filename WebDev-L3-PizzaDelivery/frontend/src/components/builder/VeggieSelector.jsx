import React from 'react';
import './VeggieSelector.css';

const VeggieSelector = ({ selectedVeggies, setSelectedVeggies }) => {
    const veggies = ['Onions', 'Tomatoes', 'Capsicum', 'Mushrooms', 'Olives', 'Jalapenos'];

    const toggleVeggie = (veggie) => {
        if (selectedVeggies.includes(veggie)) {
            setSelectedVeggies(selectedVeggies.filter(v => v !== veggie));
        } else {
            setSelectedVeggies([...selectedVeggies, veggie]);
        }
    };

    return (
        <div className="selector-container">
            <h3 className="selector-title">4. Choose Your Veggies</h3>
            <div className="options-grid">
                {veggies.map(veggie => (
                    <div 
                        key={veggie}
                        className={`option-card ${selectedVeggies.includes(veggie) ? 'selected' : ''}`}
                        onClick={() => toggleVeggie(veggie)}
                    >
                        {veggie}
                    </div>
                ))}
            </div>
        </div>
    );
};

export default VeggieSelector;

import React, { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import BaseSelector from '../components/builder/BaseSelector';
import SauceSelector from '../components/builder/SauceSelector';
import CheeseSelector from '../components/builder/CheeseSelector';
import VeggieSelector from '../components/builder/VeggieSelector';
import { OrderContext } from '../context/OrderContext';
import './PizzaBuilder.css';

const PizzaBuilder = () => {
    const [selectedBase, setSelectedBase] = useState('Thin Crust');
    const [selectedSauce, setSelectedSauce] = useState('Classic Tomato');
    const [selectedCheese, setSelectedCheese] = useState('Mozzarella');
    const [selectedVeggies, setSelectedVeggies] = useState([]);
    
    const { setOrderData } = useContext(OrderContext);
    const navigate = useNavigate();

    const basePrices = {
        'Thin Crust': 10,
        'Classic Hand Tossed': 12,
        'Cheese Burst': 15,
        'Pan Pizza': 14,
        'Gluten Free': 16
    };

    const calculateTotal = () => {
        let total = basePrices[selectedBase] || 10;
        total += 2;
        total += selectedCheese !== 'No Cheese' ? 3 : 0;
        total += selectedVeggies.length * 1.5;
        return total.toFixed(2);
    };

    const handleCheckout = () => {
        setOrderData({
            base: selectedBase,
            sauce: selectedSauce,
            cheese: selectedCheese,
            veggies: selectedVeggies,
            total: calculateTotal()
        });
        navigate('/checkout');
    };

    return (
        <div className="builder-container">
            <div className="builder-content">
                <h1 className="builder-header">Build Your Masterpiece</h1>
                
                <BaseSelector selectedBase={selectedBase} setSelectedBase={setSelectedBase} />
                <SauceSelector selectedSauce={selectedSauce} setSelectedSauce={setSelectedSauce} />
                <CheeseSelector selectedCheese={selectedCheese} setSelectedCheese={setSelectedCheese} />
                <VeggieSelector selectedVeggies={selectedVeggies} setSelectedVeggies={setSelectedVeggies} />

                <div className="checkout-section">
                    <h2 className="total-price">Total: ${calculateTotal()}</h2>
                    <button className="checkout-btn" onClick={handleCheckout}>Proceed to Checkout</button>
                </div>
            </div>
        </div>
    );
};

export default PizzaBuilder;

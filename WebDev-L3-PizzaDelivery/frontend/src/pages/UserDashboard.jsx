import React, { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { OrderContext } from '../context/OrderContext';
import './UserDashboard.css';

const UserDashboard = () => {
    const navigate = useNavigate();
    const { setOrderData } = useContext(OrderContext);

    const presetPizzas = [
        {
            id: 1,
            name: 'Margherita Classic',
            description: 'Simple and elegant. Classic tomato sauce with fresh mozzarella.',
            price: 15,
            image: '🍕',
            base: 'Thin Crust',
            sauce: 'Classic Tomato',
            cheese: 'Mozzarella',
            veggies: []
        },
        {
            id: 2,
            name: 'Pepperoni Power',
            description: 'Loaded with premium pepperoni and extra cheese.',
            price: 18,
            image: '🍕',
            base: 'Classic Hand Tossed',
            sauce: 'Classic Tomato',
            cheese: 'Extra Cheese',
            veggies: []
        },
        {
            id: 3,
            name: 'Veggie Supreme',
            description: 'A garden delight with olives, onions, bell peppers, and mushrooms.',
            price: 17,
            image: '🥗',
            base: 'Cheese Burst',
            sauce: 'Classic Tomato',
            cheese: 'Mozzarella',
            veggies: ['Olives', 'Onions', 'Bell Peppers', 'Mushrooms']
        }
    ];

    const handleOrderPreset = (pizza) => {
        setOrderData({
            base: pizza.base,
            sauce: pizza.sauce,
            cheese: pizza.cheese,
            veggies: pizza.veggies,
            total: pizza.price
        });
        navigate('/checkout');
    };

    return (
        <div className="dashboard-container">
            <div className="cta-banner" onClick={() => navigate('/builder')}>
                <h2>Want something unique? Try our Custom Pizza Builder!</h2>
                <button className="cta-btn">Build Now ➔</button>
            </div>

            <h1 className="menu-title">Signature Pizzas</h1>
            
            <div className="pizza-menu-grid">
                {presetPizzas.map(pizza => (
                    <div key={pizza.id} className="pizza-card">
                        <div className="pizza-image-placeholder">
                            {pizza.image}
                        </div>
                        <div className="pizza-info">
                            <h3>{pizza.name}</h3>
                            <p>{pizza.description}</p>
                            <div className="pizza-footer">
                                <span className="pizza-price">${pizza.price}</span>
                                <button className="order-preset-btn" onClick={() => handleOrderPreset(pizza)}>Order Now</button>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default UserDashboard;

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
            image: 'https://images.unsplash.com/photo-1513104890138-7c749659a591?w=500&q=80',
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
            image: 'https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?w=500&q=80',
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
            image: 'https://images.unsplash.com/photo-1604382354936-07c5d9983bd3?w=500&q=80',
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
                        <div className="pizza-image-placeholder" style={{ padding: 0, height: '200px', overflow: 'hidden' }}>
                            <img src={pizza.image} alt={pizza.name} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
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

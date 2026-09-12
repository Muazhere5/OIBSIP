import React, { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { OrderContext } from '../context/OrderContext';
import './Cart.css';

const Cart = () => {
    const { cart, clearCart } = useContext(OrderContext);
    const navigate = useNavigate();

    const total = cart.reduce((sum, item) => sum + parseFloat(item.total), 0).toFixed(2);

    return (
        <div className="cart-container parallax-bg">
            <div className="cart-card glassmorphism-card">
                <h1 className="high-contrast-text">Your Pizza Cart ??</h1>
                {cart.length === 0 ? (
                    <div className="empty-cart">
                        <h2>Your cart is empty!</h2>
                        <button className="nav-btn btn-signup" onClick={() => navigate('/dashboard')}>Browse Menu</button>
                    </div>
                ) : (
                    <div className="cart-items">
                        {cart.map((item, index) => (
                            <div key={index} className="cart-item">
                                <h3>{item.name}</h3>
                                <p>{item.base} | {item.sauce} | {item.cheese}</p>
                                <p></p>
                            </div>
                        ))}
                        <div className="cart-total">
                            <h2>Total: </h2>
                        </div>
                        <div className="cart-actions">
                            <button className="nav-btn btn-login" onClick={clearCart}>Clear Cart</button>
                            <button className="nav-btn btn-signup" onClick={() => navigate('/checkout')}>Checkout</button>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default Cart;

import React, { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { OrderContext } from '../context/OrderContext';
import RazorpayButton from '../components/order/RazorpayButton';
import './Checkout.css';

const Checkout = () => {
    const { orderData } = useContext(OrderContext);
    const navigate = useNavigate();

    if (!orderData) {
        return (
            <div className="checkout-empty-container">
                <div className="checkout-empty-card">
                    <h2>No Pizza in the Oven!</h2>
                    <p>It looks like you haven't built your pizza yet.</p>
                    <button className="back-btn" onClick={() => navigate('/builder')}>
                        Back to Builder
                    </button>
                </div>
            </div>
        );
    }

    return (
        <div className="checkout-container">
            <div className="checkout-card">
                <h2 className="checkout-title">Order Summary</h2>
                
                <div className="order-details">
                    <div className="detail-row">
                        <span className="detail-label">Base:</span>
                        <span className="detail-value">{orderData.base}</span>
                    </div>
                    <div className="detail-row">
                        <span className="detail-label">Sauce:</span>
                        <span className="detail-value">{orderData.sauce}</span>
                    </div>
                    <div className="detail-row">
                        <span className="detail-label">Cheese:</span>
                        <span className="detail-value">{orderData.cheese}</span>
                    </div>
                    <div className="detail-row veggies-row">
                        <span className="detail-label">Veggies:</span>
                        <div className="veggies-list">
                            {orderData.veggies.length > 0 
                                ? orderData.veggies.map((veg, idx) => <span key={idx} className="veg-tag">{veg}</span>)
                                : <span className="detail-value">None</span>
                            }
                        </div>
                    </div>
                </div>

                <div className="checkout-total">
                    <h3>Total to Pay:</h3>
                    <h3 className="total-amount">${orderData.total}</h3>
                </div>

                <RazorpayButton />
            </div>
        </div>
    );
};

export default Checkout;

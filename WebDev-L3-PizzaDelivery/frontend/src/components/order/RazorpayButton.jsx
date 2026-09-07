import React, { useState, useContext } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { OrderContext } from '../../context/OrderContext';
import { AuthContext } from '../../context/AuthContext';
import './RazorpayButton.css';

const RazorpayButton = () => {
    const { orderData, setOrderData } = useContext(OrderContext);
    const { user } = useContext(AuthContext);
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const handlePayment = async () => {
        if (!user) {
            navigate('/login');
            return;
        }
        setLoading(true);
        try {
            const { data: order } = await axios.post(`${import.meta.env.VITE_API_URL}/api/orders/create`, { total: orderData.total });
            
            const options = {
                key: import.meta.env.VITE_RAZORPAY_KEY_ID,
                amount: order.amount,
                currency: 'USD',
                name: 'Pizza Delivery',
                description: 'Pizza Order Payment',
                order_id: order.id,
                handler: async function (response) {
                    try {
                        await axios.post(`${import.meta.env.VITE_API_URL}/api/orders/verify`, {
                            ...response,
                            orderData,
                            userId: user._id
                        });
                        setOrderData(null);
                        navigate('/live-tracker');
                    } catch (error) {
                        console.error('Payment verification failed', error);
                        setLoading(false);
                    }
                },
                prefill: {
                    name: user.name,
                    email: user.email,
                },
                theme: {
                    color: '#FF4500'
                }
            };
            const rzp = new window.Razorpay(options);
            rzp.on('payment.failed', function () {
                setLoading(false);
            });
            rzp.open();
        } catch (error) {
            console.error('Order creation failed', error);
            setLoading(false);
        }
    };

    return (
        <button 
            className={`razorpay-btn ${loading ? 'loading' : ''}`} 
            onClick={handlePayment} 
            disabled={loading}
        >
            {loading ? <div className="spinner"></div> : 'Pay Now'}
        </button>
    );
};

export default RazorpayButton;

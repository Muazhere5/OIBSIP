import React, { useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { OrderContext } from '../context/OrderContext';
import { AuthContext } from '../context/AuthContext';
import axios from '../utils/api';
import toast from 'react-hot-toast';
import './Checkout.css';

const Checkout = () => {
    const { cart, clearCart } = useContext(OrderContext);
    const { user } = useContext(AuthContext);
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);
    const [paid, setPaid] = useState(false);
    const [formData, setFormData] = useState({ name: user?.name || '', address: '', phone: '', altPhone: '' });

    const total = cart.reduce((sum, item) => sum + parseFloat(item.total), 0).toFixed(2);

    if (cart.length === 0) {
        return (
            <div className="checkout-empty-container">
                <div className="checkout-empty-card">
                    <h2>Your Cart is Empty!</h2>
                    <p>Add some pizzas to proceed.</p>
                    <button className="back-btn" onClick={() => navigate('/dashboard')}>Browse Menu</button>
                </div>
            </div>
        );
    }

    const handleChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

    const handlePayment = async () => {
        if (!formData.name || !formData.address || !formData.phone || !formData.altPhone) {
            toast.error('Please fill all required fields');
            return;
        }
        if (!user) {
            navigate('/login');
            return;
        }
        setLoading(true);
        try {
            const { data: order } = await axios.post(${import.meta.env.VITE_API_URL}/api/orders/create, { total });
            const options = {
                key: import.meta.env.VITE_RAZORPAY_KEY_ID,
                amount: order.amount,
                currency: 'USD',
                name: 'PIZZARELIA',
                description: 'Pizza Order Payment',
                order_id: order.id,
                handler: async function (response) {
                    try {
                        await axios.post(${import.meta.env.VITE_API_URL}/api/orders/verify, {
                            ...response,
                            orderData: cart,
                            userId: user._id,
                            customerDetails: formData
                        });
                        setPaid(true);
                        setLoading(false);
                        toast.success('Payment Successful! Order Placed.');
                        setTimeout(() => {
                            clearCart();
                            navigate('/live-tracker');
                        }, 2000);
                    } catch (error) {
                        toast.error('Payment verification failed');
                        setLoading(false);
                    }
                },
                prefill: { name: formData.name, email: user.email, contact: formData.phone },
                theme: { color: '#FF4500' }
            };
            const rzp = new window.Razorpay(options);
            rzp.on('payment.failed', function () {
                toast.error('Payment Failed');
                setLoading(false);
            });
            rzp.open();
        } catch (error) {
            toast.error('Order creation failed');
            setLoading(false);
        }
    };

    return (
        <div className="checkout-container">
            <div className="checkout-card">
                <h2 className="checkout-title">Checkout</h2>
                <div className="checkout-form">
                    <input type="text" name="name" placeholder="Full Name" value={formData.name} onChange={handleChange} required />
                    <input type="text" name="address" placeholder="Delivery Address" value={formData.address} onChange={handleChange} required />
                    <input type="text" name="phone" placeholder="Phone Number" value={formData.phone} onChange={handleChange} required />
                    <input type="text" name="altPhone" placeholder="Alternative Phone Number" value={formData.altPhone} onChange={handleChange} required />
                </div>
                <div className="checkout-total">
                    <h3>Total to Pay:</h3>
                    <h3 className="total-amount"></h3>
                </div>
                <button className={"pay-btn  "} onClick={handlePayment} disabled={loading || paid}>
                    {paid ? 'PAID' : loading ? 'Processing...' : 'Pay Now'}
                </button>
            </div>
        </div>
    );
};

export default Checkout;

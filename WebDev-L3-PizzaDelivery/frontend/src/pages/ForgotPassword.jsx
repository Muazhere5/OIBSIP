import React, { useState } from 'react';
import axios from 'axios';
import './ForgotPassword.css';

const ForgotPassword = () => {
    const [email, setEmail] = useState('');
    const [message, setMessage] = useState('');
    const [error, setError] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await axios.post(`${import.meta.env.VITE_API_URL}/api/users/forgotpassword`, { email });
            setMessage('Password reset link sent to your email.');
            setError('');
        } catch (err) {
            setError(err.response?.data?.message || 'Error sending email');
            setMessage('');
        }
    };

    return (
        <div className="forgot-container">
            <div className="forgot-card">
                <h2>Forgot Password</h2>
                <p>Enter your email to receive a reset link.</p>
                {message && <div className="success-msg">{message}</div>}
                {error && <div className="error-msg">{error}</div>}
                <form onSubmit={handleSubmit}>
                    <input 
                        type="email" 
                        placeholder="Email Address" 
                        value={email} 
                        onChange={(e) => setEmail(e.target.value)} 
                        required 
                    />
                    <button type="submit" className="forgot-btn">Send Reset Link</button>
                </form>
            </div>
        </div>
    );
};

export default ForgotPassword;

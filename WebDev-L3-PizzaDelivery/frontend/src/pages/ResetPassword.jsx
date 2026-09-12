import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from '../utils/api';
import './ResetPassword.css';

const ResetPassword = () => {
    const [password, setPassword] = useState('');
    const [message, setMessage] = useState('');
    const [error, setError] = useState('');
    const { token } = useParams();
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await axios.post(`/api/users/resetpassword/${token}`, { password });
            setMessage('Password reset successfully. Redirecting to login...');
            setTimeout(() => navigate('/login'), 3000);
        } catch (err) {
            setError(err.response?.data?.message || 'Error resetting password');
        }
    };

    return (
        <div className="reset-container">
            <div className="reset-card">
                <h2>Reset Password</h2>
                {message && <div className="success-msg">{message}</div>}
                {error && <div className="error-msg">{error}</div>}
                <form onSubmit={handleSubmit}>
                    <input 
                        type="password" 
                        placeholder="New Password" 
                        value={password} 
                        onChange={(e) => setPassword(e.target.value)} 
                        required 
                    />
                    <button type="submit" className="reset-btn">Reset Password</button>
                </form>
            </div>
        </div>
    );
};

export default ResetPassword;

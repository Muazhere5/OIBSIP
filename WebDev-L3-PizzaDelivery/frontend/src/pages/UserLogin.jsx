import React, { useState, useContext } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import './UserLogin.css';

const UserLogin = () => {
    const [formData, setFormData] = useState({
        email: '',
        password: ''
    });
    const [errorMsg, setErrorMsg] = useState('');
    const navigate = useNavigate();
    const { login } = useContext(AuthContext);

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setErrorMsg('');
        try {
            const response = await axios.post('http://localhost:5000/api/users/login', formData);
            login(response.data);
            navigate('/dashboard');
        } catch (error) {
            setErrorMsg(error.response?.data?.message || 'Login failed');
        }
    };

    return (
        <div className="login-container">
            <div className="login-card">
                <h2 className="login-title">Slice into your Account</h2>
                {errorMsg && <p className="error-message" style={{ color: 'yellow', textAlign: 'center' }}>{errorMsg}</p>}
                <form onSubmit={handleSubmit} className="login-form">
                    <input
                        type="email"
                        name="email"
                        placeholder="Email Address"
                        value={formData.email}
                        onChange={handleChange}
                        required
                    />
                    <input
                        type="password"
                        name="password"
                        placeholder="Password"
                        value={formData.password}
                        onChange={handleChange}
                        required
                    />
                    <button type="submit" className="login-button">Login</button>
                </form>
                <div style={{ textAlign: 'center', marginTop: '15px' }}>
                    <a href="/forgot-password" style={{ color: '#fff', fontSize: '14px', textDecoration: 'underline' }}>Forgot Password?</a>
                </div>
            </div>
        </div>
    );
};

export default UserLogin;

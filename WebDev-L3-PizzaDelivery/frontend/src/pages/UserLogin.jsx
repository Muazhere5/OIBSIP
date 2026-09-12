import React, { useState, useContext } from 'react';
import axios from '../utils/api';
import { useNavigate, Link } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import { GoogleLogin } from '@react-oauth/google';
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
            const response = await axios.post(`${import.meta.env.VITE_API_URL}/api/users/login`, formData);
            login(response.data);
            navigate('/dashboard');
        } catch (error) {
            setErrorMsg(error.response?.data?.message || 'Login failed');
        }
    };

    const handleGoogleSuccess = async (credentialResponse) => {
        try {
            const response = await axios.post(`${import.meta.env.VITE_API_URL}/api/users/google`, {
                token: credentialResponse.credential
            });
            login(response.data);
            navigate('/dashboard');
        } catch (error) {
            setErrorMsg(error.response?.data?.message || 'Google Login failed');
        }
    };

    return (
        <div className="login-container parallax-bg">
            <div className="login-card glassmorphism-card">
                <h2 className="login-title high-contrast-text">Slice into your Account</h2>
                {errorMsg && <p className="error-message" style={{ color: '#ff4444', textAlign: 'center', fontWeight: 'bold' }}>{errorMsg}</p>}
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
                
                <div style={{ marginTop: '20px', display: 'flex', justifyContent: 'center' }}>
                    <GoogleLogin 
                        onSuccess={handleGoogleSuccess} 
                        onError={() => setErrorMsg('Google Login Failed')}
                    />
                </div>

                <div style={{ textAlign: 'center', marginTop: '15px' }}>
                    <Link to="/forgot-password" style={{ color: '#ffffff', fontSize: '14px', textDecoration: 'underline' }}>Forgot Password?</Link>
                    <br/><br/>
                    <Link to="/register" style={{ color: '#ffccbc', fontSize: '15px', fontWeight: 'bold', textDecoration: 'none' }}>Not registered yet? Sign Up</Link>
                </div>
            </div>
        </div>
    );
};

export default UserLogin;

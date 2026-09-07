import React, { useState, useContext } from 'react';
import axios from 'axios';
import { useNavigate, Link } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import { GoogleLogin } from '@react-oauth/google';
import './UserRegister.css';

const UserRegister = () => {
    const [formData, setFormData] = useState({
        name: '',
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
            await axios.post(`${import.meta.env.VITE_API_URL}/api/users/register`, formData);
            navigate('/login');
        } catch (error) {
            setErrorMsg(error.response?.data?.message || 'Registration failed');
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
        <div className="register-container parallax-bg">
            <div className="register-card glassmorphism-card">
                <h2 className="register-title high-contrast-text">Bake Your Account</h2>
                {errorMsg && <p className="error-message" style={{ color: '#ff4444', textAlign: 'center', fontWeight: 'bold' }}>{errorMsg}</p>}
                <form onSubmit={handleSubmit} className="register-form">
                    <input
                        type="text"
                        name="name"
                        placeholder="Full Name"
                        value={formData.name}
                        onChange={handleChange}
                        required
                    />
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
                    <button type="submit" className="register-button">Register</button>
                </form>

                <div style={{ marginTop: '20px', display: 'flex', justifyContent: 'center' }}>
                    <GoogleLogin 
                        onSuccess={handleGoogleSuccess} 
                        onError={() => setErrorMsg('Google Login Failed')}
                    />
                </div>

                <div style={{ textAlign: 'center', marginTop: '20px' }}>
                    <Link to="/login" style={{ color: '#ffccbc', fontSize: '15px', fontWeight: 'bold', textDecoration: 'none' }}>Already have an account? Log In</Link>
                </div>
            </div>
        </div>
    );
};

export default UserRegister;

import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './UserRegister.css';

const UserRegister = () => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: ''
    });
    const [errorMsg, setErrorMsg] = useState('');
    const navigate = useNavigate();

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

    return (
        <div className="register-container">
            <div className="register-card">
                <h2 className="register-title">Bake Your Account</h2>
                {errorMsg && <p className="error-message" style={{ color: 'yellow', textAlign: 'center' }}>{errorMsg}</p>}
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
            </div>
        </div>
    );
};

export default UserRegister;

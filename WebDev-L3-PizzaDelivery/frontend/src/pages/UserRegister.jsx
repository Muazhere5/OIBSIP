import React, { useState } from 'react';
import './UserRegister.css';

const UserRegister = () => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: ''
    });

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log('Register attempt:', formData);
    };

    return (
        <div className="register-container">
            <div className="register-card">
                <h2 className="register-title">Bake Your Account</h2>
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

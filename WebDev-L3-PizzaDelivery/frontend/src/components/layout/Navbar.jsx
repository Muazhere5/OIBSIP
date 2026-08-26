import React from 'react';
import './Navbar.css';

const Navbar = () => {
    return (
        <nav className="navbar">
            <div className="navbar-brand">
                Pizza Delivery
            </div>
            <ul className="navbar-links">
                <li>Home</li>
                <li>Menu</li>
                <li>Login</li>
            </ul>
        </nav>
    );
};

export default Navbar;

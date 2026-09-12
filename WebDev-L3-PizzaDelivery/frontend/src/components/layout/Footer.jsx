import React from 'react';
import { Link } from 'react-router-dom';
import './Footer.css';

const Footer = () => {
    return (
        <footer className="footer">
            <div className="footer-top">
                <div className="footer-col">
                    <h3>About Pizzarelia</h3>
                    <p>Crafting the perfect slice with authentic ingredients, passion, and a touch of magic. Your ultimate pizza destination.</p>
                </div>
                <div className="footer-col">
                    <h3>Quick Links</h3>
                    <Link to="/" className="footer-link">Home</Link>
                    <Link to="/dashboard" className="footer-link">Menu</Link>
                    <Link to="/builder" className="footer-link">Pizza Builder</Link>
                </div>
                <div className="footer-col">
                    <h3>Contact Info</h3>
                    <p>?? 123 Pizza Street, Food City</p>
                    <p>?? +1 (555) 123-4567</p>
                    <p>?? hello@pizzarelia.com</p>
                </div>
            </div>
            <div className="footer-bottom">
                <h2 className="footer-tagline">FRESHLY BAKED BY PIZZARELIA</h2>
            </div>
        </footer>
    );
};

export default Footer;

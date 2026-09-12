import React from 'react';
import { Link } from 'react-router-dom';
import './Footer.css';

const Footer = () => {
    return (
        <footer className="footer">
            <div className="footer-content">
                <p>Freshly baked by Oasis Infobyte Intern</p>
                <div className="footer-links">
                    <Link to="/" className="footer-link">Privacy Policy</Link>
                    <Link to="/" className="footer-link">Terms of Service</Link>
                    <Link to="/" className="footer-link">Contact Us</Link>
                </div>
            </div>
        </footer>
    );
};

export default Footer;

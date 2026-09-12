import React from 'react';
import { Link } from 'react-router-dom';
import './NotFound.css';

const NotFound = () => {
    return (
        <div className="notfound-container parallax-bg">
            <div className="notfound-card glassmorphism-card">
                <div className="dropped-pizza">??</div>
                <h1 className="error-code">404</h1>
                <h2 className="error-title">Oops! Someone dropped the pizza...</h2>
                <p className="error-desc">The page you are looking for has vanished into thin air, just like the last slice.</p>
                <Link to="/" className="return-btn">Return to Kitchen</Link>
            </div>
        </div>
    );
};

export default NotFound;

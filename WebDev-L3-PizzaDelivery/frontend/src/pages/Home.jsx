import React from 'react';
import { Link } from 'react-router-dom';
import './Home.css';

const Home = () => {
    return (
        <div className="home-container">
            <h1 className="home-title">Hot, Fresh, and Delivered Fast</h1>
            <p className="home-subtitle">Experience the ultimate pizza builder.</p>
            <Link to="/builder" className="cta-button">Build Your Pizza</Link>
        </div>
    );
};

export default Home;

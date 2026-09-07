import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import './Home.css';

const Home = () => {
    const [currentAdIndex, setCurrentAdIndex] = useState(0);
    const [ads, setAds] = useState([
        "50% Off Weekend Special!",
        "Try our New Cheese Burst crust!",
        "Fastest Delivery in Town - Guaranteed!"
    ]);

    useEffect(() => {
        const fetchAds = async () => {
            try {
                const res = await axios.get(`${import.meta.env.VITE_API_URL}/api/admin/settings`);
                if (res.data && res.data.slidingAds && res.data.slidingAds.length > 0) {
                    setAds(res.data.slidingAds);
                }
            } catch (error) {
                console.error(error);
            }
        };
        fetchAds();
    }, []);

    useEffect(() => {
        if (ads.length === 0) return;
        const interval = setInterval(() => {
            setCurrentAdIndex((prevIndex) => (prevIndex + 1) % ads.length);
        }, 3000);
        return () => clearInterval(interval);
    }, [ads.length]);

    return (
        <div className="home-container">
            <h1 className="home-title">Hot, Fresh, and Delivered Fast</h1>
            <p className="home-subtitle">Experience the ultimate pizza builder.</p>
            <Link to="/builder" className="cta-button">Build Your Pizza</Link>

            <div className="ads-carousel">
                {ads.map((ad, index) => (
                    <div 
                        key={index} 
                        className={`ads-slide ${index === currentAdIndex ? 'active' : ''}`}
                    >
                        {ad}
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Home;

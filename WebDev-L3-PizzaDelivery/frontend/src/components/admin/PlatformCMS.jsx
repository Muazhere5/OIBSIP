import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './PlatformCMS.css';

const PlatformCMS = () => {
    const [slidingAds, setSlidingAds] = useState([]);
    const [newAd, setNewAd] = useState('');

    useEffect(() => {
        const fetchSettings = async () => {
            try {
                const res = await axios.get(`${import.meta.env.VITE_API_URL}/api/admin/settings`);
                if (res.data && res.data.slidingAds) {
                    setSlidingAds(res.data.slidingAds);
                }
            } catch (error) {
                console.error(error);
            }
        };
        fetchSettings();
    }, []);

    const handleAddAd = () => {
        if (newAd.trim()) {
            setSlidingAds([...slidingAds, newAd.trim()]);
            setNewAd('');
        }
    };

    const handleRemoveAd = (index) => {
        const updated = slidingAds.filter((_, i) => i !== index);
        setSlidingAds(updated);
    };

    const handleSave = async () => {
        try {
            const token = localStorage.getItem('adminToken');
            await axios.put(`${import.meta.env.VITE_API_URL}/api/admin/settings`, { slidingAds }, {
                headers: { Authorization: `Bearer ${token}` }
            });
            alert('Settings saved successfully!');
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <div className="cms-container">
            <h3>Platform CMS</h3>
            <div className="cms-section">
                <h4>Sliding Advertisements</h4>
                <ul className="ad-list">
                    {slidingAds.map((ad, index) => (
                        <li key={index}>
                            <span>{ad}</span>
                            <button onClick={() => handleRemoveAd(index)} className="remove-btn">X</button>
                        </li>
                    ))}
                </ul>
                <div className="add-ad-controls">
                    <input 
                        type="text" 
                        value={newAd} 
                        onChange={(e) => setNewAd(e.target.value)} 
                        placeholder="New Advertisement Text..."
                    />
                    <button onClick={handleAddAd} className="add-btn">Add</button>
                </div>
            </div>
            <button onClick={handleSave} className="save-settings-btn">Save Changes</button>
        </div>
    );
};

export default PlatformCMS;

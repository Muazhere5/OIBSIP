import React from 'react';
import { Link } from 'react-router-dom';

const NotFound = () => {
    return (
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', minHeight: '80vh', textAlign: 'center', color: '#fff' }}>
            <h1 style={{ fontSize: '100px', margin: 0, textShadow: '2px 2px 10px rgba(0,0,0,0.5)' }}>404</h1>
            <h2 style={{ fontSize: '30px', margin: '20px 0' }}>Oops! You dropped the pizza!</h2>
            <p style={{ fontSize: '18px', maxWidth: '500px', marginBottom: '30px' }}>The page you are looking for has vanished into thin air, just like the last slice.</p>
            <Link to='/' style={{ padding: '15px 30px', backgroundColor: '#ff4444', color: '#fff', textDecoration: 'none', borderRadius: '50px', fontSize: '18px', fontWeight: 'bold', boxShadow: '0 4px 15px rgba(255, 68, 68, 0.4)' }}>Return Home</Link>
        </div>
    );
};

export default NotFound;

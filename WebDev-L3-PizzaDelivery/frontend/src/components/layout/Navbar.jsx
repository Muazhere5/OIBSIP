import React, { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../../context/AuthContext';
import './Navbar.css';

const Navbar = () => {
    const { user, logout } = useContext(AuthContext);
    const navigate = useNavigate();

    const handleProtectedNavigation = (path) => {
        if (!user) {
            navigate('/login');
        } else {
            navigate(path);
        }
    };

    const handleLogout = () => {
        logout();
        navigate('/login');
    };

    return (
        <nav className="navbar">
            <div className="navbar-brand" onClick={() => navigate('/')}>
                ?? PIZZARELIA
            </div>
            <ul className="navbar-links">
                <li onClick={() => handleProtectedNavigation('/')}>Home</li>
                <li onClick={() => handleProtectedNavigation('/dashboard')}>Menu</li>
                <li onClick={() => handleProtectedNavigation('/cart')}>Cart 🛒</li>
                {!user ? (
                    <div className="nav-auth-buttons">
                        <button className="nav-btn btn-login" onClick={() => navigate('/login')}>Login</button>
                        <button className="nav-btn btn-signup" onClick={() => navigate('/register')}>Sign Up</button>
                    </div>
                ) : (
                    <div className="nav-auth-buttons">
                        <button className="nav-btn btn-logout" onClick={handleLogout}>Logout</button>
                    </div>
                )}
            </ul>
        </nav>
    );
};

export default Navbar;

import React from 'react';
import './PageLoader.css';

const PageLoader = () => {
    return (
        <div className="page-loader-overlay">
            <div className="pizza-spinner-container">
                <div className="pizza-spinner">??</div>
                <h2 className="loader-text">Baking...</h2>
            </div>
        </div>
    );
};

export default PageLoader;

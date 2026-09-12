import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import PageLoader from './PageLoader';

const RouteLoader = ({ children }) => {
    const [loading, setLoading] = useState(false);
    const location = useLocation();

    useEffect(() => {
        setLoading(true);
        const timer = setTimeout(() => setLoading(false), 800);
        return () => clearTimeout(timer);
    }, [location]);

    return (
        <>
            {loading && <PageLoader />}
            {children}
        </>
    );
};

export default RouteLoader;

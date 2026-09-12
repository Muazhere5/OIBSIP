import React, { createContext, useState, useEffect } from 'react';

export const OrderContext = createContext();

export const OrderProvider = ({ children }) => {
    const [orderData, setOrderData] = useState(() => {
        const storedOrder = localStorage.getItem('orderData');
        return storedOrder ? JSON.parse(storedOrder) : null;
    });

    useEffect(() => {
        if (orderData) {
            localStorage.setItem('orderData', JSON.stringify(orderData));
        } else {
            localStorage.removeItem('orderData');
        }
    }, [orderData]);

    return (
        <OrderContext.Provider value={{ orderData, setOrderData }}>
            {children}
        </OrderContext.Provider>
    );
};

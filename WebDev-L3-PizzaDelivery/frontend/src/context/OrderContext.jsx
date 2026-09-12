import React, { createContext, useState, useEffect } from 'react';
import toast from 'react-hot-toast';

export const OrderContext = createContext();

export const OrderProvider = ({ children }) => {
    const [cart, setCart] = useState(() => {
        try {
            const storedCart = localStorage.getItem('cart');
            return storedCart ? JSON.parse(storedCart) : [];
        } catch (e) {
            return [];
        }
    });

    useEffect(() => {
        localStorage.setItem('cart', JSON.stringify(cart));
    }, [cart]);

    const addToCart = (pizza) => {
        setCart([...cart, pizza]);
        toast.success('Pizza added to cart!', { icon: '??' });
    };

    const clearCart = () => {
        setCart([]);
    };

    return (
        <OrderContext.Provider value={{ cart, addToCart, clearCart }}>
            {children}
        </OrderContext.Provider>
    );
};


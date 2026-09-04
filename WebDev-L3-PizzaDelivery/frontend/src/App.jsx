import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Navbar from './components/layout/Navbar';
import Footer from './components/layout/Footer';
import UserRegister from './pages/UserRegister';
import UserLogin from './pages/UserLogin';
import PizzaBuilder from './pages/PizzaBuilder';
import LiveTracker from './components/order/LiveTracker';
import AdminLogin from './pages/AdminLogin';
import AdminDashboard from './pages/AdminDashboard';

import Home from './pages/Home';
import Checkout from './pages/Checkout';

function App() {
  return (
    <BrowserRouter>
      <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
        <Navbar />
        <div style={{ flex: 1 }}>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/register" element={<UserRegister />} />
            <Route path="/login" element={<UserLogin />} />
            <Route path="/builder" element={<PizzaBuilder />} />
            <Route path="/checkout" element={<Checkout />} />
            <Route path="/live-tracker" element={<LiveTracker />} />
            <Route path="/admin" element={<AdminLogin />} />
            <Route path="/admin-dashboard" element={<AdminDashboard />} />
          </Routes>
        </div>
        <Footer />
      </div>
    </BrowserRouter>
  );
}

export default App;

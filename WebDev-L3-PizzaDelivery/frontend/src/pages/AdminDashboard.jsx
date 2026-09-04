import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import OrderKanban from '../components/admin/OrderKanban';
import InventoryTable from '../components/admin/InventoryTable';
import StockUpdater from '../components/admin/StockUpdater';
import './AdminDashboard.css';

const AdminDashboard = () => {
  const navigate = useNavigate();
  const [refreshTrigger, setRefreshTrigger] = useState(0);

  useEffect(() => {
    const token = localStorage.getItem('adminToken');
    if (!token) {
      navigate('/admin');
    }
  }, [navigate]);

  return (
    <div className="admin-dashboard">
      <header className="dashboard-header">
        <h2>Admin Dashboard</h2>
        <button className="logout-btn" onClick={() => {
          localStorage.removeItem('adminToken');
          navigate('/admin');
        }}>Logout</button>
      </header>
      <main className="dashboard-main">
        <OrderKanban />
        <InventoryTable refreshTrigger={refreshTrigger} />
        <StockUpdater onUpdate={() => setRefreshTrigger(prev => prev + 1)} />
      </main>
    </div>
  );
};

export default AdminDashboard;

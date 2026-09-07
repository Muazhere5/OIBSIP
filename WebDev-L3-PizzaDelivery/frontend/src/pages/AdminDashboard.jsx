import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import OrderKanban from '../components/admin/OrderKanban';
import InventoryTable from '../components/admin/InventoryTable';
import StockUpdater from '../components/admin/StockUpdater';
import UserManagement from '../components/admin/UserManagement';
import PlatformCMS from '../components/admin/PlatformCMS';
import './AdminDashboard.css';

const AdminDashboard = () => {
  const navigate = useNavigate();
  const [refreshTrigger, setRefreshTrigger] = useState(0);
  const [activeTab, setActiveTab] = useState('orders');

  useEffect(() => {
    const token = localStorage.getItem('adminToken');
    if (!token) {
      navigate('/admin');
    }
  }, [navigate]);

  return (
    <div className="admin-dashboard parallax-bg">
      <header className="dashboard-header glassmorphism-card">
        <h2 className="high-contrast-text">Super-Admin Dashboard</h2>
        <div className="tab-controls">
          <button className={`tab-btn ${activeTab === 'orders' ? 'active' : ''}`} onClick={() => setActiveTab('orders')}>Order Kanban</button>
          <button className={`tab-btn ${activeTab === 'inventory' ? 'active' : ''}`} onClick={() => setActiveTab('inventory')}>Inventory</button>
          <button className={`tab-btn ${activeTab === 'users' ? 'active' : ''}`} onClick={() => setActiveTab('users')}>User Management</button>
          <button className={`tab-btn ${activeTab === 'cms' ? 'active' : ''}`} onClick={() => setActiveTab('cms')}>Platform CMS</button>
        </div>
        <button className="logout-btn" onClick={() => {
          localStorage.removeItem('adminToken');
          navigate('/admin');
        }}>Logout</button>
      </header>
      
      <main className="dashboard-main glassmorphism-card">
        {activeTab === 'orders' && <OrderKanban />}
        {activeTab === 'inventory' && (
            <div>
                <InventoryTable refreshTrigger={refreshTrigger} />
                <StockUpdater onUpdate={() => setRefreshTrigger(prev => prev + 1)} />
            </div>
        )}
        {activeTab === 'users' && <UserManagement />}
        {activeTab === 'cms' && <PlatformCMS />}
      </main>
    </div>
  );
};

export default AdminDashboard;

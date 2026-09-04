import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import OrderKanban from '../components/admin/OrderKanban';
import './AdminDashboard.css';

const AdminDashboard = () => {
  const navigate = useNavigate();

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
      </main>
    </div>
  );
};

export default AdminDashboard;

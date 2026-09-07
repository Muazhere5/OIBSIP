import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './OrderKanban.css';

const OrderKanban = () => {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    fetchOrders();
  }, []);

  const fetchOrders = async () => {
    try {
      const res = await axios.get(`${import.meta.env.VITE_API_URL}/api/orders`);
      setOrders(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  const advanceStatus = async (id, currentStatus) => {
    let nextStatus = '';
    if (currentStatus === 'Received') nextStatus = 'In Kitchen';
    else if (currentStatus === 'In Kitchen') nextStatus = 'Sent to Delivery';
    else return;

    try {
      await axios.put(`http://localhost:5000/api/orders/${id}/status`, { status: nextStatus });
      fetchOrders();
    } catch (err) {
      console.error(err);
    }
  };

  const renderColumn = (status, title, colorClass) => {
    const columnOrders = orders.filter(o => o.status === status);
    
    return (
      <div className={`kanban-column ${colorClass}`}>
        <div className="column-header">
          <h3>{title}</h3>
          <span className="order-count">{columnOrders.length}</span>
        </div>
        <div className="kanban-cards">
          {columnOrders.map(order => (
            <div key={order._id} className="kanban-card">
              <div className="card-header">
                <span className="order-id">#{order._id.slice(-6)}</span>
                <span className="order-total">${order.totalAmount}</span>
              </div>
              <div className="card-body">
                {order.items.map((item, idx) => (
                  <div key={idx} className="order-item">
                    🍕 1x Custom Pizza
                  </div>
                ))}
              </div>
              {status !== 'Sent to Delivery' && (
                <button 
                  className="advance-btn" 
                  onClick={() => advanceStatus(order._id, status)}
                >
                  Advance ➔
                </button>
              )}
            </div>
          ))}
        </div>
      </div>
    );
  };

  return (
    <div className="kanban-board">
      {renderColumn('Received', 'Received', 'column-red')}
      {renderColumn('In Kitchen', 'In Kitchen', 'column-orange')}
      {renderColumn('Sent to Delivery', 'Sent to Delivery', 'column-green')}
    </div>
  );
};

export default OrderKanban;

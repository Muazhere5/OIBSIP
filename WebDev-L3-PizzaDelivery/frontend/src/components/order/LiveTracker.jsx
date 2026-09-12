import React, { useState, useEffect } from 'react';
import { io } from 'socket.io-client';
import './LiveTracker.css';

const LiveTracker = () => {
  const [orderStatus, setOrderStatus] = useState('Received');

  const [isConnected, setIsConnected] = useState(true);

  useEffect(() => {
    const socket = io(`${import.meta.env.VITE_API_URL}`);
    
    socket.on('connect', () => {
      setIsConnected(true);
    });

    socket.on('order-status-updated', (data) => {
      if (data && data.status) {
        setOrderStatus(data.status);
      }
    });

    socket.on('disconnect', () => {
      setIsConnected(false);
    });

    return () => {
      socket.disconnect();
    };
  }, []);

  const stages = ['Received', 'In Kitchen', 'Sent to Delivery'];

  return (
    <div className="live-tracker-container">
      {!isConnected && (
        <div className="connection-lost-banner">
          Connection Lost - Reconnecting...
        </div>
      )}
      <div className={`pizza-visual ${orderStatus.replace(/\s+/g, '-').toLowerCase()} ${!isConnected ? 'disconnected' : ''}`}>
        <div className="pizza-circle"></div>
      </div>
      <div className="timeline">
        {stages.map((stage, index) => {
          const isActive = stages.indexOf(orderStatus) >= index;
          return (
            <div key={index} className={`timeline-stage ${isActive ? 'active' : ''}`}>
              <div className="stage-icon"></div>
              <span className="stage-text">{stage}</span>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default LiveTracker;

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './InventoryTable.css';

const InventoryTable = ({ refreshTrigger }) => {
  const [inventory, setInventory] = useState([]);

  useEffect(() => {
    fetchInventory();
  }, [refreshTrigger]);

  const fetchInventory = async () => {
    try {
      const res = await axios.get('http://localhost:5000/api/inventory');
      setInventory(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="inventory-table-container">
      <h3>Current Inventory</h3>
      <table className="inventory-table">
        <thead>
          <tr>
            <th>Item Name</th>
            <th>Category</th>
            <th>Quantity</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody>
          {inventory.map(item => (
            <tr key={item._id} className={item.quantity < 20 ? 'low-stock-row' : ''}>
              <td>{item.name}</td>
              <td className="category-cell">{item.category}</td>
              <td className="quantity-cell">{item.quantity}</td>
              <td>
                <div className={`status-indicator ${item.quantity < 20 ? 'low' : 'healthy'}`}></div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default InventoryTable;

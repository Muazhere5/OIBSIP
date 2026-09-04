import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './StockUpdater.css';

const StockUpdater = ({ onUpdate }) => {
  const [items, setItems] = useState([]);
  const [selectedItem, setSelectedItem] = useState('');
  const [quantity, setQuantity] = useState('');

  useEffect(() => {
    fetchItems();
  }, []);

  const fetchItems = async () => {
    try {
      const res = await axios.get('http://localhost:5000/api/inventory');
      setItems(res.data);
      if (res.data.length > 0) setSelectedItem(res.data[0]._id);
    } catch (err) {
      console.error(err);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!selectedItem || quantity === '') return;

    try {
      await axios.put(`http://localhost:5000/api/inventory/${selectedItem}`, { quantity: Number(quantity) });
      setQuantity('');
      if (onUpdate) onUpdate();
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="stock-updater-container">
      <h3>Update Stock</h3>
      <form onSubmit={handleSubmit} className="stock-form">
        <select value={selectedItem} onChange={(e) => setSelectedItem(e.target.value)} required>
          {items.map(item => (
            <option key={item._id} value={item._id}>{item.name}</option>
          ))}
        </select>
        <input 
          type="number" 
          placeholder="New Quantity" 
          value={quantity} 
          onChange={(e) => setQuantity(e.target.value)} 
          required 
          min="0"
        />
        <button type="submit" className="update-btn">Update</button>
      </form>
    </div>
  );
};

export default StockUpdater;

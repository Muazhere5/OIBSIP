import React, { useState, useEffect } from 'react';
import axios from '../../utils/api';
import './UserManagement.css';

const UserManagement = () => {
    const [users, setUsers] = useState([]);
    const [networkError, setNetworkError] = useState('');

    useEffect(() => {
        const controller = new AbortController();
        const fetchUsers = async () => {
            try {
                const token = localStorage.getItem('adminToken');
                const res = await axios.get(`${import.meta.env.VITE_API_URL}/api/admin/users`, {
                    headers: { Authorization: `Bearer ${token}` },
                    signal: controller.signal
                });
                setUsers(res.data);
                setNetworkError('');
            } catch (error) {
                if (error.name !== 'CanceledError' && error.code !== 'ERR_CANCELED') {
                    setNetworkError('Cannot fetch users. Network error.');
                }
            }
        };
        fetchUsers();
        return () => controller.abort();
    }, []);

    const fetchUsersStandalone = async () => {
        try {
            const token = localStorage.getItem('adminToken');
            const res = await axios.get(`${import.meta.env.VITE_API_URL}/api/admin/users`, {
                headers: { Authorization: `Bearer ${token}` }
            });
            setUsers(res.data);
            setNetworkError('');
        } catch (error) {
            setNetworkError('Cannot fetch users. Network error.');
        }
    };

    const handleApprove = async (id) => {
        try {
            const token = localStorage.getItem('adminToken');
            await axios.put(`${import.meta.env.VITE_API_URL}/api/admin/users/${id}/approve`, {}, {
                headers: { Authorization: `Bearer ${token}` }
            });
            fetchUsersStandalone();
        } catch (error) {
            setNetworkError('Cannot approve user. Network error.');
        }
    };

    const handleDelete = async (id) => {
        try {
            const token = localStorage.getItem('adminToken');
            await axios.delete(`${import.meta.env.VITE_API_URL}/api/admin/users/${id}`, {
                headers: { Authorization: `Bearer ${token}` }
            });
            fetchUsersStandalone();
        } catch (error) {
            setNetworkError('Cannot delete user. Network error.');
        }
    };

    if (networkError) {
        return (
            <div className="user-management-container" style={{ textAlign: 'center', padding: '50px' }}>
                <h3 style={{ color: '#ff4444' }}>{networkError}</h3>
                <button onClick={fetchUsersStandalone} className="approve-btn">Retry</button>
            </div>
        );
    }

    return (
        <div className="user-management-container">
            <h3>Manage Users</h3>
            <table className="user-table">
                <thead>
                    <tr>
                        <th>Name</th>
                        <th>Email</th>
                        <th>Status</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {users.map(user => (
                        <tr key={user._id}>
                            <td>{user.name}</td>
                            <td>{user.email}</td>
                            <td>{user.isApproved ? 'Approved' : 'Pending'}</td>
                            <td>
                                {!user.isApproved && <button onClick={() => handleApprove(user._id)} className="approve-btn">Approve</button>}
                                <button onClick={() => handleDelete(user._id)} className="delete-btn">Remove</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default UserManagement;

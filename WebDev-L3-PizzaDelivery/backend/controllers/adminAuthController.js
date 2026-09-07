const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const AdminModel = require('../models/AdminModel');

const loginAdmin = async (req, res) => {
    try {
        const { email, password } = req.body;
        
        const admin = await AdminModel.findOne({ email });
        if (!admin) {
            return res.status(401).json({ message: 'Invalid admin credentials' });
        }

        const isMatch = await bcrypt.compare(password, admin.password);
        if (!isMatch) {
            return res.status(401).json({ message: 'Invalid admin credentials' });
        }

        const token = jwt.sign({ id: admin._id, role: 'admin' }, process.env.JWT_SECRET || 'secret', { expiresIn: '1d' });
        return res.status(200).json({ token, message: 'Admin logged in' });
    } catch (error) {
        res.status(500).json({ message: 'Error logging in admin' });
    }
};

module.exports = { loginAdmin };

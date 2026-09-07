const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const AdminModel = require('../models/AdminModel');
const UserModel = require('../models/UserModel');

const loginAdmin = async (req, res) => {
    try {
        const { email, password } = req.body;
        let admin = await AdminModel.findOne({ email });
        if (!admin && email === 'admin@oasis.com' && password === 'admin123') {
            const salt = await bcrypt.genSalt(10);
            const hashedPassword = await bcrypt.hash('admin123', salt);
            admin = await AdminModel.create({ email: 'admin@oasis.com', password: hashedPassword });
        }
        if (!admin) return res.status(401).json({ message: 'Invalid admin credentials' });

        const isMatch = await bcrypt.compare(password, admin.password);
        if (!isMatch) return res.status(401).json({ message: 'Invalid admin credentials' });

        const token = jwt.sign({ id: admin._id, role: 'admin' }, process.env.JWT_SECRET || 'secret', { expiresIn: '1d' });
        return res.status(200).json({ token, message: 'Admin logged in' });
    } catch (error) {
        res.status(500).json({ message: 'Error logging in admin' });
    }
};

const getAllUsers = async (req, res) => {
    try {
        const users = await UserModel.find().select('-password');
        res.status(200).json(users);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching users' });
    }
};

const approveUser = async (req, res) => {
    try {
        const user = await UserModel.findByIdAndUpdate(req.params.id, { isApproved: true }, { new: true });
        res.status(200).json(user);
    } catch (error) {
        res.status(500).json({ message: 'Error approving user' });
    }
};

const deleteUser = async (req, res) => {
    try {
        await UserModel.findByIdAndDelete(req.params.id);
        res.status(200).json({ message: 'User deleted' });
    } catch (error) {
        res.status(500).json({ message: 'Error deleting user' });
    }
};

const PlatformModel = require('../models/PlatformModel');

const getPlatformSettings = async (req, res) => {
    try {
        let settings = await PlatformModel.findOne();
        if (!settings) {
            settings = await PlatformModel.create({});
        }
        res.status(200).json(settings);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching platform settings' });
    }
};

const updatePlatformSettings = async (req, res) => {
    try {
        const { slidingAds } = req.body;
        let settings = await PlatformModel.findOne();
        if (!settings) {
            settings = new PlatformModel();
        }
        if (slidingAds) settings.slidingAds = slidingAds;
        await settings.save();
        res.status(200).json(settings);
    } catch (error) {
        res.status(500).json({ message: 'Error updating platform settings' });
    }
};

module.exports = { loginAdmin, getAllUsers, approveUser, deleteUser, getPlatformSettings, updatePlatformSettings };

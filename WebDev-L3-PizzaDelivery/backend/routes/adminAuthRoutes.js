const express = require('express');
const router = express.Router();
const { loginAdmin, getAllUsers, approveUser, deleteUser, getPlatformSettings, updatePlatformSettings } = require('../controllers/adminAuthController');
const { protectRoute, isAdmin } = require('../middleware/authMiddleware');

router.post('/login', loginAdmin);
router.get('/users', protectRoute, isAdmin, getAllUsers);
router.put('/users/:id/approve', protectRoute, isAdmin, approveUser);
router.delete('/users/:id', protectRoute, isAdmin, deleteUser);

router.get('/settings', protectRoute, isAdmin, getPlatformSettings);
router.put('/settings', protectRoute, isAdmin, updatePlatformSettings);

module.exports = router;

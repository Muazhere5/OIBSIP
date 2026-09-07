const express = require('express');
const router = express.Router();
const { loginAdmin, getAllUsers, approveUser, deleteUser, getPlatformSettings, updatePlatformSettings } = require('../controllers/adminAuthController');
const { protectRoute } = require('../middleware/authMiddleware');

router.post('/login', loginAdmin);
router.get('/users', protectRoute, getAllUsers);
router.put('/users/:id/approve', protectRoute, approveUser);
router.delete('/users/:id', protectRoute, deleteUser);

router.get('/settings', getPlatformSettings);
router.put('/settings', protectRoute, updatePlatformSettings);

module.exports = router;

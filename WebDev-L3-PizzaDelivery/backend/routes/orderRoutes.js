const express = require('express');
const router = express.Router();
const { createRazorpayOrder, verifyPaymentAndSave, getAllOrders, updateOrderStatus } = require('../controllers/orderController');

const { protectRoute, isAdmin } = require('../middleware/authMiddleware');

router.post('/create', protectRoute, createRazorpayOrder);
router.post('/verify', protectRoute, verifyPaymentAndSave);
router.get('/', protectRoute, isAdmin, getAllOrders);
router.put('/:id/status', protectRoute, isAdmin, updateOrderStatus);

module.exports = router;

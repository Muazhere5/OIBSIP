const express = require('express');
const router = express.Router();
const { createRazorpayOrder, verifyPaymentAndSave, getAllOrders, updateOrderStatus } = require('../controllers/orderController');

const { protectRoute } = require('../middleware/authMiddleware');

router.post('/create', createRazorpayOrder);
router.post('/verify', verifyPaymentAndSave);
router.get('/', protectRoute, getAllOrders);
router.put('/:id/status', protectRoute, updateOrderStatus);

module.exports = router;

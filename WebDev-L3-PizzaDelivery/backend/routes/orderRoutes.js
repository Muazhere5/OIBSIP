const express = require('express');
const router = express.Router();
const { createRazorpayOrder, verifyPaymentAndSave, getAllOrders, updateOrderStatus } = require('../controllers/orderController');

router.post('/create', createRazorpayOrder);
router.post('/verify', verifyPaymentAndSave);
router.get('/', getAllOrders);
router.put('/:id/status', updateOrderStatus);

module.exports = router;

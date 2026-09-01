const express = require('express');
const router = express.Router();
const { createRazorpayOrder, verifyPaymentAndSave } = require('../controllers/orderController');

router.post('/create', createRazorpayOrder);
router.post('/verify', verifyPaymentAndSave);

module.exports = router;

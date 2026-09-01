const razorpay = require('../config/razorpayConfig');
const crypto = require('crypto');
const OrderModel = require('../models/OrderModel');

const createRazorpayOrder = async (req, res) => {
    try {
        const { total } = req.body;
        const options = {
            amount: Math.round(total * 100),
            currency: 'USD',
            receipt: `receipt_${Date.now()}`,
        };
        const order = await razorpay.orders.create(options);
        res.status(200).json(order);
    } catch (error) {
        console.error(error.message);
        res.status(500).json({ message: 'Error creating Razorpay order' });
    }
};

const verifyPaymentAndSave = async (req, res) => {
    try {
        const { razorpay_order_id, razorpay_payment_id, razorpay_signature, orderData, userId } = req.body;
        
        const hmac = crypto.createHmac('sha256', process.env.RAZORPAY_KEY_SECRET);
        hmac.update(razorpay_order_id + "|" + razorpay_payment_id);
        const generatedSignature = hmac.digest('hex');

        if (generatedSignature !== razorpay_signature) {
            return res.status(400).json({ message: 'Payment verification failed' });
        }

        const newOrder = await OrderModel.create({
            userId: userId,
            items: [orderData],
            totalAmount: orderData.total,
            status: 'Received'
        });

        res.status(201).json({ message: 'Order placed successfully', orderId: newOrder._id });
    } catch (error) {
        console.error(error.message);
        res.status(500).json({ message: 'Error verifying payment' });
    }
};

module.exports = { createRazorpayOrder, verifyPaymentAndSave };

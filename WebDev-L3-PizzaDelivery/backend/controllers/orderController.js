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
        console.error(error);
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

        const itemsToDecrement = [];
        if (orderData.base) itemsToDecrement.push(orderData.base);
        if (orderData.sauce) itemsToDecrement.push(orderData.sauce);
        if (orderData.cheese && orderData.cheese !== 'No Cheese') itemsToDecrement.push(orderData.cheese);
        if (orderData.veggies && Array.isArray(orderData.veggies)) {
            itemsToDecrement.push(...orderData.veggies);
        }

        const InventoryModel = require('../models/InventoryModel');
        const mongoose = require('mongoose');

        let session;
        try {
            session = await mongoose.startSession();
            session.startTransaction();
        } catch (err) {
            session = null;
        }

        try {
            const orderOptions = session ? { session } : {};
            const newOrder = await OrderModel.create([{
                userId: userId,
                items: [orderData],
                totalAmount: orderData.total,
                status: 'Received'
            }], orderOptions);

            for (const itemName of itemsToDecrement) {
                const queryOptions = { new: true };
                if (session) queryOptions.session = session;

                const updatedItem = await InventoryModel.findOneAndUpdate(
                    { name: itemName, quantity: { $gt: 0 } },
                    { $inc: { quantity: -1 } },
                    queryOptions
                );
                if (!updatedItem) {
                    throw new Error(`Item ${itemName} is out of stock`);
                }
            }

            if (session) {
                await session.commitTransaction();
                session.endSession();
            }

            res.status(201).json({ message: 'Order placed successfully', orderId: newOrder[0]._id });
        } catch (innerError) {
            if (session) {
                await session.abortTransaction();
                session.endSession();
            }
            throw innerError;
        }

    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error verifying payment' });
    }
};

const getAllOrders = async (req, res) => {
    try {
        const orders = await OrderModel.find().sort({ _id: -1 });
        res.status(200).json(orders);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error fetching orders' });
    }
};

const updateOrderStatus = async (req, res) => {
    try {
        const { id } = req.params;
        const { status } = req.body;
        const updatedOrder = await OrderModel.findByIdAndUpdate(id, { status }, { new: true });
        
        if (!updatedOrder) {
            return res.status(404).json({ message: 'Order not found' });
        }

        const io = req.app.get('io');
        if (io) {
            io.emit('order-status-updated', { orderId: updatedOrder._id, status: updatedOrder.status });
        }

        res.status(200).json(updatedOrder);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error updating order status' });
    }
};

module.exports = { createRazorpayOrder, verifyPaymentAndSave, getAllOrders, updateOrderStatus };

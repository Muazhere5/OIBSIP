const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    items: [{
        base: { type: String },
        sauce: { type: String },
        cheese: { type: String },
        veggies: [{ type: String }],
        total: { type: Number }
    }],
    totalAmount: {
        type: Number,
        required: true
    },
    status: {
        type: String,
        default: 'Received'
    }
});

const OrderModel = mongoose.model('Order', orderSchema);

module.exports = OrderModel;

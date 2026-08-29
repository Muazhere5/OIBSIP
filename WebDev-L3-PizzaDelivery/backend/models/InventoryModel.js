const mongoose = require('mongoose');

const inventorySchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    category: {
        type: String,
        enum: ['base', 'sauce', 'cheese', 'veggie'],
        required: true
    },
    quantity: {
        type: Number,
        default: 100
    }
});

const InventoryModel = mongoose.model('Inventory', inventorySchema);

module.exports = InventoryModel;

const cron = require('node-cron');
const InventoryModel = require('../models/InventoryModel');
const sendEmail = require('../utils/emailSender');

cron.schedule('0 0 * * *', async () => {
    try {
        const lowStockItems = await InventoryModel.find({ quantity: { $lt: 20 } });
        
        if (lowStockItems.length > 0) {
            const itemNames = lowStockItems.map(item => `${item.name} (${item.quantity})`).join(', ');
            const subject = 'Low Inventory Alert';
            const text = `The following items are low in stock: ${itemNames}`;
            await sendEmail('admin@oasis.com', subject, text);
        }
    } catch (error) {
        console.error(error);
    }
});

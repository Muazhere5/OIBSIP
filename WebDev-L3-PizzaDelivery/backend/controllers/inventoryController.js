const InventoryModel = require('../models/InventoryModel');

const getAllInventory = async (req, res) => {
    try {
        const items = await InventoryModel.find();
        res.status(200).json(items);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error fetching inventory' });
    }
};

const updateStock = async (req, res) => {
    try {
        const { id } = req.params;
        const { quantity } = req.body;
        const updatedItem = await InventoryModel.findByIdAndUpdate(
            id,
            { quantity },
            { new: true }
        );
        if (!updatedItem) {
            return res.status(404).json({ message: 'Item not found' });
        }
        res.status(200).json(updatedItem);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error updating stock' });
    }
};

module.exports = { getAllInventory, updateStock };

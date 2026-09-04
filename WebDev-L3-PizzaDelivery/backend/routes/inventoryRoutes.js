const express = require('express');
const router = express.Router();
const { getAllInventory, updateStock } = require('../controllers/inventoryController');

router.get('/', getAllInventory);
router.put('/:id', updateStock);

module.exports = router;

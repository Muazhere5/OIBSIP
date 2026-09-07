const express = require('express');
const router = express.Router();
const { getAllInventory, updateStock } = require('../controllers/inventoryController');

const { protectRoute } = require('../middleware/authMiddleware');

router.get('/', protectRoute, getAllInventory);
router.put('/:id', protectRoute, updateStock);

module.exports = router;

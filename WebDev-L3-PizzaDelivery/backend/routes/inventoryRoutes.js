const express = require('express');
const router = express.Router();
const { getAllInventory, updateStock } = require('../controllers/inventoryController');

const { protectRoute, isAdmin } = require('../middleware/authMiddleware');

router.get('/', protectRoute, isAdmin, getAllInventory);
router.put('/:id', protectRoute, isAdmin, updateStock);

module.exports = router;

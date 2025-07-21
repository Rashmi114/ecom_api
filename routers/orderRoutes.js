const express = require('express');
const router = express.Router();
const verifyToken = require('../middleware/authMiddleware');
const orderControllers = require('../controllers/orderControllers');

router.post('/savedItems', orderControllers.savedItems);
router.get('/getSavedKot/:kotNumber', orderControllers.getSavedKot)
module.exports = router;
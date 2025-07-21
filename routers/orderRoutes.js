const express = require('express');
const router = express.Router();
const verifyToken = require('../middleware/authMiddleware');
const orderControllers = require('../controllers/orderControllers');

router.post('/savedItems', verifyToken, orderControllers.savedItems);
router.get('/getSavedKot/:kotNumber', verifyToken, orderControllers.getSavedKot);
router.get('/getAllKots', verifyToken, orderControllers.getAllKots);
module.exports = router;
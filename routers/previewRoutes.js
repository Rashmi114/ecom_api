const express = require('express');
const router = express.Router();
const verifyToken = require('../middleware/authMiddleware');
const prevDetails = require('../controllers/previewController');

router.post('/generateCheck', prevDetails.generateCheck);
router.get('/pendingBills', prevDetails.getPendingBills);
module.exports = router;
const express = require('express')
const router = express.Router()
const verifyToken = require('../middleware/authMiddleware')
const itemControllers = require('../controllers/itemControllers');

router.post('/createItems', verifyToken, itemControllers.createItem);
router.put('/updateItem/:id', verifyToken, itemControllers.updateItem);
router.get('/getItems', verifyToken, itemControllers.getItems);
router.delete('/deleteItem/:id', verifyToken, itemControllers.deleteItem);
router.delete('/deleteAllItems', verifyToken, itemControllers.deleteAllItems);
router.get('/menuGroups', itemControllers.getMenuGroups);

module.exports = router

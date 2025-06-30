const express = require('express')
const router = express.Router()
const authController = require('../controllers/authControllers')
const verifyToken = require('../middleware/authMiddleware')

router.post('/register', authController.register)
router.post('/login', authController.login)

router.get('/profile', verifyToken, (req,res)=>{
    res.json({message: 'Secure profile data', user: req.user, status: 1})
})
module.exports = router
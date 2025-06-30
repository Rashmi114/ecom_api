const User = require('../models/User')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

exports.register = async (req,res)=>{
    const {name, userId, password} = req.body
    try{
        const existingUser = await User.findOne({userId})
        if(existingUser){
            return res.status(400).json({message:'User already exists', status: 0})
        }
        const hashedPassword = await bcrypt.hash(password, 10)

        const user = new User({name, userId,password: hashedPassword})
        await user.save()
        res.status(201).json({message: 'User registered successfully', stauts: 1})
    } catch (err){
        res.status(500).json({message:'Inyrtnal Server Error', error: err.message, status: 0})
    }
}

exports.login = async(req,res)=>{
    const {userId, password} = req.body
    try{
        const user = await User.findOne({userId})
        if(!user){
            return res.status(401).json({message: 'Invalid credentials', status: 0})
        }
        const isMatch = await bcrypt.compare(password, user.password)
        if(!isMatch){
            return res.status(401).json({message: 'Invalid Password', stauts: 0})
        }
        const token = jwt.sign(
            {userId: user.userId, name: user.name},
            process.env.JWT_SECRET,
            {expiresIn:'1h'}
        )
        res.status(200).json({message: 'Login Successful',token: token, status: 1})
    } catch(err){
        res.status(500).json({message: 'Internal Server Error', error: err.message, status: 0})
    }
}
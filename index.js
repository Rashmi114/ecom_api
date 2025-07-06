const express = require('express')
const mongoose = require('mongoose')
const cors = require('cors')
const bodyParser = require('body-parser')
const dotenv = require('dotenv')
const authRoutes = require('./routers/authRoutes')

dotenv.config()

const app = express()
app.use(cors({
  origin: '*', // For production, replace * with your frontend domain (e.g., https://your-frontend.onrender.com)
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization'],
}));
app.options('*', cors())
app.use(bodyParser.json())

app.use('/api/auth', authRoutes)

mongoose.connect(process.env.MONGO_URL).then(()=>{
    console.log('MongoDB connected')
    app.listen(process.env.PORT, ()=>{
        console.log(`🚀 Server running on http://localhost:${process.env.PORT}`)
    })
}).catch(err=>{
    console.err('MongoDB connection error:', err)
})
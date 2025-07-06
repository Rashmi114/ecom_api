const express = require('express')
const mongoose = require('mongoose')
const cors = require('cors')
const bodyParser = require('body-parser')
const dotenv = require('dotenv')
const authRoutes = require('./routers/authRoutes')
const PORT= 3000

dotenv.config()

const app = express()
app.use(cors())
app.use(bodyParser.json())

app.use('/api/auth', authRoutes)
app.get("/", (req, res) => {
  res.send("welcome to ecommerce apis");
});

mongoose.connect(process.env.MONGO_URL).then(()=>{
    console.log('MongoDB connected')
    app.listen(PORT, ()=>{
        console.log(`🚀 Server running on http://localhost:${PORT}`)
    })
}).catch(err=>{
    console.error('MongoDB connection error:', err)
})
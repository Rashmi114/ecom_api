const express = require('express')
const mongoose = require('mongoose')
const cors = require('cors')
const bodyParser = require('body-parser')
const dotenv = require('dotenv')
const authRoutes = require('./routers/authRoutes')
const itemRoutes = require('./routers/itemRoutes')
const path = require('path')

dotenv.config()

const app = express()
app.use(cors())
app.use(bodyParser.json())
app.use(express.static(path.join(__dirname, 'public')));

app.use('/api/auth', authRoutes)
app.use('/api/items', itemRoutes)
app.get("/", (req, res) => {
  res.send("welcome to ecommerce apis");
});

mongoose.connect(process.env.MONGO_URL).then(()=>{
    console.log('MongoDB connected')
    app.listen(process.env.PORT, ()=>{
        console.log(`🚀 Server running on http://localhost:${process.env.PORT}`)
    })
}).catch(err=>{
    console.error('MongoDB connection error:', err)
})
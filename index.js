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

const BASE_URL = 'http://localhost:5007';
// const BASE_URL = 'https://ecom-api-2dim.onrender.com';
const menuIcon = {
  "Electronics": `${BASE_URL}/icon/cpu.png`,
  "Home": `${BASE_URL}/icon/house.png`,
  "Sports": `${BASE_URL}/icon/game.png`,
  "Appliances": `${BASE_URL}/icon/electric-appliance.png`,
  "Toys": `${BASE_URL}/icon/storage-box.png`
}
app.get('/debug-icon/:filename', (req, res) => {
  const fs = require('fs');
  const iconPath = path.join(__dirname, 'public/icon', req.params.filename);
  if (fs.existsSync(iconPath)) {
    res.sendFile(iconPath);
  } else {
    res.status(404).send('Icon file not found on server');
  }
});


mongoose.connect(process.env.MONGO_URL).then(()=>{
    console.log('MongoDB connected')
    app.listen(process.env.PORT, ()=>{
        console.log(`🚀 Server running on http://localhost:${process.env.PORT}`)
    })
}).catch(err=>{
    console.error('MongoDB connection error:', err)
})
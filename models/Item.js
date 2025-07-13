const mongoose = require('mongoose')

const itemSchema = new mongoose.Schema({
  menuGroup: { type: String, required: true },
  menuCode: { type: Number, required: true },
  quantity: { type: Number, required: true },
  amount: { type: Number, required: true },
  itemName: { type: String, required: true },
  itemImage: { type: String }
},{timestamps: true});

module.exports = mongoose.model('Item', itemSchema);
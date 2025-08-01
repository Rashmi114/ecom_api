const mongoose = require('mongoose');

const previewSchema = new mongoose.Schema({
    billNumber: {type: Number, required: true, uniquie: true},
    items:[{
    menuGroup: String,
    menuCode: Number,
    quantity: Number,
    amount: Number,
    itemName: String,
    itemImage: String 
    }],
    totalAmount: {type: Number, required: true},
    kotNumber: {type: Number, required: true},
    billStatus: {type: String, enum: ['pending', 'settled'], default: 'pending'},
    createdAt: {type: Date, default: Date.now}
})

module.exports = mongoose.model('Preview', previewSchema);
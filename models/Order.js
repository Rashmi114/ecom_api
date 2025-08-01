const mongoose = require('mongoose')

const orderSchema = new mongoose.Schema({
    kotNumber: {type: Number, required: true, uniquie: true},
    items:[{
    menuGroup: String,
    menuCode: Number,
    quantity: Number,
    amount: Number,
    itemName: String,
    itemImage: String 
    }],
    billNumber: {type: Number, default: 0},
    status: {type: String, enum: ['open', 'billed'], default: 'open'},
    createdAt: {type: Date, default: Date.now}
});

module.exports = mongoose.model('Order', orderSchema);
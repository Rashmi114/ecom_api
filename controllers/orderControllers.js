const Order = require('../models/Order')

exports.savedItems = async (req, res)=>{
    try{
        const {items} = req.body;
        if(!items || !Array.isArray(items) || items.length == 0){
            return res.status(400).json({ message: 'No items provided', status: 0 });
        }
        const lastOrder = await Order.findOne().sort({ kotNumber: -1});
        const newKotNumber = lastOrder ? lastOrder.kotNumber + 1 : 1;
        const order = new Order({
            kotNumber: newKotNumber,
            items
        });
        await order.save();
        res.status(201).json({message: 'Order saved successfully', kotNumber: newKotNumber, status: 1});
    } catch(err) {
        res.status(500).json({message: "Internal Server Error", error: err.message, status: 0})
    }
}

exports.getSavedKot = async (req, res) => {
    try{
        const {kotNumber} = req.params;
        const order = await Order.findOne( {kotNumber: parseInt(kotNumber)});
        if(!order) {
            return res.status(400).json({ message: 'Order not found!', status: 0})
        }
        const totalAmount = order.items.reduce((sum, item)=> sum + item.amount * item.quantity, 0)

        res.status(200).json({
            message: 'Success',
            status: 1,
            kotNumber: order.kotNumber,
            items: order.items,
            totalAmount: totalAmount
        });
    } catch(err) {
        res.status(500).json({ message: 'Internal Server Error', status: 0, error: err.message})
    }
}
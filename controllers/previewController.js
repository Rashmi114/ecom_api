const Preview = require('../models/Preview');
const Order = require('../models/Order');

exports.generateCheck = async (req ,res)=>{
 try{
    const {items, totalAmount, kotNumber, billNumber} = req.body;
    // console.log("Body: ", req.body);
     if(!items || !Array.isArray(items) || items.length == 0){
            return res.status(400).json({ message: 'No items provided', status: 0 });
        } 
         if (totalAmount == null) {
            return res.status(400).json({ message: 'totalAmount not provided', status: 0 });
        }
        if (kotNumber == null) {
            return res.status(400).json({ message: 'KOTNumber not provided', status: 0 }); 
        }
        if (billNumber == null) {
            return res.status(400).json({ message: 'billNumber not provided', status: 0 }); 
        }
        const kot = await Order.findOne({kotNumber});
        if (!kot) return res.status(404).json({ message: 'KOT not found', status: 0 });
        const prev = await Preview.findOne().sort({billNumber : -1});
        const newBillNumber = prev ? prev.billNumber + 1 : 1;
        const preview = new Preview({
            billNumber: newBillNumber,
            items,
            totalAmount,
            kotNumber
        });
        await preview.save();
        await Order.updateOne({ kotNumber }, {status: 'billed', billNumber: newBillNumber })
        res.status(201).json({message: 'Check generated successfully', data: preview, status: 1});
 } catch (err) {
    res.status(500).json({message: "Internal Server Error", error: err.message, status: 0});
 }
}

exports.getPendingBills = async (req, res)=>{
    try{
        const prev = await Preview.find().sort({billNumber: 1});
        const allBills = prev.map(bills=>{
                return {
                    billNumber: bills.billNumber,
                    kotNumber: bills.kotNumber,
                    items: bills.items,
                    totalAmount: bills.totalAmount,
                    billStatus: bills.billStatus,
                    createdAt: bills.createdAt
                };
        });
         res.status(200).json({ message: 'Success', status: 1, billDetails: allBills});
    } catch (err){
        res.status(500).json({message: "Internal Server Error", error: err.message, status: 0});
    }
}

exports.generateBill = async (req, res)=>{
    const {billNumber} = req.body;
    if(!billNumber){
        return res.status(400).json({ message: 'bill number is required', status: 0 });
    }
    try{
        const updatedBill = await Preview.findOneAndUpdate(
            {billNumber: billNumber},
            {billStatus: 'settled'},
            { new: true }
        );
        if(!updatedBill){
            return res.status(404).json({message: 'Bill not found', status: 0});
        }
        res.status(200).json({message: 'Bill settled successfully', billDetails: updatedBill, status: 1});
    } catch (err){
        res.status(500).json({error: 'Internal server error', message: err.message, status: 0});
    }
}
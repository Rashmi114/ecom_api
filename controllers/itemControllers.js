const Item = require('../models/Item');

exports.createItem = async (req,res) =>{
    try{
        const { menuGroup, menuCode, quantity, amount, itemName, itemImage } = req.body;
        if(!menuGroup || !menuCode || !quantity || !amount || !itemName) {
            return res.status(400).json({message: 'All fields are required', status: 0});
        }
        const newItem = new Item({
            menuGroup,
            menuCode,
            quantity,
            amount,
            itemName,
            itemImage
        });

        await newItem.save();
        res.status(201).json({message: 'Item created successfully', status: 1});
    } catch(err){
        res.status(500).json({message: 'Internal Server Error', error: err.message, status: 0})
    }
}

exports.updateItem = async (req,res)=>{
    const itemId = req.params.id;

    try {
        const updateItem = await Item.findByIdAndUpdate(
            itemId,
            { $set: req.body },
            { new: true, runValidators: true }
        );
        if(!updateItem) {
            return res.status(404).json({message: 'Item not found', status:0});
        }
        res.status(200).json({message: 'Item updated successfully', status: 1, data: updateItem });
    } catch(err) {
        res.status(500).json({message: 'Internal Server Error', error: err.message, status: 0});
    }
}

exports.getItems = async (req,res) => {
    try {
        const items = await Item.find();
        res.status(200).json({message: 'Items fetched successfully', status: 1, data: items});
    } catch(err) {
        console.error('Error fetching items:', err);
        res.status(500).json({message: 'Internal Server Error', status: 0, error: err.message});
    }
}

exports.deleteItem = async (req,res) =>{
    const itemId = req.params.id;
    try{
        const deleteItem = await Item.findByIdAndDelete(itemId);
        if(!deleteItem) {
            return res.status(404).json({message: 'Item not found', status: 0});
        }
        res.status(200).json({message: 'Item deleted successfully', status: 1});
    } catch(err){
        res.status(500).json({message: 'Internal Server Error', error: err.message, status:0});
    }
}

exports.deleteAllItems = async (req,res) =>{
    try{
        const deleteAllItems = await Item.deleteMany({});
        res.status(200).json({message: 'All items deleted successfully', status: 1});
    } catch(err) {
        res.status(500).json({message: 'Internal Server Error', error: err.message, status: 0});
    }
}

// const BASE_URL = 'http://localhost:5007';
const BASE_URL = 'https://ecom-api-2dim.onrender.com';
const menuIcon = {
  "Electronics": `${BASE_URL}/icon/electronics.png`,
  "Home": `${BASE_URL}/icon/home.png`,
  "Sports": `${BASE_URL}/icon/sports.png`,
  "Appliances": `${BASE_URL}/icon/electric-appliance.png`,
  "Toys": `${BASE_URL}/icon/storage-box.png`
}
exports.getMenuGroups = async (req,res) =>{
    try {
        const rawGroups = await Item.aggregate ([
            {
                $group: {
                    _id: {
                        menuGroup: '$menuGroup',
                        menuCode: '$menuCode'
                    }
                },
            },
            {
                $addFields: {
                    menuCodeNum: { $toInt: '$_id.menuCode'}
                }
            },
            {
                $sort: { menuCodeNum: 1}
            }
        ]);

        const menuGroups = rawGroups.map(group => {
            const { menuGroup, menuCode } = group._id;
            return {
                menuGroup,
                menuCode,
                menuGruopIcon: menuIcon[menuGroup] || `${BASE_URL}/icon/default.png`
            }
        });
        res.status(200).json({message: 'Menu groups fetched successfully', status: 1, data: menuGroups});
    } catch(err) {
        res.status(500).json({message: 'Internal Server Error', error: err.message, status: 0})
    }
}
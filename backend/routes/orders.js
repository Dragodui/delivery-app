const { Router } = require('express');
const User = require('../database/schemas/User');
const Order = require('../database/schemas/Order');

const router = Router();

router.post('/orders/makeOrder', async (req, res) => {
   try {
    const { items, userId } = req.body;
    if (!userId || !items.length) {
        return res.status(400).json({message: "userId and items required"});
    };
    const user = await User.findOne(userId);
    if (!user) {
        return res.status(400).json({ message: 'User not found' });
    };
    const newOrder = new Order({ products: items });
    user.orders.push(newOrder);
    await user.save();
   } catch(error) {
    res.status(500).json({ message: 'Server error', error });
   }

});

router.get('/orders/:userId', (req, res) => {
    try {
        const {userId} = req.params;
        if (!userId) {
            return res.status(400).json({message: 'userId required'});
        };
        res.status(200).json({ orders: user.orders });
    } catch (error) {
        res.status(500).json({ message: 'Server error', error });   
    }
});

module.exports = router;
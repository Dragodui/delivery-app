const { Router } = require('express');
const User = require('../database/schemas/User');
const Order = require('../database/schemas/Order');
const Restaurant = require('../database/schemas/Restaurant');

const router = Router();

router.post('/orders/makeOrder', async (req, res) => {
  try {
    const { items, userId } = req.body;
    if (!userId || !items.length) {
      return res.status(400).json({ message: 'userId and items required' });
    }
    const user = await User.findById(userId);
    const restaurant = await Restaurant.findById(items[0].restaurantId);
    const restaurantName = restaurant.name;
    if (!user) {
      return res.status(400).json({ message: 'User not found' });
    }
    const newOrder = new Order({ restaurantName, products: [...items] });

    await newOrder.save();
    user.orders.push(newOrder);
    await user.save();
    return res.status(200).json({ message: 'Order added successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error });
  }
});

router.get('/orders/:userId', async (req, res) => {
  try {
    const { userId } = req.params;
    if (!userId) {
      return res.status(400).json({ message: 'userId required' });
    }
    const user = await User.findById(userId).populate('orders');
    res.status(200).json({ orders: user.orders });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error });
  }
});

router.get('/orders/order/:orderId', async (req, res) => {
  try {
    const { orderId } = req.params;
    if (!orderId) {
      return res.status(400).json({ message: 'orderId required' });
    }
    const order = await Order.findById(orderId);
    res.status(200).json({ order });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error });
  }
});

router.post('/orders/finishOrder/:orderId', async (req, res) => {
  try {
    const {orderId} = req.params;
    if (!orderId) {
      return res.status(400).json({ message: 'orderId required' });
    }
    const order = await Order.findById(orderId);
    if (!order) {
      return res.status(404).json({ message: 'Order not found' });
    }
    order.status = 'Delivered';
    await order.save();
    res.status(200).json({ message: 'Order has been delivered successfully' });
  } catch(error) {
    res.status(500).json({ message: 'Server error', error });
  }
});

module.exports = router;

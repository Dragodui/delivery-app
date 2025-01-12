const { Router } = require('express');
const User = require('../database/mySQL/schemas/User');
const Order = require('../database/mySQL/schemas/Order');
const Restaurant = require('../database/mySQL/schemas/Restaurant');

const router = Router();

router.post('/orders/makeOrder', async (req, res) => {
  try {
    const { items, userId } = req.body;
    if (!userId || !items.length) {
      return res.status(400).json({ message: 'userId and items required' });
    }
    const user = await User.findByPk(userId);
    const restaurant = await Restaurant.findByPk(items[0].restaurantId);
    const restaurantName = restaurant.name;
    if (!user) {
      return res.status(400).json({ message: 'User not found' });
    }
    await Order.create({ restaurantName, products: [...items], userId });
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
    const orders = await Order.findAll({ where: { userId } });
    res.status(200).json({ orders });
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
    const order = await Order.findByPk(orderId);
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
    const order = await Order.findByPk(orderId);
    if (!order) {
      return res.status(404).json({ message: 'Order not found' });
    }
    await order.update({ status: 'Delivered' });
    res.status(200).json({ message: 'Order has been delivered successfully' });
  } catch(error) {
    res.status(500).json({ message: 'Server error', error });
  }
});

module.exports = router;

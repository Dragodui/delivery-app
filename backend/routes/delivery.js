const { Router } = require('express');
const Order = require('../database/schemas/Order');

const router = Router();

router.get('/delivery/availableOrders', async (req, res) => {
  try {
    const ordersToDeliver = await Order.find({
      status: 'waiting for deliveryman',
    });
    res.json({ orders: ordersToDeliver });
  } catch (error) {
    console.error('Error fetching delivery orders:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

router.post('/delivery/takeOrder', async (req, res) => {
  try {
    const { userId, orderId } = req.body;
    const orderToDeliver = await Order.findById(orderId);
    orderToDeliver.status = 'On the way';
    orderToDeliver.deliverymanId = userId;
    orderToDeliver.save();
    res.status(200).json({ message: 'Order has been taken successfully' });
  } catch (error) {
    console.log(`Error while taking order ${error}`);
    res.status(500).json({ error: 'Internal server error' });
  }
});

router.get(
  '/delivery/currentDeliverymanOrder/:deliverymanId',
  async (req, res) => {
    try {
      const { deliverymanId } = req.params;
      const order = await Order.findOne({
        deliverymanId,
        status: 'On the way',
      });
      if (!order) {
        return res
          .status(404)
          .json({ message: 'No order found for this deliveryman' });
      }
      return res.status(200).json({ order });
    } catch (error) {
      return res.status(500).json({ error: 'Internal server error' });
    }
  },
);

router.post('/delivery/finishOrder/:orderId', async (req, res) => {
  try {
    const { orderId } = req.params;
    const order = await Order.findById(orderId);
    if (!order) {
      res.status(404).json({ message: 'Order not found' });
    }
    order.status = 'Delivered for deliveryman';
    order.save();
    res.status(200).json({ message: 'Order has been delivered successfully' });
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
});

router.get('/delivery/completedOrders/:deliverymanId', async (req, res) => {
  try {
    const {deliverymanId} = req.params;
    console.log(deliverymanId)
    if (!deliverymanId) {
      res.status(400).json({message: 'DeliverymanId must be provided'});
    }
    const orders = await Order.find({deliverymanId});
    res.status(200).json({orders});
    
  } catch (error) {
    res.status(500).json({error: 'Internal server error'});
  }
});

module.exports = router;

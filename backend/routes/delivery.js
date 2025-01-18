const { Router } = require('express');
<<<<<<< HEAD
const { Order } = require('../database/my-sql/schemas/index'); 
=======
const Order = require('../database/mySQL/schemas/Order');
>>>>>>> 380407ef569966f500e44bffa978e93910d86c87

const router = Router();

router.get('/delivery/availableOrders', async (req, res) => {
  try {
<<<<<<< HEAD
    const ordersToDeliver = await Order.findAll({
      where: { status: 'waiting for deliveryman' },
    });
=======
    const ordersToDeliver = await Order.find( {where: {
      status: 'waiting for deliveryman',
    }});
>>>>>>> 380407ef569966f500e44bffa978e93910d86c87
    res.json({ orders: ordersToDeliver });
  } catch (error) {
    console.error('Error fetching delivery orders:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

router.post('/delivery/takeOrder', async (req, res) => {
  try {
    const { userId, orderId } = req.body;
    const orderToDeliver = await Order.findByPk(orderId);
<<<<<<< HEAD

    if (!orderToDeliver) {
      return res.status(404).json({ message: 'Order not found' });
    }

    orderToDeliver.status = 'On the way';
    orderToDeliver.deliverymanId = userId;

    await orderToDeliver.save();
=======
    orderToDeliver.status = 'On the way';
    orderToDeliver.update({deliverymanId: userId});
>>>>>>> 380407ef569966f500e44bffa978e93910d86c87
    res.status(200).json({ message: 'Order has been taken successfully' });
  } catch (error) {
    console.log(`Error while taking order: ${error}`);
    res.status(500).json({ error: 'Internal server error' });
  }
});

router.get(
  '/delivery/currentDeliverymanOrder/:deliverymanId',
  async (req, res) => {
    try {
      const { deliverymanId } = req.params;
<<<<<<< HEAD
      const order = await Order.findOne({
        where: { deliverymanId, status: 'On the way' },
      });

=======
      const order = await Order.findOne({ where:{
        deliverymanId,
        status: 'On the way',
      }});
>>>>>>> 380407ef569966f500e44bffa978e93910d86c87
      if (!order) {
        return res
          .status(404)
          .json({ message: 'No order found for this deliveryman' });
      }

      return res.status(200).json({ order });
    } catch (error) {
      return res.status(500).json({ error: 'Internal server error' });
    }
  }
);

router.post('/delivery/finishOrder/:orderId', async (req, res) => {
  try {
    const { orderId } = req.params;
    const order = await Order.findByPk(orderId);
<<<<<<< HEAD

=======
>>>>>>> 380407ef569966f500e44bffa978e93910d86c87
    if (!order) {
      return res.status(404).json({ message: 'Order not found' });
    }
<<<<<<< HEAD

    order.status = 'Delivered for deliveryman';
    await order.save();

=======
    order.update({ status: 'Delivered for deliveryman' });
>>>>>>> 380407ef569966f500e44bffa978e93910d86c87
    res.status(200).json({ message: 'Order has been delivered successfully' });
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
});

router.get('/delivery/completedOrders/:deliverymanId', async (req, res) => {
  try {
<<<<<<< HEAD
    const { deliverymanId } = req.params;

=======
    const {deliverymanId} = req.params;
>>>>>>> 380407ef569966f500e44bffa978e93910d86c87
    if (!deliverymanId) {
      return res.status(400).json({ message: 'DeliverymanId must be provided' });
    }
<<<<<<< HEAD

    const orders = await Order.findAll({
      where: { deliverymanId, status: 'Delivered for deliveryman' },
    });

    res.status(200).json({ orders });
=======
    const orders = await Order.find({where: {deliverymanId}});
    res.status(200).json({orders});
    
>>>>>>> 380407ef569966f500e44bffa978e93910d86c87
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
});

module.exports = router;

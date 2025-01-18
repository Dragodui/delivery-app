const { Router } = require('express');
const { Order } = require('../database/my-sql/schemas/index'); 


const router = Router();

router.get('/delivery/availableOrders', async (req, res) => {
  try {
    const ordersToDeliver = await Order.findAll({
      where: { status: 'waiting for deliveryman' },
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
    const orderToDeliver = await Order.findByPk(orderId);

    if (!orderToDeliver) {
      return res.status(404).json({ message: 'Order not found' });
    }

    orderToDeliver.status = 'On the way';
    orderToDeliver.deliverymanId = userId;

    await orderToDeliver.save();

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
      const order = await Order.findOne({
        where: { deliverymanId, status: 'On the way' },
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
  }
);

router.post('/delivery/finishOrder/:orderId', async (req, res) => {
  try {
    const { orderId } = req.params;
    const order = await Order.findByPk(orderId);
    if (!order) {
      return res.status(404).json({ message: 'Order not found' });
    }

    order.status = 'Delivered for deliveryman';
    await order.save();


    res.status(200).json({ message: 'Order has been delivered successfully' });
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
});

router.get('/delivery/completedOrders/:deliverymanId', async (req, res) => {
  try {
    const { deliverymanId } = req.params;


    if (!deliverymanId) {
      return res.status(400).json({ message: 'DeliverymanId must be provided' });
    }

    const orders = await Order.findAll({
      where: { deliverymanId, status: 'Delivered for deliveryman' },
    });

    res.status(200).json({ orders });

  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
});

module.exports = router;

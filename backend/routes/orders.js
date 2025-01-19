const { Router } = require('express');
const { User, Order, Restaurant } = require('../database/my-sql/schemas/index');
const logDB = require('../utils/logs');

const router = Router();

/**
 * @swagger
 * /orders/makeOrder:
 *   post:
 *     summary: Создать заказ
 *     description: Создает новый заказ для указанного пользователя и ресторана.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               items:
 *                 type: array
 *                 items:
 *                   type: object
 *                   properties:
 *                     id:
 *                       type: number
 *                       description: ID продукта.
 *                     restaurantId:
 *                       type: number
 *                       description: ID ресторана.
 *               userId:
 *                 type: number
 *                 description: ID пользователя.
 *     responses:
 *       200:
 *         description: Заказ успешно создан.
 *       400:
 *         description: Ошибка в запросе (например, отсутствуют userId или items).
 *       500:
 *         description: Ошибка сервера.
 */
router.post('/orders/makeOrder', async (req, res) => {
  try {
    const { items, userId } = req.body;
    if (!userId || !items.length) {
      return res.status(400).json({ message: 'userId and items required' });
    }
    const user = await User.findByPk(userId);
    await logDB(`Getting user with id: ${userId}`);
    const restaurant = await Restaurant.findByPk(items[0].restaurantId);
    if (!user || !restaurant) {
      return res.status(400).json({ message: 'User or restaurant not found' });
    }
    const restaurantName = restaurant.name;
    const newOrder = await Order.create({
      restaurantName,
      products: JSON.stringify(items),
    });
    await logDB(`Creating new order with data: ${JSON.stringify(newOrder)}`);
    const productIds = items.map((item) => item.id);
    await newOrder.addProducts(productIds);
    await logDB(`Adding products to order: ${JSON.stringify(productIds)}`);
    await user.addOrder(newOrder);
    await logDB(`Adding order to user: ${JSON.stringify(newOrder)}`);
    res.status(200).json({ message: 'Order added successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error });
  }
});
/**
 * @swagger
 * /orders/{userId}:
 *   get:
 *     summary: Получить заказы пользователя
 *     description: Возвращает список всех заказов указанного пользователя.
 *     parameters:
 *       - in: path
 *         name: userId
 *         required: true
 *         schema:
 *           type: number
 *         description: ID пользователя.
 *     responses:
 *       200:
 *         description: Список заказов успешно получен.
 *       400:
 *         description: Не указан userId.
 *       404:
 *         description: Пользователь не найден.
 *       500:
 *         description: Ошибка сервера.
 */
router.get('/orders/:userId', async (req, res) => {
  try {
    const { userId } = req.params;
    if (!userId) {
      return res.status(400).json({ message: 'userId required' });
    }
    const user = await User.findByPk(userId);
    await logDB(`Getting user with id: ${userId}`);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    const orders = await Order.findAll({ where: { userId } });
    await logDB(`Getting orders for user with id: ${userId}`);

    res.status(200).json({ orders: orders });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error });
  }
});

/**
 * @swagger
 * /orders/order/{orderId}:
 *   get:
 *     summary: Получить детали заказа
 *     description: Возвращает информацию о заказе и его продуктах.
 *     parameters:
 *       - in: path
 *         name: orderId
 *         required: true
 *         schema:
 *           type: number
 *         description: ID заказа.
 *     responses:
 *       200:
 *         description: Информация о заказе успешно получена.
 *       400:
 *         description: Не указан orderId.
 *       500:
 *         description: Ошибка сервера.
 */
router.get('/orders/order/:orderId', async (req, res) => {
  try {
    const { orderId } = req.params;
    if (!orderId) {
      return res.status(400).json({ message: 'orderId required' });
    }
    const order = await Order.findByPk(orderId);
    await logDB(`Getting order with id: ${orderId}`);

    const products = await order.getProducts();
    await logDB(`Getting products for order with id: ${orderId}`);
    res.status(200).json({ order, products });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error });
  }
});

/**
 * @swagger
 * /orders/finishOrder/{orderId}:
 *   post:
 *     summary: Завершить заказ
 *     description: Обновляет статус указанного заказа на "Delivered".
 *     parameters:
 *       - in: path
 *         name: orderId
 *         required: true
 *         schema:
 *           type: number
 *         description: ID заказа.
 *     responses:
 *       200:
 *         description: Заказ успешно завершен.
 *       400:
 *         description: Не указан orderId.
 *       404:
 *         description: Заказ не найден.
 *       500:
 *         description: Ошибка сервера.
 */

router.post('/orders/finishOrder/:orderId', async (req, res) => {
  try {
    const { orderId } = req.params;
    if (!orderId) {
      return res.status(400).json({ message: 'orderId required' });
    }
    const order = await Order.findByPk(orderId);
    await logDB(`Getting order with id: ${orderId}`);
    if (!order) {
      return res.status(404).json({ message: 'Order not found' });
    }
    await order.update({ status: 'Delivered' });
    await logDB(`Updating order with id: ${orderId} status to 'Delivered'`);
    res.status(200).json({ message: 'Order has been delivered successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error });
  }
});

module.exports = router;

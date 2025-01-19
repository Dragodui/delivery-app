const { Router } = require('express');
const { User, Product } = require('../database/my-sql/schemas/index');
const { updateSearchIndex } = require('../database/mongo-db/schemas/DBLog');
const logDB = require('../utils/logs');

const router = Router();

/**
 * @swagger
 * /cart/addToCart:
 *   post:
 *     summary: Добавление продукта в корзину
 *     description: Добавляет продукт в корзину пользователя.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               userId:
 *                 type: integer
 *                 description: ID пользователя.
 *               productId:
 *                 type: integer
 *                 description: ID продукта.
 *     responses:
 *       200:
 *         description: Продукт успешно добавлен в корзину.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Product added to cart successfully
 *                 cart:
 *                   type: array
 *                   items:
 *                     type: object
 *                     description: Продукты в корзине.
 *       400:
 *         description: Отсутствуют обязательные параметры.
 *       404:
 *         description: Пользователь или продукт не найден.
 *       500:
 *         description: Ошибка сервера.
 */
router.post('/cart/addToCart', async (req, res) => {
  try {
    const { userId, productId } = req.body;
    if (!userId || !productId) {
      return res
        .status(400)
        .json({ message: 'User ID and Product ID are required' });
    }

    const user = await User.findByPk(userId);
    await logDB(`Getting user with id: ${updateSearchIndex}`);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    const product = await Product.findByPk(productId);
    await logDB(`Getting product with id: ${productId}`);
    if (!product) {
      return res.status(404).json({ message: 'Product not found' });
    }
    await user.addProduct(product);
    await logDB(`Adding new product: ${JSON.stringify(product)}`);

    const updatedCart = await user.getProducts();
    await logDB(`Getting cart from user with id: ${userId}`);
    res.status(200).json({
      message: 'Product added to cart successfully',
      cart: updatedCart,
    });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error });
  }
});

/**
 * @swagger
 * /cart/{userId}:
 *   get:
 *     summary: Получение корзины пользователя
 *     description: Возвращает список всех продуктов в корзине пользователя.
 *     parameters:
 *       - in: path
 *         name: userId
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID пользователя.
 *     responses:
 *       200:
 *         description: Успешное получение корзины.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 cart:
 *                   type: array
 *                   items:
 *                     type: object
 *                     description: Продукты в корзине.
 *       404:
 *         description: Пользователь не найден.
 *       500:
 *         description: Ошибка сервера.
 */
router.get('/cart/:userId', async (req, res) => {
  try {
    const { userId } = req.params;

    const user = await User.findByPk(userId);
    await logDB(`Getting user with id: ${updateSearchIndex}`);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    const products = await user.getProducts();
    await logDB(`Getting products for user with id: ${userId}`);
    res.status(200).json({ cart: products });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error });
  }
});

/**
 * @swagger
 * /cart/removeFromCart:
 *   post:
 *     summary: Удаление продукта из корзины
 *     description: Удаляет указанный продукт из корзины пользователя.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               userId:
 *                 type: integer
 *                 description: ID пользователя.
 *               productId:
 *                 type: integer
 *                 description: ID продукта.
 *     responses:
 *       200:
 *         description: Продукт успешно удалён из корзины.
 *       400:
 *         description: Отсутствуют обязательные параметры.
 *       404:
 *         description: Пользователь или продукт не найден.
 *       500:
 *         description: Ошибка сервера.
 */
router.post('/cart/removeFromCart', async (req, res) => {
  try {
    const { userId, productId } = req.body;

    if (!userId || !productId) {
      return res
        .status(400)
        .json({ message: 'User ID and Product ID are required' });
    }

    const user = await User.findByPk(userId);
    await logDB(`Getting user  with id: ${userId}`);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    const product = await Product.findByPk(productId);
    await logDB(`Getting product  with id: ${productId}`);
    if (!product) {
      return res.status(404).json({ message: 'Product not found' });
    }

    await user.removeProduct(product);
    await logDB(`Remove product from user with id: ${userId}`);

    const updatedCart = await user.getProducts();
    await logDB(`Getting new cart for user with id: ${userId}`);
    res.status(200).json({
      message: 'Product removed from cart successfully',
      cart: updatedCart,
    });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error });
  }
});

/**
 * @swagger
 * /cart/clearCart:
 *   post:
 *     summary: Очистка корзины
 *     description: Удаляет все продукты из корзины пользователя.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               userId:
 *                 type: integer
 *                 description: ID пользователя.
 *     responses:
 *       200:
 *         description: Корзина успешно очищена.
 *       400:
 *         description: Отсутствует ID пользователя.
 *       404:
 *         description: Пользователь не найден.
 *       500:
 *         description: Ошибка сервера.
 */
router.post('/cart/clearCart', async (req, res) => {
  try {
    const { userId } = req.body;

    if (!userId) {
      return res.status(400).json({ message: 'User ID is required' });
    }

    const user = await User.findByPk(userId);
    await logDB(`Getting user with id: ${userId}`);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    await user.setProducts([]);
    await logDB(`Clearing cart for user with id: ${userId}`);

    res.status(200).json({ message: 'Cart cleared successfully', cart: [] });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error });
  }
});

module.exports = router;

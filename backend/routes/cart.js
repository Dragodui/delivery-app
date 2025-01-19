const { Router } = require('express');
const { User, Product } = require('../database/my-sql/schemas/index');
const { updateSearchIndex } = require('../database/mongo-db/schemas/DBLog');
const logDB = require('../utils/logs');

const router = Router();

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

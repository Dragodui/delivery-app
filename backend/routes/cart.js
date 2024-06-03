const { Router } = require('express');
const User = require('../database/schemas/User');
const Product = require('../database/schemas/Product');

const router = Router();

router.post('/cart/addToCart', async (req, res) => {
  try {
    const { userId, productId } = req.body;
    if (!userId || !productId) {
      return res
        .status(400)
        .json({ message: 'User ID and Product ID are required' });
    }
    const user = await User.findById(userId);
    if (!user) {
      return res.status(400).json({ message: 'User not found' });
    }
    const product = await Product.findById(productId);
    if (!product) {
      return res.status(400).json({ message: 'Product not found' });
    }
    user.cart.push(product._id);
    await user.save();
    res
      .status(200)
      .json({ message: 'Product added to cart successfully', cart: user.cart });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error });
  }
});

router.get('/cart/:userId', async (req, res) => {
  try {
    const { userId } = req.params;

    const user = await User.findById(userId).populate('cart');
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    res.status(200).json({ cart: user.cart });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error });
  }
});

router.post('/cart/removeFromCart', async (req, res) => {
  try {
    const { userId, productId } = req.body;

    if (!userId || !productId) {
      res.json({ message: 'User ID and Product ID are required' });
    }
    const user = await User.findById(userId);
    if (!user) {
      res.json({ message: 'User not found' });
    }
    const productIndex = user.cart.indexOf(productId);
    if (productIndex === -1) {
      res.status(400).json({ message: 'Product not found' });
    }
    user.cart.splice(productIndex, 1);
    await user.save();
    res
      .status(200)
      .json({
        message: 'Product removed from cart successfully',
        cart: user.cart,
      });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error });
  }
});


module.exports = router;
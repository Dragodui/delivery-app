const { Router } = require('express');
const { User, Product } = require('../database/my-sql/schemas/index');

const router = Router();

router.post('/cart/addToCart', async (req, res) => {
  try {
    const { userId, productId } = req.body;
    console.log(req.body);
    if (!userId || !productId) {
      return res.status(400).json({ message: 'User ID and Product ID are required' });
    }

    const user = await User.findByPk(userId);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    const product = await Product.findByPk(productId);
    if (!product) {
      return res.status(404).json({ message: 'Product not found' });
    }
    console.log(user);
    console.log(product);
    await user.addProduct(product);

    const updatedCart = await user.getProducts(); 
    res.status(200).json({ 
      message: 'Product added to cart successfully', 
      cart: updatedCart 
    });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error });
  }
});

router.get('/cart/:userId', async (req, res) => {
  try {
    const { userId } = req.params;

    console.log(req.params);
    const user = await User.findByPk(userId);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    const products = await user.getProducts();
    console.log(products);
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
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    const product = await Product.findByPk(productId);
    if (!product) {
      return res.status(404).json({ message: 'Product not found' });
    }

    await user.removeProduct(product);

    const updatedCart = await user.getProducts();
    res.status(200).json({ 
      message: 'Product removed from cart successfully', 
      cart: updatedCart 
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
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    await user.setProducts([]);

    res.status(200).json({ message: 'Cart cleared successfully', cart: [] });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error });
  }
});


module.exports = router;

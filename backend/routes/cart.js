const { Router } = require('express');
<<<<<<< HEAD
const { User, Product } = require('../database/my-sql/schemas/index');
=======
const User = require('../database/mySQL/schemas/User');
const Product = require('../database/mySQL/schemas/Product');
const Cart = require('../database/mySQL/schemas/Cart');
const CartItem = require('../database/mySQL/schemas/CartItem');
>>>>>>> 380407ef569966f500e44bffa978e93910d86c87

const router = Router();

router.post('/cart/addToCart', async (req, res) => {
  try {
<<<<<<< HEAD
    const { userId, productId } = req.body;
    console.log(req.body);
=======
    const { userId, productId, quantity = 1 } = req.body;

>>>>>>> 380407ef569966f500e44bffa978e93910d86c87
    if (!userId || !productId) {
      return res.status(400).json({ message: 'User ID and Product ID are required' });
    }

<<<<<<< HEAD
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
=======
    let cart = await Cart.findOne({ where: { userId } });
    if (!cart) {
      cart = await Cart.create({ userId });
    }

    const [cartItem, created] = await CartItem.findOrCreate({
      where: { cartId: cart.id, productId },
      defaults: { quantity },
    });

    if (!created) {
      cartItem.quantity += quantity;
      await cartItem.save();
    }

    res.status(200).json({ message: 'Product added to cart', cartItem });
>>>>>>> 380407ef569966f500e44bffa978e93910d86c87
  } catch (error) {
    res.status(500).json({ message: 'Server error', error });
  }
});

router.get('/cart/:userId', async (req, res) => {
  try {
    const { userId } = req.params;

<<<<<<< HEAD
    console.log(req.params);
    const user = await User.findByPk(userId);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    const products = await user.getProducts();
    console.log(products);
    res.status(200).json({ cart: products });
=======
    const cart = await Cart.findOne({
      where: { userId },
      include: { model: CartItem, as: 'items' },
    });

    if (!cart) {
      return res.status(404).json({ message: 'Cart not found' });
    }

    res.status(200).json(cart);
>>>>>>> 380407ef569966f500e44bffa978e93910d86c87
  } catch (error) {
    res.status(500).json({ message: 'Server error', error });
  }
});


router.post('/cart/removeFromCart', async (req, res) => {
  try {
    const { userId, productId } = req.body;

    if (!userId || !productId) {
<<<<<<< HEAD
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
=======
      return res.status(400).json({ message: 'User ID and Product ID are required' });
    }

    const cart = await Cart.findOne({ where: { userId } });
    if (!cart) {
      return res.status(404).json({ message: 'Cart not found' });
    }

    const cartItem = await CartItem.findOne({ where: { cartId: cart.id, productId } });
    if (!cartItem) {
      return res.status(404).json({ message: 'Product not found in cart' });
    }

    await cartItem.destroy();
    res.status(200).json({ message: 'Product removed from cart' });
>>>>>>> 380407ef569966f500e44bffa978e93910d86c87
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

<<<<<<< HEAD
    const user = await User.findByPk(userId);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    await user.setProducts([]);

    res.status(200).json({ message: 'Cart cleared successfully', cart: [] });
=======
    const cart = await Cart.findOne({ where: { userId } });
    if (!cart) {
      return res.status(404).json({ message: 'Cart not found' });
    }

    await CartItem.destroy({ where: { cartId: cart.id } });
    res.status(200).json({ message: 'Cart cleared successfully' });
>>>>>>> 380407ef569966f500e44bffa978e93910d86c87
  } catch (error) {
    res.status(500).json({ message: 'Server error', error });
  }
});


module.exports = router;

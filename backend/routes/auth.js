const { Router } = require('express');
const { body, validationResult } = require('express-validator');
<<<<<<< HEAD
const { User } = require('../database/my-sql/schemas/index'); 
=======
>>>>>>> 380407ef569966f500e44bffa978e93910d86c87
const { hashPassword, comparePassword } = require('../utils/helpers');
const jwt = require('jsonwebtoken');
const { secret } = require('../config');
const User = require('../database/mySQL/schemas/User.js');
const Order = require('../database/mySQL/schemas/Order.js');
const Restaurant = require('../database/mySQL/schemas/Restaurant.js');
const Cart = require('../database/mySQL/schemas/Cart.js');
const CartItem = require('../database/mySQL/schemas/CartItem.js');

const router = Router();

const verifyToken = (req, res, next) => {
  const token = req.headers['authorization'];
  if (!token) {
    return res.status(401).json({ message: 'No token provided' });
  }

  jwt.verify(token, secret, (err, decoded) => {
    if (err) {
      return res.status(401).json({ message: 'Invalid token' });
    }
    req.userId = decoded.userId;
    next();
  });
};

<<<<<<< HEAD
=======
// Register a new user
>>>>>>> 380407ef569966f500e44bffa978e93910d86c87
router.post('/register', [
  body('email').isEmail().withMessage('Email is invalid'),
  body('name').notEmpty().withMessage('Name is required'),
  body('password').isLength({ min: 3 }).withMessage('Password must be at least 3 characters long'),
  body('role').notEmpty().withMessage('Role is required'),
], async (req, res) => {
  console.log(User)
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

<<<<<<< HEAD
  const { email, name, role, password } = req.body;

  try {
    const existingUser = await User.findOne({ where: { email } });
    if (existingUser) {
      return res.status(400).json({ message: 'User already exists' });
=======
  const { email, name, password, role } = req.body;

  try {
    const userDB = await User.findOne({ where: { email } });
    if (userDB) {
      return res.status(400).json({ msg: 'User already exists' });
>>>>>>> 380407ef569966f500e44bffa978e93910d86c87
    }

    const hashedPassword = hashPassword(password);
    const newUser = await User.create({ email, name, password: hashedPassword, role });

<<<<<<< HEAD
    res.status(201).json({ message: 'User created successfully', userId: newUser.id });
  } catch (err) {
    console.error('Error registering user:', err);
=======
    res.status(201).json(newUser);
  } catch (error) {
    console.error('Error creating user:', error);
>>>>>>> 380407ef569966f500e44bffa978e93910d86c87
    res.status(500).json({ message: 'Server error' });
  }
});

<<<<<<< HEAD
=======
// Login
>>>>>>> 380407ef569966f500e44bffa978e93910d86c87
router.post('/login', [
  body('email').isEmail().withMessage('Email is invalid'),
  body('password').notEmpty().withMessage('Password is required'),
], async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const { email, password } = req.body;

  try {
<<<<<<< HEAD
    const user = await User.findOne({ where: { email } });
    if (!user) {
      return res.status(401).json({ message: 'User does not exist' });
    }

    const isValid = comparePassword(password, user.password);
    if (!isValid) {
      return res.status(401).json({ message: 'Password is incorrect' });
    }

    const token = jwt.sign({ userId: user.id }, secret, { expiresIn: '24h' });
    res.json({ token });
  } catch (err) {
    console.error('Error during login:', err);
=======
    const userDB = await User.findOne({ where: { email } });
    if (!userDB) {
      return res.status(401).json({ message: 'User does not exist' });
    }

    const isValid = comparePassword(password, userDB.password);
    if (isValid) {
      const token = jwt.sign({ userId: userDB.id }, secret, {
        expiresIn: '24h',
      });

      return res.json({ token });
    } else {
      return res.status(401).json({ message: 'Password is incorrect' });
    }
  } catch (error) {
    console.error('Error logging in:', error);
>>>>>>> 380407ef569966f500e44bffa978e93910d86c87
    res.status(500).json({ message: 'Server error' });
  }
});

<<<<<<< HEAD
router.post('/logout', verifyToken, (req, res) => {
  res.status(200).json({ message: 'Logout successful' });
});

=======
// // Logout
// router.post('/logout', verifyToken, (req, res) => {
//   res.status(200).json({ message: 'Logout successful' });
// });

// Check authentication
>>>>>>> 380407ef569966f500e44bffa978e93910d86c87
router.get('/checkAuth', verifyToken, (req, res) => {
  res.status(200).json({ authenticated: true });
});

<<<<<<< HEAD
router.get('/currentUser', verifyToken, async (req, res) => {
  try {
    const user = await User.findByPk(req.userId);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    res.status(200).json(user);
  } catch (err) {
    console.error('Error fetching user:', err);
=======
// Get current user
router.get('/currentUser', verifyToken, async (req, res) => {
  try {
    const user = await User.findByPk(req.userId);
    const orders = await Order.findAll({ where: { userId: req.userId } });
    const restaurants = await Restaurant.findAll({ where: { ownerId: req.userId } }); 
    const cart = await Cart.findOne({ where: { userId: req.userId }, include: { model: CartItem, as: 'items' } });
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    res.json({ ...user.toJSON(), orders, restaurants, cart });
  } catch (error) {
    console.error('Error fetching user:', error);
>>>>>>> 380407ef569966f500e44bffa978e93910d86c87
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;

const { Router } = require('express');
const { body, validationResult } = require('express-validator');
const { User } = require('../database/my-sql/schemas/index');

const { hashPassword, comparePassword } = require('../utils/helpers');
const jwt = require('jsonwebtoken');
const { secret } = require('../config');
const logDB = require('../utils/logs');

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

router.post(
  '/register',
  [
    body('email').isEmail().withMessage('Email is invalid'),
    body('name').notEmpty().withMessage('Name is required'),
    body('password')
      .isLength({ min: 3 })
      .withMessage('Password must be at least 3 characters long'),
    body('role').notEmpty().withMessage('Role is required'),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { email, name, role, password } = req.body;

    try {
      const existingUser = await User.findOne({ where: { email } });
      await logDB(`Check if user unique with email: ${email}`);
      if (existingUser) {
        return res.status(400).json({ message: 'User already exists' });
      }

      const hashedPassword = hashPassword(password);
      const newUser = await User.create({
        email,
        name,
        password: hashedPassword,
        role,
      });
      await logDB(`User registered with data ${(email, name, role)}`);

      res
        .status(201)
        .json({ message: 'User created successfully', userId: newUser.id });
    } catch (err) {
      console.error('Error registering user:', err);
      res.status(500).json({ message: 'Server error' });
    }
  }
);

router.post(
  '/login',
  [
    body('email').isEmail().withMessage('Email is invalid'),
    body('password').notEmpty().withMessage('Password is required'),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { email, password } = req.body;

    try {
      const user = await User.findOne({ where: { email } });
      await logDB(`Getting user with email: ${email}`);
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
      res.status(500).json({ message: 'Server error' });
    }
  }
);

router.post('/logout', verifyToken, (req, res) => {
  res.status(200).json({ message: 'Logout successful' });
});

router.get('/checkAuth', verifyToken, (req, res) => {
  res.status(200).json({ authenticated: true });
});

router.get('/currentUser', verifyToken, async (req, res) => {
  try {
    const user = await User.findByPk(req.userId);
    await logDB(`Getting user with id: ${req.userId}`);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    res.status(200).json(user);
  } catch (err) {
    console.error('Error fetching user:', err);
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;

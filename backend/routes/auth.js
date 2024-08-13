const { Router } = require('express');
const { body, validationResult } = require('express-validator');
const User = require('../database/schemas/User');
const { hashPassword, comparePassword } = require('../utils/helpers');
const jwt = require('jsonwebtoken');
const { secret } = require('../config');

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

const verifyTokenForLogin = (req, res, next) => {
  const token = req.headers['authorization'];
  if (!token) {
    return res.status(401).json({ message: 'Unauthorized' });
  }
  next();
};
//api запрос по пути регистр сервер работает на хосте создание пользователя 
router.post('/register', [
  body('email').isEmail().withMessage('Email is invalid'),
  body('name').notEmpty().withMessage('Name is required'),
  body('password').isLength({ min: 3 }).withMessage('Password must be at least 3 characters long'),
  body('role').notEmpty().withMessage('Role is required'),
], async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const { email, name, role } = req.body;
  const userDB = await User.findOne({ email });
  if (userDB) {
    res.status(400).send({ msg: 'User already exists' });
  } else {
    const password = hashPassword(req.body.password);

    const newUser = await User.create({ email, name, password, role });
    await newUser.save();
    res.sendStatus(201);
  }
});
//login
router.post('/login', [
  body('email').isEmail().withMessage('Email is invalid'),
  body('password').notEmpty().withMessage('Password is required'),
  body('password').isLength({ min: 3 }).withMessage('Password must be at least 3 characters long')
], async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const { email, password } = req.body;
  const userDB = await User.findOne({ email });
  if (!userDB) return res.status(401).send('User does not exist');
  const isValid = comparePassword(password, userDB.password);

  if (isValid) {//новая сессия 
    console.log('success');
    req.session.user = userDB;
    const token = jwt.sign({ userId: req.session.user._id }, secret, {
      expiresIn: '24h',
    });
    return res.json({ token });
  } else {
    console.log('error');
    return res.status(401).send('Password is incorrect');
  }
});
//log out
router.post('/logout', verifyToken, (req, res) => {
  res.status(200).json({ message: 'Logout successful' });
});
//проверка авторизации
router.get('/checkAuth', verifyToken, (req, res) => {
  console.log('auth check');
  res.status(200).json({ authenticated: true });
});
//понять какой сейчас юзер
router.get('/currentUser', verifyToken, async (req, res) => {
  try {
    const user = await User.findById(req.userId);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    res.json(user);
  } catch (error) {
    console.error('Error fetching user:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;

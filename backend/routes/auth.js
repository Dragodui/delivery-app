const { Router } = require('express');
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

router.post('/register', async (req, res) => {
  const { email, name, role } = req.body;
  const userDB = await User.findOne({ email });
  if (userDB) {
    res.status(400).send({ msg: 'user already exist' });
  } else {
    const password = hashPassword(req.body.password);

    const newUser = await User.create({ email, name, password, role });
    await newUser.save();
    res.send(201);
  }
});

router.post('/login', async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password)
    return res.status(400).send('Email or password are not given');
  const userDB = await User.findOne({ email });
  if (!userDB) return res.status(401).send('User does not exists');
  const isValid = comparePassword(password, userDB.password);

  if (isValid) {
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

router.post('/logout', verifyTokenForLogin, (req, res) => {
  res.status(200).json({ message: 'Logout successful' });
});

router.get('/checkAuth', verifyTokenForLogin, (req, res) => {
  console.log('auth check');
  res.status(200).json({ authenticated: true });
});

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
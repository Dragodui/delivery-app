const { Router } = require('express');
const {
  Restaurant,
  User,
  Review,
} = require('../database/my-sql/schemas/index');
const logDB = require('../utils/logs');

const router = Router();

router.get('/user/getUser/:userId', async (req, res) => {
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

    res.status(200).json(user);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error });
  }
});

router.post('/user/newReview/:resId', async (req, res) => {
  try {
    const { resId } = req.params;
    const { userId, opinion, rate } = req.body;

    if (!resId) {
      return res.status(400).json({ message: 'Restaurant ID is required' });
    }

    const restaurant = await Restaurant.findByPk(resId);
    await logDB(`Getting restaurant with id: ${resId}`);
    if (!restaurant) {
      return res.status(400).json({ message: 'Restaurant not found' });
    }

    const user = await User.findByPk(userId);
    await logDB(`Getting user with id: ${userId}`);
    if (!user) {
      return res.status(400).json({ message: 'User not found' });
    }

    const resIdAndUserId = `${resId}${userId}`;

    const newReview = await Review.create({
      rate,
      opinion,
      resId,
      userId,
      resIdAndUserId,
    });
    await logDB(`Creating new review: ${JSON.stringify(newReview)}`);
    restaurant.addReview(newReview);
    await logDB(`Adding review to restaurant: ${JSON.stringify(newReview)}`);
    user.addReview(newReview);
    await logDB(`Adding review to user: ${JSON.stringify(newReview)}`);

    res.status(200).json({ message: 'Review successfully created' });
  } catch (error) {
    if (error.name === 'SequelizeUniqueConstraintError') {
      res
        .status(400)
        .json({ message: 'You already have reviewed this restaurant' });
    } else {
      res.status(500).json({ message: 'Server error', error });
    }
  }
});

module.exports = router;

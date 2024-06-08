const { Router } = require('express');
const Restaurant = require('../database/schemas/Restaurant');
const User = require('../database/schemas/User');
const Review = require('../database/schemas/Review');

const router = Router();

router.get('/user/getUser/:userId', async (req, res) => {
   try {
    const {userId} = req.params;

    if (!userId) {
        return res.status(400).json({ message: 'userId required' });
    };
    const user = await User.findById(userId);
    if (!user) {
        return res.status(404).json({ message: 'User not found' });
    }

    res.status(200).json(user);
   } catch(error) {
    res.status(500).json({ message: 'Server error', error });
   }
});

router.post('/user/newReview/:resId', async (req, res) => {
  try {
    const { resId } = req.params;
    const { userId, rate, opinion } = req.body;

    if (!resId) {
      return res.status(400).json({ message: 'Restaurant ID is required' });
    }

    const restaurant = await Restaurant.findById(resId);
    if (!restaurant) {
      return res.status(400).json({ message: 'Restaurant not found' });
    }

    const user = await User.findById(userId);
    if (!user) {
      return res.status(400).json({ message: 'User not found' });
    }

    const newReview = new Review({ rate, opinion, resId, userId });
    await newReview.save();

    restaurant.reviews.push(newReview);
    await restaurant.save();

    user.reviews.push(newReview);
    await user.save();

    res.status(200).json({message: 'Review successfully created'});
  } catch (error) {
    res.status(500).json({ message: 'Server error', error });
  }
});

module.exports = router;

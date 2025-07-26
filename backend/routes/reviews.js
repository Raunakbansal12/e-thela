const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const Review = require('../../models/Review');

// JWT Auth Middleware
function authMiddleware(req, res, next) {
  const token = req.headers['authorization']?.split(' ')[1];
  if (!token) return res.status(401).json({ message: 'No token provided.' });
  jwt.verify(token, process.env.JWT_SECRET || 'secret', (err, decoded) => {
    if (err) return res.status(401).json({ message: 'Invalid token.' });
    req.user = decoded;
    next();
  });
}

// POST /reviews - Submit a review
router.post('/', authMiddleware, async (req, res) => {
  try {
    const { subjectId, rating, comment } = req.body;
    if (!subjectId || !rating) return res.status(400).json({ message: 'Missing fields.' });
    const review = new Review({
      authorId: req.user.id,
      subjectId,
      rating,
      comment,
    });
    await review.save();
    res.status(201).json(review);
  } catch (err) {
    res.status(500).json({ message: 'Server error.' });
  }
});

// GET /reviews/:userId - Get all reviews for a user
router.get('/:userId', async (req, res) => {
  try {
    const reviews = await Review.find({ subjectId: req.params.userId }).populate('authorId', 'fullName role');
    res.json(reviews);
  } catch (err) {
    res.status(500).json({ message: 'Server error.' });
  }
});

module.exports = router; 
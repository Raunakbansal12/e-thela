const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const Listing = require('../../models/Listing');
const User = require('../../models/User');

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

// Role check middleware
function vendorOnly(req, res, next) {
  if (req.user.role !== 'STREET_VENDOR') return res.status(403).json({ message: 'Access denied.' });
  next();
}

// Create Listing
router.post('/', authMiddleware, vendorOnly, async (req, res) => {
  try {
    const { title, description, price, image } = req.body;
    const listing = new Listing({
      vendorId: req.user.id,
      title,
      description,
      price,
      image,
    });
    await listing.save();
    res.status(201).json(listing);
  } catch (err) {
    res.status(500).json({ message: 'Server error.' });
  }
});

// Get all listings for this vendor
router.get('/mine', authMiddleware, vendorOnly, async (req, res) => {
  try {
    const listings = await Listing.find({ vendorId: req.user.id });
    res.json(listings);
  } catch (err) {
    res.status(500).json({ message: 'Server error.' });
  }
});

// Update listing
router.put('/:id', authMiddleware, vendorOnly, async (req, res) => {
  try {
    const listing = await Listing.findOneAndUpdate(
      { _id: req.params.id, vendorId: req.user.id },
      req.body,
      { new: true }
    );
    if (!listing) return res.status(404).json({ message: 'Listing not found.' });
    res.json(listing);
  } catch (err) {
    res.status(500).json({ message: 'Server error.' });
  }
});

// Delete listing
router.delete('/:id', authMiddleware, vendorOnly, async (req, res) => {
  try {
    const listing = await Listing.findOneAndDelete({ _id: req.params.id, vendorId: req.user.id });
    if (!listing) return res.status(404).json({ message: 'Listing not found.' });
    res.json({ message: 'Listing deleted.' });
  } catch (err) {
    res.status(500).json({ message: 'Server error.' });
  }
});

// Public: Get all listings (for customer feed)
router.get('/', async (req, res) => {
  try {
    const listings = await Listing.find().populate('vendorId', 'fullName phone');
    res.json(listings);
  } catch (err) {
    res.status(500).json({ message: 'Server error.' });
  }
});

module.exports = router; 
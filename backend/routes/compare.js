const express = require('express');
const router = express.Router();
const Product = require('../models/Product');
const User = require('../models/User');
const Review = require('../models/Review');

// Mock mandi prices
const mandiPrices = {
  'Onions': 20,
  'Potatoes': 15,
  'Tomatoes': 25,
  'Chilli Powder': 120,
  'Salt': 10,
};

// GET /compare-price/:name
router.get('/:name', async (req, res) => {
  const name = req.params.name;
  // Mock mandi price
  const mandiPrice = mandiPrices[name] || Math.floor(Math.random() * 100) + 10;
  // Find all products with this name
  const products = await Product.find({ name: new RegExp('^' + name + '$', 'i') }).populate('supplierId');
  // For demo, mock distance and rating
  const results = await Promise.all(products.map(async (prod) => {
    // Mock distance (random 1-20 km)
    const distance = (Math.random() * 19 + 1).toFixed(1);
    // Calculate average rating for supplier
    const reviews = await Review.find({ subjectId: prod.supplierId._id });
    const avgRating = reviews.length ? (reviews.reduce((sum, r) => sum + r.rating, 0) / reviews.length).toFixed(2) : null;
    return {
      supplierName: prod.supplierId.fullName,
      price: prod.price,
      distance: Number(distance),
      rating: avgRating,
      phone: prod.supplierId.phone,
    };
  }));
  // Sort by distance
  results.sort((a, b) => a.distance - b.distance);
  res.json({ mandiPrice, suppliers: results });
});

module.exports = router; 
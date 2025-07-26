const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const Product = require('../models/Product');
const User = require('../models/User');

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
function supplierOnly(req, res, next) {
  if (req.user.role !== 'SUPPLIER') return res.status(403).json({ message: 'Access denied.' });
  next();
}

// Create Product
router.post('/', authMiddleware, supplierOnly, async (req, res) => {
  try {
    const { name, description, price, unit, image } = req.body;
    const product = new Product({
      supplierId: req.user.id,
      name,
      description,
      price,
      unit,
      image,
    });
    await product.save();
    res.status(201).json(product);
  } catch (err) {
    res.status(500).json({ message: 'Server error.' });
  }
});

// Get all products for this supplier
router.get('/mine', authMiddleware, supplierOnly, async (req, res) => {
  try {
    const products = await Product.find({ supplierId: req.user.id });
    res.json(products);
  } catch (err) {
    res.status(500).json({ message: 'Server error.' });
  }
});

// Update product
router.put('/:id', authMiddleware, supplierOnly, async (req, res) => {
  try {
    const product = await Product.findOneAndUpdate(
      { _id: req.params.id, supplierId: req.user.id },
      req.body,
      { new: true }
    );
    if (!product) return res.status(404).json({ message: 'Product not found.' });
    res.json(product);
  } catch (err) {
    res.status(500).json({ message: 'Server error.' });
  }
});

// Delete product
router.delete('/:id', authMiddleware, supplierOnly, async (req, res) => {
  try {
    const product = await Product.findOneAndDelete({ _id: req.params.id, supplierId: req.user.id });
    if (!product) return res.status(404).json({ message: 'Product not found.' });
    res.json({ message: 'Product deleted.' });
  } catch (err) {
    res.status(500).json({ message: 'Server error.' });
  }
});

// Public: Get all products (for vendor feed)
router.get('/', async (req, res) => {
  try {
    const products = await Product.find().populate('supplierId', 'fullName phone');
    res.json(products);
  } catch (err) {
    res.status(500).json({ message: 'Server error.' });
  }
});

module.exports = router; 
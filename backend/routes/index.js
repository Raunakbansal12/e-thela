const express = require('express');
const router = express.Router();

router.use('/auth', require('./auth'));
router.use('/profile', require('./profile'));
router.use('/products', require('./products'));
router.use('/listings', require('./listings'));
router.use('/compare-price', require('./compare'));
router.use('/reviews', require('./reviews'));

module.exports = router; 
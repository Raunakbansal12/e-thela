const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
  supplierId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  name: { type: String, required: true },
  description: { type: String },
  price: { type: Number, required: true },
  unit: { type: String, required: true }, // e.g., "kg", "litre", "packet"
  image: { type: String }, // URL
});

module.exports = mongoose.model('Product', productSchema); 
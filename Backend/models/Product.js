const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
  productName: { type: String, required: true },
  tagline: { type: String },
  description: { type: String, required: true },
  volume: { type: String, required: true },
  alcoholPercent: { type: String },
  actualPrice: { type: String },
  discount: { type: String },
  sellingPrice: { type: String, required: true },
  stock: { type: String },
  category: { type: String, required: true },
  origin: { type: String },
  brand: { type: String, required: true },
  imageUrl: { type: String, required: true }, // This will hold the URL from ImageKit
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Product', productSchema);

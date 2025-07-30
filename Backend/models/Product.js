const mongoose = require('mongoose');

const ProductSchema = new mongoose.Schema({
  name: String,
  tagline: String,
  description: String,
  volume: String,
  alcoholPercent: String,
  actualPrice: String,
  discount: String,
  price: String,
  stock: String,
  category: String,
  subcategory: String,
  origin: String,
  brand: String,
  image: String,
  onSale: { type: Boolean, default: false },
  bestSeller: { type: Boolean, default: false },   // ✅ New
  trending: { type: Boolean, default: false },     // ✅ New
  newArrival: { type: Boolean, default: false },   // ✅ New
});

module.exports = mongoose.model('Product', ProductSchema);

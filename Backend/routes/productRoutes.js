const express = require('express');
const router = express.Router();
const { getAllProducts, createProduct } = require('../controllers/productController');

// GET all products
router.get('/', getAllProducts);

// ✅ POST to add a product
router.post('/', createProduct);

module.exports = router;

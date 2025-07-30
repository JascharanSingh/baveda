const express = require('express');
const router = express.Router();
const {
  getAllProducts,
  createProduct,
  updateProduct,
  deleteProduct,
} = require('../controllers/productController');

// GET all products
router.get('/', getAllProducts);

// POST to add a product
router.post('/', createProduct);

// PUT to update a product
router.put('/:id', updateProduct);

// DELETE a product
router.delete('/:id', deleteProduct);

module.exports = router;

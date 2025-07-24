const express = require('express');
const router = express.Router();
const { getAllProducts } = require('../controllers/productController');

// Route to fetch all products
router.get('/', getAllProducts);



module.exports = router;
// ✅ productController.js
const Product = require("../models/Product");

// GET all products
exports.getAllProducts = async (req, res) => {
  try {
    const products = await Product.find();
    res.json(products);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// CREATE product
exports.createProduct = async (req, res) => {
  try {
    console.log("📥 Creating Product:", req.body);
    const newProduct = new Product({
      name: req.body.name,
      price: req.body.price,
      description: req.body.description,
      image: req.body.image,
      category: req.body.category,
      subcategory: req.body.subcategory,
      onSale: req.body.onSale,
      brand: req.body.brand,
      volume: req.body.volume,
      bestSeller: req.body.bestSeller || false,
      trending: req.body.trending || false,
      newArrival: req.body.newArrival || false,
    });

    await newProduct.save();
    res.status(201).json(newProduct);
  } catch (err) {
    console.error("❌ Error in createProduct:", err);
    res.status(500).json({ message: err.message });
  }
};

// UPDATE product
exports.updateProduct = async (req, res) => {
  try {
    const updated = await Product.findByIdAndUpdate(
      req.params.id,
      {
        name: req.body.name,
        price: req.body.price,
        description: req.body.description,
        image: req.body.image,
        category: req.body.category,
        subcategory: req.body.subcategory,
        onSale: req.body.onSale,
        brand: req.body.brand,
        volume: req.body.volume,
        bestSeller: req.body.bestSeller || false,
        trending: req.body.trending || false,
        newArrival: req.body.newArrival || false,
      },
      { new: true }
    );

    res.json(updated);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// DELETE product
exports.deleteProduct = async (req, res) => {
  try {
    await Product.findByIdAndDelete(req.params.id);
    res.json({ message: "Product deleted" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

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
    console.log("📥 Creating Product:", req.body); // ✅ Full payload log
    console.log("✅ Volume:", req.body.volume);
    console.log("✅ Brand:", req.body.brand);

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
        brand: req.body.brand, // ✅ include brand
        volume: req.body.volume, // ✅ include volume
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

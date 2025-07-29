const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
require("dotenv").config();

// Import route modules
const productRoutes = require("./routes/productRoutes");
const imagekitRoutes = require("./routes/imagekit");

const app = express();

// Middleware
app.use(cors({
  origin: "*"
}));

app.use(express.json());

// MongoDB connection
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("✅ MongoDB connected"))
  .catch((err) => console.error("❌ Mongo Error:", err));

// API Routes
app.use("/api/products", productRoutes);
app.use("/api/imagekit", imagekitRoutes);

// Start server
const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});

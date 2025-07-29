const express = require("express");
const router = express.Router();
const ImageKit = require("imagekit");
require("dotenv").config();

const imagekit = new ImageKit({
  publicKey: process.env.IMAGEKIT_PUBLIC_KEY,
  privateKey: process.env.IMAGEKIT_PRIVATE_KEY,
  urlEndpoint: process.env.IMAGEKIT_URL_ENDPOINT,
});

router.get("/auth", (req, res) => {
  try {
    const result = imagekit.getAuthenticationParameters();
    res.json(result);
  } catch (err) {
    console.error("ImageKit Auth Error:", err);
    res.status(500).json({ error: "Failed to authenticate" });
  }
});

module.exports = router;

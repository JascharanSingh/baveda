const express = require('express');
const cors = require('cors');//catcher which catch request from frontend
const dotenv = require('dotenv');
const connectDB = require('./config/db');

// Load env variables
dotenv.config();

// Connect to DB
connectDB();

const app = express();
app.use(cors());
app.use(express.json());





// Test route
app.get('/', (req, res) => res.send('API Running'));


app.use('/api/products', require('./routes/productRoutes'));















const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
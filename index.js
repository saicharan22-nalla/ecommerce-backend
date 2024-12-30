const express = require('express');
const bodyParser = require('body-parser');
const dotenv = require('dotenv');
const db = require('./src/database/db'); // Database connection
const cartRoutes = require('./src/routes/cart');
const paymentRoutes = require('./src/routes/payment');

// Load environment variables
dotenv.config();

// Initialize Express app
const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(bodyParser.json());


app.use('/cart', cartRoutes);
app.use('/payment', paymentRoutes); // Payment-related endpoints

// Default route
app.get('/', (req, res) => {
  res.send('E-commerce Backend with SQLite3 is running!');
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});



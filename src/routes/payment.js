const express = require('express');
const { createOrder } = require('../services/cashfreeService');
const router = express.Router();

router.post('/payment/initiate', async (req, res) => {
  const { userId, cartId, email, phone } = req.body;

  // Assuming a total of 1000 for simplicity
  try {
    const orderResponse = await createOrder(`ORD_${cartId}`, 1000, email, phone);
    res.status(200).json(orderResponse);
  } catch (error) {
    res.status(500).json({ error: 'Failed to initiate payment' });
  }
});

module.exports = router;

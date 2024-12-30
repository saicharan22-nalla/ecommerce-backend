const axios = require('axios');
const config = require('../config/config');

const createOrder = async (orderId, orderAmount, customerEmail, customerPhone) => {
  try {
    const response = await axios.post(
      `${config.cashfree.baseUrl}/pg/orders`,
      {
        orderId,
        orderAmount,
        orderCurrency: 'INR',
        customerEmail,
        customerPhone,
        returnUrl: 'https://yourdomain.com/payment/callback',
      },
      {
        headers: {
          'Content-Type': 'application/json',
          'x-client-id': config.cashfree.appId,
          'x-client-secret': config.cashfree.secretKey,
        },
      }
    );
    return response.data;
  } catch (error) {
    console.error('Error creating order:', error.response?.data || error.message);
    throw error;
  }
};

module.exports = { createOrder };

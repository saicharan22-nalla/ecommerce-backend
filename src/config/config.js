require("dotenv").config();

module.exports = {
  app: {
    port: process.env.PORT || 3000,
  },
  database: {
    path: process.env.DATABASE_PATH || './ecommerce.db',
  },
  cashfree: {
    appId: process.env.CASHFREE_APP_ID,
    secretKey: process.env.CASHFREE_SECRET_KEY,
    mode: process.env.CASHFREE_MODE || 'TEST',
    baseUrl: process.env.CASHFREE_MODE === 'LIVE'
      ? 'https://api.cashfree.com'
      : 'https://sandbox.cashfree.com',
  },
};

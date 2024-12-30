const db = require('../database/db');

const Order = {
  create: (userId, cartId, status, paymentId, callback) => {
    const query = `INSERT INTO orders (user_id, cart_id, status, payment_id) VALUES (?, ?, ?, ?)`;
    db.run(query, [userId, cartId, status, paymentId], function (err) {
      if (err) return callback(err);
      callback(null, { id: this.lastID });
    });
  },

  findById: (id, callback) => {
    const query = `SELECT * FROM orders WHERE id = ?`;
    db.get(query, [id], (err, row) => {
      callback(err, row);
    });
  },

  updateStatus: (id, status, callback) => {
    const query = `UPDATE orders SET status = ? WHERE id = ?`;
    db.run(query, [status, id], (err) => {
      callback(err);
    });
  },
};

module.exports = Order;

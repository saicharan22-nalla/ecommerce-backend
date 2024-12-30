const db = require('../database/db');

const Cart = {
  create: (userId, callback) => {
    const query = `INSERT INTO carts (user_id) VALUES (?)`;
    db.run(query, [userId], function (err) {
      if (err) return callback(err);
      callback(null, { id: this.lastID });
    });
  },

  findByUserId: (userId, callback) => {
    const query = `SELECT * FROM carts WHERE user_id = ?`;
    db.get(query, [userId], (err, row) => {
      callback(err, row);
    });
  },

  updateTotal: (cartId, totalAmount, callback) => {
    const query = `UPDATE carts SET total_amount = ? WHERE id = ?`;
    db.run(query, [totalAmount, cartId], (err) => {
      callback(err);
    });
  },
};

module.exports = Cart;

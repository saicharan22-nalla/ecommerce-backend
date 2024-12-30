const db = require('../database/db');

const Product = {
  create: (name, price, stock, callback) => {
    const query = `INSERT INTO products (name, price, stock) VALUES (?, ?, ?)`;
    db.run(query, [name, price, stock], function (err) {
      if (err) return callback(err);
      callback(null, { id: this.lastID });
    });
  },

  findById: (id, callback) => {
    const query = `SELECT * FROM products WHERE id = ?`;
    db.get(query, [id], (err, row) => {
      callback(err, row);
    });
  },

  updateStock: (id, quantity, callback) => {
    const query = `UPDATE products SET stock = stock - ? WHERE id = ?`;
    db.run(query, [quantity, id], (err) => {
      callback(err);
    });
  },
};

module.exports = Product;

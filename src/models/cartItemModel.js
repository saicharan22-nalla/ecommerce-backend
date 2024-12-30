const db = require('../database/db');

const CartItem = {
  addItem: (cartId, productId, quantity, callback) => {
    const query = `INSERT INTO cart_items (cart_id, product_id, quantity) VALUES (?, ?, ?)`;
    db.run(query, [cartId, productId, quantity], (err) => {
      callback(err);
    });
  },

  findByCartId: (cartId, callback) => {
    const query = `
      SELECT products.name, products.price, cart_items.quantity 
      FROM cart_items
      JOIN products ON products.id = cart_items.product_id
      WHERE cart_items.cart_id = ?
    `;
    db.all(query, [cartId], (err, rows) => {
      callback(err, rows);
    });
  },
};

module.exports = CartItem;

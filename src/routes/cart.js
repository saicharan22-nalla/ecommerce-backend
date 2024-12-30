const express = require('express');
const db = require('../database/db'); // SQLite3 database connection
const router = express.Router();

// Add an item to the cart
router.post('/add', (req, res) => {
  const { userId, productId, quantity } = req.body;

  if (!userId || !productId || !quantity) {
    return res.status(400).json({ error: 'Missing required fields' });
  }

  const query = `
    INSERT INTO cart_items (cart_id, product_id, quantity)
    SELECT c.id, ?, ?
    FROM carts c
    WHERE c.user_id = ?;
  `;
  
  db.run(query, [productId, quantity, userId], function (err) {
    if (err) {
      console.error('Error adding item to cart:', err.message);
      return res.status(500).json({ error: 'Failed to add item to cart' });
    }
    res.status(201).json({ message: 'Item added to cart', itemId: this.lastID });
  });
});

// Update an item in the cart
router.put('/update', (req, res) => {
  const { cartItemId, quantity } = req.body;

  if (!cartItemId || !quantity) {
    return res.status(400).json({ error: 'Missing required fields' });
  }

  const query = `
    UPDATE cart_items
    SET quantity = ?
    WHERE id = ?;
  `;

  db.run(query, [quantity, cartItemId], function (err) {
    if (err) {
      console.error('Error updating cart item:', err.message);
      return res.status(500).json({ error: 'Failed to update cart item' });
    }
    if (this.changes === 0) {
      return res.status(404).json({ error: 'Cart item not found' });
    }
    res.json({ message: 'Cart item updated successfully' });
  });
});

// Remove an item from the cart
router.delete('/remove', (req, res) => {
  const { cartItemId } = req.body;

  if (!cartItemId) {
    return res.status(400).json({ error: 'Missing required fields' });
  }

  const query = `
    DELETE FROM cart_items
    WHERE id = ?;
  `;

  db.run(query, [cartItemId], function (err) {
    if (err) {
      console.error('Error removing cart item:', err.message);
      return res.status(500).json({ error: 'Failed to remove cart item' });
    }
    if (this.changes === 0) {
      return res.status(404).json({ error: 'Cart item not found' });
    }
    res.json({ message: 'Cart item removed successfully' });
  });
});

// Fetch cart details for a user
router.get('/details', (req, res) => {
  const { userId } = req.query;

  if (!userId) {
    return res.status(400).json({ error: 'Missing required query parameter: userId' });
  }

  const query = `
    SELECT ci.id AS cartItemId, p.name AS productName, p.price, ci.quantity
    FROM cart_items ci
    JOIN carts c ON ci.cart_id = c.id
    JOIN products p ON ci.product_id = p.id
    WHERE c.user_id = ?;
  `;

  db.all(query, [userId], (err, rows) => {
    if (err) {
      console.error('Error fetching cart details:', err.message);
      return res.status(500).json({ error: 'Failed to fetch cart details' });
    }
    res.json({ cartItems: rows });
  });
});

module.exports = router;

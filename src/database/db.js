const sqlite3 = require('sqlite3').verbose();
const path = require('path');

// Database file location
const dbPath = process.env.DATABASE_PATH || './ecommerce.db';

// Initialize SQLite database
const db = new sqlite3.Database(dbPath, (err) => {
  if (err) {
    console.error('Error connecting to SQLite database:', err.message);
  } else {
    console.log('Connected to SQLite database.');
    initializeTables();
  }
});

// Create tables if they don't exist
function initializeTables() {
  const userTable = `
    CREATE TABLE IF NOT EXISTS users (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      email TEXT NOT NULL UNIQUE,
      phone TEXT
    )
  `;

  const productTable = `
    CREATE TABLE IF NOT EXISTS products (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      name TEXT NOT NULL,
      price REAL NOT NULL,
      stock INTEGER NOT NULL
    )
  `;

  const cartTable = `
    CREATE TABLE IF NOT EXISTS carts (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      user_id INTEGER NOT NULL,
      total_amount REAL DEFAULT 0,
      FOREIGN KEY (user_id) REFERENCES users (id)
    )
  `;

  const cartItemTable = `
    CREATE TABLE IF NOT EXISTS cart_items (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      cart_id INTEGER NOT NULL,
      product_id INTEGER NOT NULL,
      quantity INTEGER NOT NULL,
      FOREIGN KEY (cart_id) REFERENCES carts (id),
      FOREIGN KEY (product_id) REFERENCES products (id)
    )
  `;

  const orderTable = `
    CREATE TABLE IF NOT EXISTS orders (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      user_id INTEGER NOT NULL,
      cart_id INTEGER NOT NULL,
      status TEXT NOT NULL,
      payment_id TEXT,
      FOREIGN KEY (user_id) REFERENCES users (id),
      FOREIGN KEY (cart_id) REFERENCES carts (id)
    )
  `;

  db.serialize(() => {
    db.run(userTable);
    db.run(productTable);
    db.run(cartTable);
    db.run(cartItemTable);
    db.run(orderTable);
    console.log('Database tables initialized.');
  });
}

module.exports = db;

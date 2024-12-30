const db = require('../database/db');

const User = {
  create: (email, phone, callback) => {
    const query = `INSERT INTO users (email, phone) VALUES (?, ?)`;
    db.run(query, [email, phone], function (err) {
      if (err) return callback(err);
      callback(null, { id: this.lastID });
    });
  },

  findById: (id, callback) => {
    const query = `SELECT * FROM users WHERE id = ?`;
    db.get(query, [id], (err, row) => {
      callback(err, row);
    });
  },

  findAll: (callback) => {
    const query = `SELECT * FROM users`;
    db.all(query, [], (err, rows) => {
      callback(err, rows);
    });
  },
};

module.exports = User;

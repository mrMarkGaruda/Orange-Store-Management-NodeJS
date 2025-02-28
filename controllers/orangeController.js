const pool = require('../utils/db');

// GET /oranges - Retrieve all oranges
exports.getAllOranges = async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM oranges');
    res.json(result.rows);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// POST /oranges - Create a new orange
exports.createOrange = async (req, res) => {
  try {
    const { name, quantity, price } = req.body;
    const result = await pool.query(
      'INSERT INTO oranges (name, quantity, price) VALUES ($1, $2, $3) RETURNING *',
      [name, quantity, price]
    );
    res.status(201).json(result.rows[0]);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Additional endpoints (PUT, DELETE) can be added similarly.

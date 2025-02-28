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

// GET /oranges/:id - Retrieve a single orange by ID
exports.getOrangeById = async (req, res) => {
  try {
    const { id } = req.params;
    const result = await pool.query('SELECT * FROM oranges WHERE id = $1', [id]);

    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'Orange not found' });
    }

    res.json(result.rows[0]);
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

// PUT /oranges/:id - Update an existing orange
exports.updateOrange = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, quantity, price } = req.body;

    const result = await pool.query(
      'UPDATE oranges SET name = $1, quantity = $2, price = $3 WHERE id = $4 RETURNING *',
      [name, quantity, price, id]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'Orange not found' });
    }

    res.json(result.rows[0]);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// DELETE /oranges/:id - Delete an orange
exports.deleteOrange = async (req, res) => {
  try {
    const { id } = req.params;
    const result = await pool.query('DELETE FROM oranges WHERE id = $1 RETURNING *', [id]);

    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'Orange not found' });
    }

    res.json({ message: 'Orange deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

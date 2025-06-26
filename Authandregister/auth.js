import { verifyToken } from '../Middleware/authMiddleware.js';
import express from 'express';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import pool from '../db/db.js'; 

const router = express.Router();
const JWT_SECRET = 'PinkRain0624'; 


// Register
router.post('/register', async (req, res) => {
  const { username, password } = req.body;

  try {
    const hashed = await bcrypt.hash(password, 10);
    const result = await pool.query(
      'INSERT INTO users (username, password) VALUES ($1, $2) RETURNING id, username',
      [username, hashed]
    );

    res.status(201).json({ message: 'User registered', user: result.rows[0] });
  } catch (err) {
    if (err.code === '23505') {
      res.status(409).json({ error: 'Username already taken' });
    } else {
      res.status(500).json({ error: 'Registration failed' });
    }
  }
});

// Login
router.post('/login', async (req, res) => {
  const { username, password } = req.body;

  try {
    const userResult = await pool.query(
      'SELECT * FROM users WHERE username = $1',
      [username]
    );

    const user = userResult.rows[0];
    if (!user) return res.status(401).json({ error: 'Invalid credentials' });

    const valid = await bcrypt.compare(password, user.password);
    if (!valid) return res.status(401).json({ error: 'Invalid credentials' });

    const token = jwt.sign({ id: user.id, username: user.username }, JWT_SECRET, {
      expiresIn: '1h'
    });

    res.json({ message: 'Login successful', token });
  } catch (err) {
    res.status(500).json({ error: 'Login failed' });
  }
});

//Orders
router.post('/orders', verifyToken, async (req, res) => {
  const userId = req.user.id;
  const { date, note } = req.body;
  if (!date) {
    return res.status(400).json({ error: 'Missing date' });
  }
  try {
    const result = await pool.query(
      'INSERT INTO orders (user_id, date, note) VALUES ($1, $2, $3) RETURNING *',
      [userId, date, note || null]
    );
    res.status(201).json(result.rows[0]);
  } catch (error) {
    console.error('Error creating order:', error);
    res.status(500).json({ error: 'Failed to create order' });
  }
});

// Get Current User
router.get('/me', verifyToken, async (req, res) => {
  try {
    const { id } = req.user;
    const result = await pool.query(
      'SELECT id, username FROM users WHERE id = $1',
      [id]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'User not found' });
    }
    const user = result.rows[0]
    const ordersResult = await pool.query(
      'SELECT * FROM orders WHERE user_id = $1',
      [id]
    )
    const reviewsResult = await pool.query(
      `SELECT r.id, r.content, r.rating, r.order_id 
       FROM reviews r 
       JOIN orders o ON r.order_id = o.id 
       WHERE o.user_id = $1`,
      [id]
    )
    res.json({
      user,
      orders: ordersResult.rows,   
      reviews: reviewsResult.rows   
    })
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to get user data' });
  }
});

// Logout
router.post('/logout', (req, res) => {
  res.clearCookie('username');
  res.json({ message: 'Logged out successfully' });
});


export default router;

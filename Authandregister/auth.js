import { verifyToken } from '../middleware/authMiddleware.js';
import express from 'express';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import pool from '../db.js'; 

const router = express.Router();
const JWT_SECRET = 'PinkRain0624'; 


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


router.post('/login', async (req, res) => {
  const { username, password, remember } = req.body;

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

    if (remember) {
      res.cookie('username', user.username, {
        maxAge: 30 * 24 * 60 * 60 * 1000, 
        httpOnly: true
      });
    }

    res.json({ message: 'Login successful', token });
  } catch (err) {
    res.status(500).json({ error: 'Login failed' });
  }

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

    res.json({ user: result.rows[0] });
  } catch (err) {
    res.status(500).json({ error: 'Failed to get user' });
  }
});
router.post('/logout', (req, res) => {
  res.clearCookie('username');
  res.json({ message: 'Logged out successfully' });
});


});

export default router;



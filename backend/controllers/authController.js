const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/User');
const { getStore } = require('../config/db');

const JWT_SECRET = process.env.JWT_SECRET || 'alta_builder_secret_key_5days';

exports.register = async (req, res) => {
  try {
    const { name, email, password } = req.body;
    if (!name || !email || !password) {
      return res.status(400).json({ error: 'Please provide name, email, and password.' });
    }

    const { isConnected, memoryStore } = getStore();

    if (isConnected) {
      const existingUser = await User.findOne({ email });
      if (existingUser) {
        return res.status(400).json({ error: 'User with this email already exists.' });
      }

      const hashedPassword = await bcrypt.hash(password, 10);
      const user = await User.create({ name, email, password: hashedPassword });
      const token = jwt.sign({ id: user._id, email: user.email, name: user.name }, JWT_SECRET, { expiresIn: '7d' });

      return res.status(201).json({
        message: 'Registration successful',
        token,
        user: { id: user._id, name: user.name, email: user.email }
      });
    } else {
      // Memory Store fallback
      const existing = memoryStore.users.find(u => u.email === email);
      if (existing) {
        return res.status(400).json({ error: 'User with this email already exists.' });
      }

      const hashedPassword = await bcrypt.hash(password, 10);
      const newUser = {
        _id: 'user-' + Date.now(),
        name,
        email,
        password: hashedPassword,
        createdAt: new Date().toISOString()
      };
      memoryStore.users.push(newUser);

      const token = jwt.sign({ id: newUser._id, email: newUser.email, name: newUser.name }, JWT_SECRET, { expiresIn: '7d' });
      return res.status(201).json({
        message: 'Registration successful (In-Memory)',
        token,
        user: { id: newUser._id, name: newUser.name, email: newUser.email }
      });
    }
  } catch (err) {
    console.error('Registration error:', err);
    return res.status(500).json({ error: 'Server error during registration.' });
  }
};

exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(400).json({ error: 'Email and password are required.' });
    }

    const { isConnected, memoryStore } = getStore();

    if (isConnected) {
      const user = await User.findOne({ email });
      if (!user) {
        return res.status(400).json({ error: 'Invalid email or password.' });
      }

      const isMatch = await bcrypt.compare(password, user.password);
      if (!isMatch) {
        return res.status(400).json({ error: 'Invalid email or password.' });
      }

      const token = jwt.sign({ id: user._id, email: user.email, name: user.name }, JWT_SECRET, { expiresIn: '7d' });
      return res.json({
        message: 'Login successful',
        token,
        user: { id: user._id, name: user.name, email: user.email }
      });
    } else {
      // Memory store fallback
      const user = memoryStore.users.find(u => u.email === email);
      if (!user) {
        // Provide demo bypass if it is the demo user
        if (email === 'demo@example.com' && password === 'password123') {
          const demoUser = { _id: 'demo-user-id', name: 'Demo User', email: 'demo@example.com' };
          const token = jwt.sign({ id: demoUser._id, email: demoUser.email, name: demoUser.name }, JWT_SECRET, { expiresIn: '7d' });
          return res.json({ message: 'Demo Login successful', token, user: demoUser });
        }
        return res.status(400).json({ error: 'Invalid email or password.' });
      }

      const isMatch = await bcrypt.compare(password, user.password);
      if (!isMatch) {
        return res.status(400).json({ error: 'Invalid email or password.' });
      }

      const token = jwt.sign({ id: user._id, email: user.email, name: user.name }, JWT_SECRET, { expiresIn: '7d' });
      return res.json({
        message: 'Login successful (In-Memory)',
        token,
        user: { id: user._id, name: user.name, email: user.email }
      });
    }
  } catch (err) {
    console.error('Login error:', err);
    return res.status(500).json({ error: 'Server error during login.' });
  }
};

exports.getMe = async (req, res) => {
  return res.json({ user: req.user });
};

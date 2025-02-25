const express = require('express');
const User = require('../models/User');
const jwt = require('jsonwebtoken'); 
const authMiddleware = require('../middleware/authMiddleware');
const { myProfile } = require("../controllers/authController");
const router = express.Router();

// My-Profile
router.get("/my-profile", authMiddleware, myProfile);

// Registration route
router.post('/register', async (req, res) => {
  const { name, username, email, password } = req.body;

  try {

    const userExists = await User.findOne({ $or: [{ email }, { username }] }); //query
    if (userExists) {
      return res.status(400).json({ message: 'Username or email already exists' });
    }

    const newUser = new User({ name, username, email, password }); //query
    await newUser.save();

    const token = jwt.sign({ id: newUser._id }, process.env.JWT_SECRET, { expiresIn: '1h' });

    res.status(201).json({
      message: 'User registered successfully',
      token,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
});

// Login route 
router.post('/login', async (req, res) => {
    const { username, password } = req.body;
  
    try {
    
      if (!username || !password) {
        return res.status(400).json({ message: 'Username and password are required' });
      }
  
      const user = await User.findOne({ username }); //query
      if (!user) {
        return res.status(400).json({ message: 'User not found' });
      }
  
      const isMatch = await user.comparePassword(password);
      if (!isMatch) {
        return res.status(400).json({ message: 'Invalid password' }); 
      }
  
      const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '1h' });
  
      res.status(200).json({
        message: 'Login successful',
        token,
      });
    } catch (err) {
      console.error(err);
      res.status(500).json({ message: 'Server error' });
    }
  });
 
// Get all users (Authentication required)
router.get('/get', authMiddleware, async (req, res) => {
    try {
      const users = await User.find(); //query
      res.status(200).json(users);     
    } catch (err) {
      res.status(500).json({ message: 'Error fetching users', error: err }); 
    }
  });
  

// Get user by ID (Authentication required)
router.get('/:id', authMiddleware, async (req, res) => {
  try {
    const user = await User.findById(req.params.id); //query
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    res.status(200).json(user);
  } catch (err) {
    res.status(500).json({ message: 'Error fetching user', error: err });
  }
});

// Update user by ID (Authentication required)
router.put('/:id', authMiddleware, async (req, res) => {
  try {
    const updatedUser = await User.findByIdAndUpdate(req.params.id, req.body, { new: true }); //query
    if (!updatedUser) {
      return res.status(404).json({ message: 'User not found' });
    }
    res.status(200).json(updatedUser);
  } catch (err) {
    res.status(500).json({ message: 'Error updating user', error: err });
  }
});

// Delete user by ID (Authentication required)
router.delete('/:id', authMiddleware, async (req, res) => {
  try {
    const user = await User.findByIdAndDelete(req.params.id); //query
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    res.status(200).json({ message: 'User deleted successfully' });
  } catch (err) {
    res.status(500).json({ message: 'Error deleting user', error: err });
  }
});

module.exports = router;

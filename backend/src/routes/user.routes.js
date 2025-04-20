const express = require('express');
const router = express.Router();
const { protect, restrictTo } = require('../middleware/auth.middleware');
const User = require('../models/user.model');

// Get all users (HR only)
router.get('/', protect, restrictTo('hr'), async (req, res) => {
  try {
    const users = await User.find().select('-password');
    res.status(200).json({
      status: 'success',
      results: users.length,
      data: {
        users
      }
    });
  } catch (error) {
    res.status(400).json({
      status: 'error',
      message: error.message
    });
  }
});

// Get user by ID (HR or self)
router.get('/:id', protect, async (req, res) => {
  try {
    // Allow users to view their own profile or HR to view any profile
    if (req.user.role !== 'hr' && req.user._id.toString() !== req.params.id) {
      return res.status(403).json({
        status: 'error',
        message: 'You do not have permission to view this user'
      });
    }

    const user = await User.findById(req.params.id).select('-password');
    if (!user) {
      return res.status(404).json({
        status: 'error',
        message: 'User not found'
      });
    }

    res.status(200).json({
      status: 'success',
      data: {
        user
      }
    });
  } catch (error) {
    res.status(400).json({
      status: 'error',
      message: error.message
    });
  }
});

// Update user (HR or self)
router.patch('/:id', protect, async (req, res) => {
  try {
    // Allow users to update their own profile or HR to update any profile
    if (req.user.role !== 'hr' && req.user._id.toString() !== req.params.id) {
      return res.status(403).json({
        status: 'error',
        message: 'You do not have permission to update this user'
      });
    }

    // Prevent password update through this route
    if (req.body.password) {
      return res.status(400).json({
        status: 'error',
        message: 'This route is not for password updates. Please use /api/auth/reset-password'
      });
    }

    const user = await User.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    ).select('-password');

    if (!user) {
      return res.status(404).json({
        status: 'error',
        message: 'User not found'
      });
    }

    res.status(200).json({
      status: 'success',
      data: {
        user
      }
    });
  } catch (error) {
    res.status(400).json({
      status: 'error',
      message: error.message
    });
  }
});

// Delete user (HR only)
router.delete('/:id', protect, restrictTo('hr'), async (req, res) => {
  try {
    const user = await User.findByIdAndDelete(req.params.id);
    
    if (!user) {
      return res.status(404).json({
        status: 'error',
        message: 'User not found'
      });
    }

    res.status(204).json({
      status: 'success',
      data: null
    });
  } catch (error) {
    res.status(400).json({
      status: 'error',
      message: error.message
    });
  }
});

module.exports = router; 
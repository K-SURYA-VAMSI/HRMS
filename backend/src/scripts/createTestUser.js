const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const User = require('../models/user.model');
require('dotenv').config();

async function createTestUser() {
  try {
    // Connect to MongoDB
    await mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/hrms');
    console.log('Connected to MongoDB');

    // Check if test user already exists
    const existingUser = await User.findOne({ email: 'hr@example.com' });
    if (existingUser) {
      console.log('Test user already exists');
      process.exit(0);
    }

    // Create test HR admin user
    const user = await User.create({
      name: 'HR Admin',
      email: 'hr@example.com',
      password: 'password123',
      role: 'hr'
    });

    console.log('Test user created successfully:', {
      name: user.name,
      email: user.email,
      role: user.role
    });
  } catch (error) {
    console.error('Error creating test user:', error);
  } finally {
    await mongoose.disconnect();
    process.exit(0);
  }
}

createTestUser(); 
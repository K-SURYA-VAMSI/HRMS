const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const User = require('../models/user.model');
require('dotenv').config();

async function createEmployeeUser() {
  try {
    // Connect to MongoDB
    await mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/hrms');
    console.log('Connected to MongoDB');

    // Check if test employee already exists
    const existingUser = await User.findOne({ email: 'employee@example.com' });
    if (existingUser) {
      console.log('Test employee already exists');
      process.exit(0);
    }

    // Create test employee user
    const user = await User.create({
      name: 'Test Employee',
      email: 'employee@example.com',
      password: 'password123',
      role: 'employee'
    });

    console.log('Test employee created successfully:', {
      name: user.name,
      email: user.email,
      role: user.role
    });
  } catch (error) {
    console.error('Error creating test employee:', error);
  } finally {
    await mongoose.disconnect();
    process.exit(0);
  }
}

createEmployeeUser(); 
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const validator = require('validator');

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Please provide your name'],
    trim: true
  },
  email: {
    type: String,
    required: [true, 'Please provide your email'],
    unique: true,
    lowercase: true,
    validate: [validator.isEmail, 'Please provide a valid email']
  },
  password: {
    type: String,
    required: [true, 'Please provide a password'],
    minlength: 8,
    select: false
  },
  role: {
    type: String,
    enum: ['hr', 'employee'],
    required: [true, 'Please specify user role']
  },
  employmentStatus: {
    type: String,
    enum: ['pending', 'active', 'inactive'],
    default: 'pending'
  },
  position: {
    type: String,
    default: null
  },
  department: {
    type: String,
    default: null
  },
  applicationStatus: {
    type: String,
    enum: ['not_applied', 'pending', 'reviewing', 'accepted', 'rejected'],
    default: 'not_applied'
  },
  joinDate: {
    type: Date,
    default: null
  },
  passwordResetToken: String,
  passwordResetExpires: Date,
  active: {
    type: Boolean,
    default: true,
    select: false
  }
}, {
  timestamps: true
});

// Hash password before saving
userSchema.pre('save', async function(next) {
  if (!this.isModified('password')) return next();
  
  this.password = await bcrypt.hash(this.password, 12);
  next();
});

// Compare password method
userSchema.methods.comparePassword = async function(candidatePassword) {
  return await bcrypt.compare(candidatePassword, this.password);
};

const User = mongoose.model('User', userSchema);

module.exports = User; 
const mongoose = require('mongoose');
const { toJSON, paginate } = require('./plugins');

const leaveSchema = mongoose.Schema(
  {
    userId: {
      type: mongoose.SchemaTypes.ObjectId,
      ref: 'User',
      required: true,
    },
    type: {
      type: String,
      enum: ['annual', 'sick', 'personal', 'maternity', 'paternity', 'bereavement', 'unpaid'],
      required: true,
    },
    startDate: {
      type: Date,
      required: true,
    },
    endDate: {
      type: Date,
      required: true,
    },
    duration: {
      type: Number,
      required: true,
    },
    reason: {
      type: String,
      required: true,
      trim: true,
      maxlength: 500,
    },
    status: {
      type: String,
      enum: ['pending', 'approved', 'rejected'],
      default: 'pending',
    },
    approvedBy: {
      type: mongoose.SchemaTypes.ObjectId,
      ref: 'User',
    },
    approvedAt: {
      type: Date,
    },
    rejectionReason: {
      type: String,
      trim: true,
      maxlength: 500,
    },
    attachments: [{
      name: String,
      url: String,
      uploadedAt: Date,
    }],
    comments: [{
      userId: {
        type: mongoose.SchemaTypes.ObjectId,
        ref: 'User',
      },
      text: {
        type: String,
        required: true,
        trim: true,
      },
      createdAt: {
        type: Date,
        default: Date.now,
      },
    }],
  },
  {
    timestamps: true,
  }
);

// Add plugin that converts mongoose to json
leaveSchema.plugin(toJSON);
leaveSchema.plugin(paginate);

// Indexes
leaveSchema.index({ userId: 1, startDate: 1 });
leaveSchema.index({ status: 1 });
leaveSchema.index({ type: 1 });

/**
 * @typedef Leave
 */
const Leave = mongoose.model('Leave', leaveSchema);

module.exports = Leave; 
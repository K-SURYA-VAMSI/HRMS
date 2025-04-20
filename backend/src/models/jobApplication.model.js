const mongoose = require('mongoose');
const { toJSON, paginate } = require('./plugins');

const jobApplicationSchema = mongoose.Schema(
  {
    job: {
      type: mongoose.SchemaTypes.ObjectId,
      ref: 'Job',
      required: true,
    },
    applicant: {
      type: mongoose.SchemaTypes.ObjectId,
      ref: 'User',
      required: true,
    },
    status: {
      type: String,
      enum: ['pending', 'reviewing', 'shortlisted', 'rejected', 'hired'],
      default: 'pending',
    },
    resume: {
      url: {
        type: String,
        required: true,
      },
      name: {
        type: String,
        required: true,
      },
      uploadedAt: {
        type: Date,
        default: Date.now,
      },
    },
    coverLetter: {
      type: String,
      trim: true,
      maxlength: 2000,
    },
    experience: [{
      company: {
        type: String,
        required: true,
        trim: true,
      },
      position: {
        type: String,
        required: true,
        trim: true,
      },
      startDate: {
        type: Date,
        required: true,
      },
      endDate: Date,
      current: {
        type: Boolean,
        default: false,
      },
      description: {
        type: String,
        trim: true,
      },
    }],
    education: [{
      institution: {
        type: String,
        required: true,
        trim: true,
      },
      degree: {
        type: String,
        required: true,
        trim: true,
      },
      field: {
        type: String,
        required: true,
        trim: true,
      },
      startDate: {
        type: Date,
        required: true,
      },
      endDate: Date,
      current: {
        type: Boolean,
        default: false,
      },
      grade: {
        type: String,
        trim: true,
      },
    }],
    skills: [{
      type: String,
      trim: true,
    }],
    references: [{
      name: {
        type: String,
        required: true,
        trim: true,
      },
      position: {
        type: String,
        required: true,
        trim: true,
      },
      company: {
        type: String,
        required: true,
        trim: true,
      },
      email: {
        type: String,
        required: true,
        trim: true,
        lowercase: true,
      },
      phone: {
        type: String,
        trim: true,
      },
    }],
    notes: [{
      text: {
        type: String,
        required: true,
        trim: true,
      },
      addedBy: {
        type: mongoose.SchemaTypes.ObjectId,
        ref: 'User',
        required: true,
      },
      createdAt: {
        type: Date,
        default: Date.now,
      },
    }],
    interviewSchedule: [{
      type: {
        type: String,
        enum: ['phone', 'video', 'in-person'],
        required: true,
      },
      date: {
        type: Date,
        required: true,
      },
      location: {
        type: String,
        trim: true,
      },
      notes: {
        type: String,
        trim: true,
      },
      status: {
        type: String,
        enum: ['scheduled', 'completed', 'cancelled'],
        default: 'scheduled',
      },
    }],
  },
  {
    timestamps: true,
  }
);

// Add plugin that converts mongoose to json
jobApplicationSchema.plugin(toJSON);
jobApplicationSchema.plugin(paginate);

// Indexes
jobApplicationSchema.index({ job: 1, applicant: 1 }, { unique: true });
jobApplicationSchema.index({ status: 1 });
jobApplicationSchema.index({ 'interviewSchedule.date': 1 });

/**
 * @typedef JobApplication
 */
const JobApplication = mongoose.model('JobApplication', jobApplicationSchema);

module.exports = JobApplication; 
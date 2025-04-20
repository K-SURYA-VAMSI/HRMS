const httpStatus = require('http-status');
const { Leave, User } = require('../models');
const ApiError = require('../utils/ApiError');
const { getStartOfDay, getEndOfDay, calculateDuration } = require('../utils/date');

/**
 * Create a new leave request
 * @param {ObjectId} userId
 * @param {Object} leaveBody
 * @returns {Promise<Leave>}
 */
const createLeave = async (userId, leaveBody) => {
  // Check if user has overlapping leave requests
  const overlappingLeave = await Leave.findOne({
    userId,
    status: { $ne: 'rejected' },
    $or: [
      {
        startDate: { $lte: leaveBody.endDate },
        endDate: { $gte: leaveBody.startDate },
      },
    ],
  });

  if (overlappingLeave) {
    throw new ApiError(
      httpStatus.BAD_REQUEST,
      'You already have a leave request for these dates'
    );
  }

  // Calculate duration in days
  const startDate = new Date(leaveBody.startDate);
  const endDate = new Date(leaveBody.endDate);
  const duration = Math.ceil((endDate - startDate) / (1000 * 60 * 60 * 24)) + 1;

  // Create leave request
  const leave = await Leave.create({
    ...leaveBody,
    userId,
    duration,
  });

  return leave;
};

/**
 * Get leave requests for a user
 * @param {ObjectId} userId
 * @param {Object} filter - Filter criteria
 * @param {Object} options - Query options
 * @returns {Promise<QueryResult>}
 */
const getUserLeaves = async (userId, filter, options) => {
  return Leave.paginate({ userId, ...filter }, options);
};

/**
 * Get leave request by id
 * @param {ObjectId} leaveId
 * @returns {Promise<Leave>}
 */
const getLeaveById = async (leaveId) => {
  const leave = await Leave.findById(leaveId).populate('userId', 'name email employeeId');
  if (!leave) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Leave request not found');
  }
  return leave;
};

/**
 * Update leave request status
 * @param {ObjectId} leaveId
 * @param {ObjectId} hrUserId
 * @param {string} status
 * @param {string} [rejectionReason]
 * @returns {Promise<Leave>}
 */
const updateLeaveStatus = async (leaveId, hrUserId, status, rejectionReason) => {
  const leave = await Leave.findById(leaveId);
  if (!leave) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Leave request not found');
  }

  if (leave.status !== 'pending') {
    throw new ApiError(httpStatus.BAD_REQUEST, 'Leave request has already been processed');
  }

  leave.status = status;
  leave.approvedBy = hrUserId;
  leave.approvedAt = new Date();

  if (status === 'rejected' && rejectionReason) {
    leave.rejectionReason = rejectionReason;
  }

  await leave.save();
  return leave;
};

/**
 * Add comment to leave request
 * @param {ObjectId} leaveId
 * @param {ObjectId} userId
 * @param {string} text
 * @returns {Promise<Leave>}
 */
const addComment = async (leaveId, userId, text) => {
  const leave = await Leave.findById(leaveId);
  if (!leave) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Leave request not found');
  }

  leave.comments.push({
    userId,
    text,
  });

  await leave.save();
  return leave;
};

/**
 * Query leave requests (for HR)
 * @param {Object} filter - Filter criteria
 * @param {Object} options - Query options
 * @returns {Promise<QueryResult>}
 */
const queryLeaves = async (filter, options) => {
  return Leave.paginate(filter, {
    ...options,
    populate: 'userId',
  });
};

/**
 * Get leave statistics for a user
 * @param {ObjectId} userId
 * @returns {Promise<Object>}
 */
const getLeaveStatistics = async (userId) => {
  const currentYear = new Date().getFullYear();
  const startOfYear = new Date(currentYear, 0, 1);
  const endOfYear = new Date(currentYear, 11, 31);

  const leaves = await Leave.find({
    userId,
    startDate: { $gte: startOfYear },
    endDate: { $lte: endOfYear },
    status: 'approved',
  });

  const statistics = {
    annual: 0,
    sick: 0,
    personal: 0,
    maternity: 0,
    paternity: 0,
    bereavement: 0,
    unpaid: 0,
    total: 0,
  };

  leaves.forEach((leave) => {
    statistics[leave.type] += leave.duration;
    statistics.total += leave.duration;
  });

  return statistics;
};

module.exports = {
  createLeave,
  getUserLeaves,
  getLeaveById,
  updateLeaveStatus,
  addComment,
  queryLeaves,
  getLeaveStatistics,
}; 
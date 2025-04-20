const httpStatus = require('http-status');
const { Attendance, User } = require('../models');
const ApiError = require('../utils/ApiError');
const { getStartOfDay, getEndOfDay, calculateDuration } = require('../utils/date');

/**
 * Create a new attendance record (Check-in)
 * @param {Object} attendanceBody
 * @returns {Promise<Attendance>}
 */
const checkIn = async (userId, location) => {
  // Check if user has already checked in today
  const today = new Date();
  const existingAttendance = await Attendance.findOne({
    userId,
    'checkIn.time': {
      $gte: getStartOfDay(today),
      $lte: getEndOfDay(today),
    },
  });

  if (existingAttendance) {
    throw new ApiError(httpStatus.BAD_REQUEST, 'Already checked in for today');
  }

  const attendance = await Attendance.create({
    userId,
    checkIn: {
      time: today,
      location,
    },
  });

  return attendance;
};

/**
 * Check-out for an existing attendance record
 * @param {ObjectId} userId
 * @param {Object} location
 * @returns {Promise<Attendance>}
 */
const checkOut = async (userId, location) => {
  const today = new Date();
  const attendance = await Attendance.findOne({
    userId,
    'checkIn.time': {
      $gte: getStartOfDay(today),
      $lte: getEndOfDay(today),
    },
    'checkOut.time': { $exists: false },
  });

  if (!attendance) {
    throw new ApiError(httpStatus.NOT_FOUND, 'No active check-in found for today');
  }

  const duration = calculateDuration(attendance.checkIn.time, today);
  
  attendance.checkOut = {
    time: today,
    location,
  };
  attendance.duration = duration;

  // Update status based on duration
  if (duration.hours < 4) {
    attendance.status = 'absent';
  } else if (duration.hours < 8) {
    attendance.status = 'half-day';
  }

  await attendance.save();
  return attendance;
};

/**
 * Get attendance by date range for a user
 * @param {ObjectId} userId
 * @param {Date} startDate
 * @param {Date} endDate
 * @returns {Promise<Array<Attendance>>}
 */
const getAttendanceByDateRange = async (userId, startDate, endDate) => {
  return Attendance.find({
    userId,
    'checkIn.time': {
      $gte: getStartOfDay(startDate),
      $lte: getEndOfDay(endDate)
    }
  }).sort({ 'checkIn.time': -1 });
};

/**
 * Get today's attendance for a user
 * @param {ObjectId} userId
 * @returns {Promise<Attendance>}
 */
const getTodayAttendance = async (userId) => {
  const startOfDay = getStartOfDay(new Date());
  const endOfDay = getEndOfDay(new Date());

  return Attendance.findOne({
    userId,
    'checkIn.time': {
      $gte: startOfDay,
      $lte: endOfDay
    }
  });
};

/**
 * Update attendance status
 * @param {ObjectId} attendanceId
 * @param {string} status
 * @returns {Promise<Attendance>}
 */
const updateAttendanceStatus = async (attendanceId, status) => {
  const attendance = await Attendance.findById(attendanceId);
  if (!attendance) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Attendance record not found');
  }

  attendance.status = status;
  return attendance.save();
};

/**
 * Get attendance history
 * @param {Object} filter - Filter criteria
 * @param {Object} options - Query options
 * @returns {Promise<QueryResult>}
 */
const getAttendanceHistory = async (filter, options) => {
  const { userId, startDate, endDate } = filter;
  const query = {};

  if (userId) {
    query.userId = userId;
  }

  if (startDate || endDate) {
    query.date = {};
    if (startDate) {
      query.date.$gte = getStartOfDay(new Date(startDate));
    }
    if (endDate) {
      query.date.$lte = getEndOfDay(new Date(endDate));
    }
  }

  const attendances = await Attendance.paginate(query, options);
  return attendances;
};

/**
 * Get department attendance
 * @param {Object} filter - Filter criteria
 * @param {Object} options - Query options
 * @returns {Promise<QueryResult>}
 */
const getDepartmentAttendance = async (filter, options) => {
  const { departmentId, date } = filter;
  const query = {};

  // Get all users in the department
  const users = await User.find({ departmentId });
  const userIds = users.map(user => user._id);
  query.userId = { $in: userIds };

  if (date) {
    query.date = {
      $gte: getStartOfDay(new Date(date)),
      $lte: getEndOfDay(new Date(date)),
    };
  }

  const attendances = await Attendance.paginate(query, options);
  return attendances;
};

/**
 * Get all attendance records within a date range (for HR)
 * @param {Date} startDate
 * @param {Date} endDate
 * @param {Object} filter
 * @param {Object} options
 * @returns {Promise<{attendances: Attendance[], page: number, limit: number, totalPages: number, totalResults: number}>}
 */
const queryAttendance = async (startDate, endDate, filter = {}, options = {}) => {
  const { page = 1, limit = 10, sortBy } = options;
  const skip = (page - 1) * limit;

  const query = {
    'checkIn.time': {
      $gte: getStartOfDay(startDate),
      $lte: getEndOfDay(endDate),
    },
    ...filter,
  };

  const [attendances, totalResults] = await Promise.all([
    Attendance.find(query)
      .sort(sortBy || { 'checkIn.time': -1 })
      .skip(skip)
      .limit(limit)
      .populate('userId', 'name email employeeId'),
    Attendance.countDocuments(query),
  ]);

  const totalPages = Math.ceil(totalResults / limit);

  return {
    attendances,
    page: parseInt(page, 10),
    limit: parseInt(limit, 10),
    totalPages,
    totalResults,
  };
};

/**
 * Update attendance status and notes
 * @param {ObjectId} attendanceId
 * @param {Object} updateBody
 * @returns {Promise<Attendance>}
 */
const updateAttendance = async (attendanceId, updateBody) => {
  const attendance = await Attendance.findById(attendanceId);
  if (!attendance) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Attendance record not found');
  }

  if (updateBody.status) {
    attendance.status = updateBody.status;
  }
  if (updateBody.notes) {
    attendance.notes = updateBody.notes;
  }

  await attendance.save();
  return attendance;
};

module.exports = {
  checkIn,
  checkOut,
  getAttendanceByDateRange,
  getTodayAttendance,
  updateAttendanceStatus,
  getAttendanceHistory,
  getDepartmentAttendance,
  queryAttendance,
  updateAttendance,
}; 
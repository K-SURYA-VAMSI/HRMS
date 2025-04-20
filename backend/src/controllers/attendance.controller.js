const httpStatus = require('http-status');
const { Attendance } = require('../models');
const ApiError = require('../utils/ApiError');
const catchAsync = require('../utils/catchAsync');
const { startOfDay, endOfDay } = require('date-fns');
const { attendanceService } = require('../services');
const pick = require('../utils/pick');
const { getDateRange } = require('../utils/date');

const checkIn = catchAsync(async (req, res) => {
  const { location } = req.body;
  const userId = req.user.id;
  
  const attendance = await attendanceService.checkIn(userId, location);
  res.status(201).json({ attendance });
});

const checkOut = catchAsync(async (req, res) => {
  const { location } = req.body;
  const userId = req.user.id;
  
  const attendance = await attendanceService.checkOut(userId, location);
  res.json({ attendance });
});

const getUserAttendance = catchAsync(async (req, res) => {
  const userId = req.user.id;
  const { period = 'month', startDate, endDate } = req.query;
  
  let dateRange;
  if (startDate && endDate) {
    dateRange = {
      start: new Date(startDate),
      end: new Date(endDate),
    };
  } else {
    dateRange = getDateRange(period);
  }
  
  const attendance = await attendanceService.getUserAttendance(
    userId,
    dateRange.start,
    dateRange.end
  );
  res.json({ attendance });
});

const queryAttendance = catchAsync(async (req, res) => {
  const {
    period = 'month',
    startDate,
    endDate,
    page = 1,
    limit = 10,
    userId,
    status,
  } = req.query;
  
  let dateRange;
  if (startDate && endDate) {
    dateRange = {
      start: new Date(startDate),
      end: new Date(endDate),
    };
  } else {
    dateRange = getDateRange(period);
  }
  
  const filter = {
    userId,
    status,
  };
  
  const { results, totalPages } = await attendanceService.queryAttendance(
    dateRange.start,
    dateRange.end,
    page,
    limit,
    filter
  );
  
  res.json({
    results,
    page: Number(page),
    limit: Number(limit),
    totalPages,
  });
});

const updateAttendance = catchAsync(async (req, res) => {
  const { id } = req.params;
  const { status, notes } = req.body;
  
  const attendance = await attendanceService.updateAttendance(id, { status, notes });
  res.json({ attendance });
});

const getAttendanceHistory = catchAsync(async (req, res) => {
  const filter = { ...req.query };
  if (!req.user.isHR) {
    filter.userId = req.user.id;
  }
  const options = {
    sortBy: req.query.sortBy,
    limit: req.query.limit,
    page: req.query.page,
  };
  const result = await attendanceService.getAttendanceHistory(filter, options);
  res.status(httpStatus.OK).send(result);
});

const getDepartmentAttendance = catchAsync(async (req, res) => {
  const filter = {
    departmentId: req.params.departmentId,
    date: req.query.date,
  };
  const options = {
    sortBy: req.query.sortBy,
    limit: req.query.limit,
    page: req.query.page,
  };
  const result = await attendanceService.getDepartmentAttendance(filter, options);
  res.status(httpStatus.OK).send(result);
});

module.exports = {
  checkIn,
  checkOut,
  getUserAttendance,
  queryAttendance,
  updateAttendance,
  getAttendanceHistory,
  getDepartmentAttendance
}; 
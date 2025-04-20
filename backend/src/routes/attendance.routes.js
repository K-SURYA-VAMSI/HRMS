const express = require('express');
const router = express.Router();

const {
  checkIn,
  checkOut,
  getTodayAttendance,
  getAttendanceHistory,
  getDepartmentAttendance
} = require('../controllers/attendance.controller');

const { verifyJWT } = require('../middlewares/auth.middleware');
const validate = require('../middlewares/validate.middleware');
const { attendanceValidation } = require('../validations/attendance.validation');

// Protect all routes
router.use(verifyJWT);

// Check-in/out routes
router.post('/check-in', validate(attendanceValidation.checkInOut), checkIn);
router.post('/check-out', validate(attendanceValidation.checkInOut), checkOut);

// Attendance retrieval routes
router.get('/today', getTodayAttendance);
router.get('/history', validate(attendanceValidation.getHistory), getAttendanceHistory);
router.get('/department', validate(attendanceValidation.getDepartment), getDepartmentAttendance);

module.exports = router; 
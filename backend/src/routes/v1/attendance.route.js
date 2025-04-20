const express = require('express');
const auth = require('../../middlewares/auth');
const validate = require('../../middlewares/validate');
const attendanceValidation = require('../../validations/attendance.validation');
const attendanceController = require('../../controllers/attendance.controller');

const router = express.Router();

router
  .route('/check-in')
  .post(auth(), validate(attendanceValidation.checkIn), attendanceController.checkIn);

router
  .route('/check-out')
  .post(auth(), validate(attendanceValidation.checkOut), attendanceController.checkOut);

router
  .route('/history')
  .get(auth(), validate(attendanceValidation.getAttendanceHistory), attendanceController.getAttendanceHistory);

router
  .route('/department/:departmentId')
  .get(
    auth('manageUsers'),
    validate(attendanceValidation.getDepartmentAttendance),
    attendanceController.getDepartmentAttendance
  );

module.exports = router; 
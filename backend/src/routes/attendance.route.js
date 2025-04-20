const express = require('express');
const auth = require('../middleware/auth');
const validate = require('../middleware/validate');
const attendanceController = require('../controllers/attendance.controller');
const { checkInSchema, checkOutSchema, updateAttendanceSchema } = require('../validations/attendance.validation');

const router = express.Router();

// Employee routes
router.post(
  '/check-in',
  auth(),
  validate(checkInSchema),
  attendanceController.checkIn
);

router.post(
  '/check-out',
  auth(),
  validate(checkOutSchema),
  attendanceController.checkOut
);

router.get(
  '/me',
  auth(),
  attendanceController.getUserAttendance
);

// HR routes
router.get(
  '/',
  auth('hr'),
  attendanceController.queryAttendance
);

router.patch(
  '/:id',
  auth('hr'),
  validate(updateAttendanceSchema),
  attendanceController.updateAttendance
);

module.exports = router; 
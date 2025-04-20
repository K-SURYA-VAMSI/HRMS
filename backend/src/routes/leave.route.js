const express = require('express');
const auth = require('../middleware/auth');
const validate = require('../middleware/validate');
const leaveController = require('../controllers/leave.controller');
const { createLeaveSchema, updateLeaveStatusSchema, addCommentSchema } = require('../validations/leave.validation');

const router = express.Router();

// Employee routes
router.post(
  '/',
  auth(),
  validate(createLeaveSchema),
  leaveController.createLeave
);

router.get(
  '/me',
  auth(),
  leaveController.getUserLeaves
);

router.get(
  '/statistics',
  auth(),
  leaveController.getLeaveStatistics
);

router.get(
  '/:id',
  auth(),
  leaveController.getLeaveById
);

router.post(
  '/:id/comments',
  auth(),
  validate(addCommentSchema),
  leaveController.addComment
);

// HR routes
router.get(
  '/',
  auth('hr'),
  leaveController.queryLeaves
);

router.patch(
  '/:id/status',
  auth('hr'),
  validate(updateLeaveStatusSchema),
  leaveController.updateLeaveStatus
);

module.exports = router; 
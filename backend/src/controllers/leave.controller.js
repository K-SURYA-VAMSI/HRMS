const httpStatus = require('http-status');
const catchAsync = require('../utils/catchAsync');
const { leaveService } = require('../services');
const pick = require('../utils/pick');

/**
 * Create a new leave request
 * @POST /api/leaves
 */
const createLeave = catchAsync(async (req, res) => {
  const leave = await leaveService.createLeave(req.user.id, req.body);
  res.status(httpStatus.CREATED).json({ leave });
});

/**
 * Get user's leave requests
 * @GET /api/leaves/me
 */
const getUserLeaves = catchAsync(async (req, res) => {
  const filter = pick(req.query, ['status', 'type']);
  const options = pick(req.query, ['sortBy', 'limit', 'page']);
  const result = await leaveService.getUserLeaves(req.user.id, filter, options);
  res.json(result);
});

/**
 * Get leave request by id
 * @GET /api/leaves/:id
 */
const getLeaveById = catchAsync(async (req, res) => {
  const leave = await leaveService.getLeaveById(req.params.id);
  res.json({ leave });
});

/**
 * Update leave request status (HR only)
 * @PATCH /api/leaves/:id/status
 */
const updateLeaveStatus = catchAsync(async (req, res) => {
  const { status, rejectionReason } = req.body;
  const leave = await leaveService.updateLeaveStatus(
    req.params.id,
    req.user.id,
    status,
    rejectionReason
  );
  res.json({ leave });
});

/**
 * Add comment to leave request
 * @POST /api/leaves/:id/comments
 */
const addComment = catchAsync(async (req, res) => {
  const { text } = req.body;
  const leave = await leaveService.addComment(req.params.id, req.user.id, text);
  res.json({ leave });
});

/**
 * Query leave requests (HR only)
 * @GET /api/leaves
 */
const queryLeaves = catchAsync(async (req, res) => {
  const filter = pick(req.query, ['status', 'type', 'userId']);
  const options = pick(req.query, ['sortBy', 'limit', 'page']);
  const result = await leaveService.queryLeaves(filter, options);
  res.json(result);
});

/**
 * Get leave statistics for a user
 * @GET /api/leaves/statistics
 */
const getLeaveStatistics = catchAsync(async (req, res) => {
  const statistics = await leaveService.getLeaveStatistics(req.user.id);
  res.json({ statistics });
});

module.exports = {
  createLeave,
  getUserLeaves,
  getLeaveById,
  updateLeaveStatus,
  addComment,
  queryLeaves,
  getLeaveStatistics,
}; 
const httpStatus = require('http-status');
const catchAsync = require('../utils/catchAsync');
const { jobService } = require('../services');
const pick = require('../utils/pick');

/**
 * Create a new job posting
 * @POST /api/jobs
 */
const createJob = catchAsync(async (req, res) => {
  const job = await jobService.createJob({
    ...req.body,
    postedBy: req.user.id,
  });
  res.status(httpStatus.CREATED).json({ job });
});

/**
 * Get job by id
 * @GET /api/jobs/:id
 */
const getJobById = catchAsync(async (req, res) => {
  const job = await jobService.getJobById(req.params.id);
  res.json({ job });
});

/**
 * Query jobs
 * @GET /api/jobs
 */
const queryJobs = catchAsync(async (req, res) => {
  const filter = pick(req.query, ['status', 'type', 'department']);
  const options = pick(req.query, ['sortBy', 'limit', 'page']);
  const result = await jobService.queryJobs(filter, options);
  res.json(result);
});

/**
 * Update job by id
 * @PATCH /api/jobs/:id
 */
const updateJobById = catchAsync(async (req, res) => {
  const job = await jobService.updateJobById(req.params.id, req.body);
  res.json({ job });
});

/**
 * Delete job by id
 * @DELETE /api/jobs/:id
 */
const deleteJobById = catchAsync(async (req, res) => {
  await jobService.deleteJobById(req.params.id);
  res.status(httpStatus.NO_CONTENT).send();
});

/**
 * Apply for a job
 * @POST /api/jobs/:id/apply
 */
const applyForJob = catchAsync(async (req, res) => {
  const application = await jobService.applyForJob(
    req.params.id,
    req.user.id,
    req.body
  );
  res.status(httpStatus.CREATED).json({ application });
});

/**
 * Get user's job applications
 * @GET /api/jobs/applications/me
 */
const getUserApplications = catchAsync(async (req, res) => {
  const filter = pick(req.query, ['status']);
  const options = pick(req.query, ['sortBy', 'limit', 'page']);
  const result = await jobService.getUserApplications(req.user.id, filter, options);
  res.json(result);
});

/**
 * Get job applications (for HR)
 * @GET /api/jobs/:id/applications
 */
const getJobApplications = catchAsync(async (req, res) => {
  const filter = pick(req.query, ['status']);
  const options = pick(req.query, ['sortBy', 'limit', 'page']);
  const result = await jobService.getJobApplications(req.params.id, filter, options);
  res.json(result);
});

/**
 * Update application status
 * @PATCH /api/jobs/applications/:id/status
 */
const updateApplicationStatus = catchAsync(async (req, res) => {
  const { status } = req.body;
  const application = await jobService.updateApplicationStatus(req.params.id, status);
  res.json({ application });
});

/**
 * Schedule interview
 * @POST /api/jobs/applications/:id/interview
 */
const scheduleInterview = catchAsync(async (req, res) => {
  const application = await jobService.scheduleInterview(req.params.id, req.body);
  res.json({ application });
});

/**
 * Add note to application
 * @POST /api/jobs/applications/:id/notes
 */
const addApplicationNote = catchAsync(async (req, res) => {
  const { text } = req.body;
  const application = await jobService.addApplicationNote(
    req.params.id,
    req.user.id,
    text
  );
  res.json({ application });
});

module.exports = {
  createJob,
  getJobById,
  queryJobs,
  updateJobById,
  deleteJobById,
  applyForJob,
  getUserApplications,
  getJobApplications,
  updateApplicationStatus,
  scheduleInterview,
  addApplicationNote,
}; 
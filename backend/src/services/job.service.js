const httpStatus = require('http-status');
const { Job, JobApplication, User } = require('../models');
const ApiError = require('../utils/ApiError');

/**
 * Create a new job posting
 * @param {Object} jobBody
 * @returns {Promise<Job>}
 */
const createJob = async (jobBody) => {
  return Job.create(jobBody);
};

/**
 * Get job by id
 * @param {ObjectId} jobId
 * @returns {Promise<Job>}
 */
const getJobById = async (jobId) => {
  const job = await Job.findById(jobId).populate('department', 'name');
  if (!job) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Job not found');
  }
  return job;
};

/**
 * Query jobs
 * @param {Object} filter - Filter criteria
 * @param {Object} options - Query options
 * @returns {Promise<QueryResult>}
 */
const queryJobs = async (filter, options) => {
  return Job.paginate(filter, {
    ...options,
    populate: 'department',
  });
};

/**
 * Update job by id
 * @param {ObjectId} jobId
 * @param {Object} updateBody
 * @returns {Promise<Job>}
 */
const updateJobById = async (jobId, updateBody) => {
  const job = await Job.findById(jobId);
  if (!job) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Job not found');
  }
  Object.assign(job, updateBody);
  await job.save();
  return job;
};

/**
 * Delete job by id
 * @param {ObjectId} jobId
 * @returns {Promise<Job>}
 */
const deleteJobById = async (jobId) => {
  const job = await Job.findById(jobId);
  if (!job) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Job not found');
  }
  await job.remove();
  return job;
};

/**
 * Apply for a job
 * @param {ObjectId} jobId
 * @param {ObjectId} applicantId
 * @param {Object} applicationBody
 * @returns {Promise<JobApplication>}
 */
const applyForJob = async (jobId, applicantId, applicationBody) => {
  // Check if job exists and is open
  const job = await Job.findById(jobId);
  if (!job) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Job not found');
  }
  if (job.status !== 'open') {
    throw new ApiError(httpStatus.BAD_REQUEST, 'Job is not open for applications');
  }

  // Check if already applied
  const existingApplication = await JobApplication.findOne({
    job: jobId,
    applicant: applicantId,
  });
  if (existingApplication) {
    throw new ApiError(httpStatus.BAD_REQUEST, 'You have already applied for this job');
  }

  // Create application
  const application = await JobApplication.create({
    ...applicationBody,
    job: jobId,
    applicant: applicantId,
  });

  // Update job applications count
  job.applicationsCount += 1;
  await job.save();

  return application;
};

/**
 * Get user's job applications
 * @param {ObjectId} applicantId
 * @param {Object} filter - Filter criteria
 * @param {Object} options - Query options
 * @returns {Promise<QueryResult>}
 */
const getUserApplications = async (applicantId, filter, options) => {
  return JobApplication.paginate(
    { applicant: applicantId, ...filter },
    {
      ...options,
      populate: 'job',
    }
  );
};

/**
 * Get job applications (for HR)
 * @param {ObjectId} jobId
 * @param {Object} filter - Filter criteria
 * @param {Object} options - Query options
 * @returns {Promise<QueryResult>}
 */
const getJobApplications = async (jobId, filter, options) => {
  return JobApplication.paginate(
    { job: jobId, ...filter },
    {
      ...options,
      populate: 'applicant',
    }
  );
};

/**
 * Update application status
 * @param {ObjectId} applicationId
 * @param {string} status
 * @returns {Promise<JobApplication>}
 */
const updateApplicationStatus = async (applicationId, status) => {
  const application = await JobApplication.findById(applicationId);
  if (!application) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Application not found');
  }
  application.status = status;
  await application.save();
  return application;
};

/**
 * Schedule interview
 * @param {ObjectId} applicationId
 * @param {Object} interviewDetails
 * @returns {Promise<JobApplication>}
 */
const scheduleInterview = async (applicationId, interviewDetails) => {
  const application = await JobApplication.findById(applicationId);
  if (!application) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Application not found');
  }
  application.interviewSchedule.push(interviewDetails);
  await application.save();
  return application;
};

/**
 * Add note to application
 * @param {ObjectId} applicationId
 * @param {ObjectId} userId
 * @param {string} text
 * @returns {Promise<JobApplication>}
 */
const addApplicationNote = async (applicationId, userId, text) => {
  const application = await JobApplication.findById(applicationId);
  if (!application) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Application not found');
  }
  application.notes.push({
    text,
    addedBy: userId,
  });
  await application.save();
  return application;
};

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
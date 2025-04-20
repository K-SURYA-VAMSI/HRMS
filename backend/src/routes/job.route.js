const express = require('express');
const auth = require('../middleware/auth');
const validate = require('../middleware/validate');
const jobController = require('../controllers/job.controller');
const {
  createJobSchema,
  updateJobSchema,
  applyJobSchema,
  updateApplicationStatusSchema,
  scheduleInterviewSchema,
  addNoteSchema,
} = require('../validations/job.validation');

const router = express.Router();

// Public routes
router.get('/', jobController.queryJobs);
router.get('/:id', jobController.getJobById);

// HR routes
router.post(
  '/',
  auth('hr'),
  validate(createJobSchema),
  jobController.createJob
);

router.patch(
  '/:id',
  auth('hr'),
  validate(updateJobSchema),
  jobController.updateJobById
);

router.delete(
  '/:id',
  auth('hr'),
  jobController.deleteJobById
);

router.get(
  '/:id/applications',
  auth('hr'),
  jobController.getJobApplications
);

router.patch(
  '/applications/:id/status',
  auth('hr'),
  validate(updateApplicationStatusSchema),
  jobController.updateApplicationStatus
);

router.post(
  '/applications/:id/interview',
  auth('hr'),
  validate(scheduleInterviewSchema),
  jobController.scheduleInterview
);

router.post(
  '/applications/:id/notes',
  auth('hr'),
  validate(addNoteSchema),
  jobController.addApplicationNote
);

// Applicant routes
router.post(
  '/:id/apply',
  auth(),
  validate(applyJobSchema),
  jobController.applyForJob
);

router.get(
  '/applications/me',
  auth(),
  jobController.getUserApplications
);

module.exports = router; 
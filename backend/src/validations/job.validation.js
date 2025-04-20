const Joi = require('joi');

const createJobSchema = Joi.object({
  title: Joi.string().required().max(100),
  department: Joi.string().required(),
  description: Joi.string().required(),
  requirements: Joi.string().required(),
  responsibilities: Joi.string().required(),
  salary: Joi.object({
    min: Joi.number().required(),
    max: Joi.number().required().min(Joi.ref('min')),
    currency: Joi.string().valid('USD', 'EUR', 'GBP', 'INR'),
  }).required(),
  location: Joi.string().required(),
  type: Joi.string().valid('full-time', 'part-time', 'contract', 'internship').required(),
  deadline: Joi.date().iso().greater('now').required(),
  skills: Joi.array().items(Joi.string()),
  experience: Joi.object({
    min: Joi.number().required(),
    max: Joi.number().required().min(Joi.ref('min')),
  }).required(),
  education: Joi.string().required(),
  benefits: Joi.array().items(Joi.string()),
});

const updateJobSchema = Joi.object({
  title: Joi.string().max(100),
  department: Joi.string(),
  description: Joi.string(),
  requirements: Joi.string(),
  responsibilities: Joi.string(),
  salary: Joi.object({
    min: Joi.number(),
    max: Joi.number().min(Joi.ref('min')),
    currency: Joi.string().valid('USD', 'EUR', 'GBP', 'INR'),
  }),
  location: Joi.string(),
  type: Joi.string().valid('full-time', 'part-time', 'contract', 'internship'),
  status: Joi.string().valid('open', 'closed', 'draft'),
  deadline: Joi.date().iso().greater('now'),
  skills: Joi.array().items(Joi.string()),
  experience: Joi.object({
    min: Joi.number(),
    max: Joi.number().min(Joi.ref('min')),
  }),
  education: Joi.string(),
  benefits: Joi.array().items(Joi.string()),
});

const applyJobSchema = Joi.object({
  resume: Joi.object({
    url: Joi.string().uri().required(),
    name: Joi.string().required(),
  }).required(),
  coverLetter: Joi.string().max(2000),
  experience: Joi.array().items(
    Joi.object({
      company: Joi.string().required(),
      position: Joi.string().required(),
      startDate: Joi.date().iso().required(),
      endDate: Joi.date().iso().greater(Joi.ref('startDate')),
      current: Joi.boolean(),
      description: Joi.string(),
    })
  ).required(),
  education: Joi.array().items(
    Joi.object({
      institution: Joi.string().required(),
      degree: Joi.string().required(),
      field: Joi.string().required(),
      startDate: Joi.date().iso().required(),
      endDate: Joi.date().iso().greater(Joi.ref('startDate')),
      current: Joi.boolean(),
      grade: Joi.string(),
    })
  ).required(),
  skills: Joi.array().items(Joi.string()).required(),
  references: Joi.array().items(
    Joi.object({
      name: Joi.string().required(),
      position: Joi.string().required(),
      company: Joi.string().required(),
      email: Joi.string().email().required(),
      phone: Joi.string(),
    })
  ),
});

const updateApplicationStatusSchema = Joi.object({
  status: Joi.string().valid('pending', 'reviewing', 'shortlisted', 'rejected', 'hired').required(),
});

const scheduleInterviewSchema = Joi.object({
  type: Joi.string().valid('phone', 'video', 'in-person').required(),
  date: Joi.date().iso().greater('now').required(),
  location: Joi.string().when('type', {
    is: 'in-person',
    then: Joi.required(),
    otherwise: Joi.optional(),
  }),
  notes: Joi.string(),
});

const addNoteSchema = Joi.object({
  text: Joi.string().required().max(500),
});

module.exports = {
  createJobSchema,
  updateJobSchema,
  applyJobSchema,
  updateApplicationStatusSchema,
  scheduleInterviewSchema,
  addNoteSchema,
}; 
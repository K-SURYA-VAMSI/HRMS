const Joi = require('joi');
const { objectId } = require('./custom.validation');

const checkInSchema = Joi.object({
  location: Joi.object({
    latitude: Joi.number().required(),
    longitude: Joi.number().required(),
  }).required(),
});

const checkOutSchema = Joi.object({
  location: Joi.object({
    latitude: Joi.number().required(),
    longitude: Joi.number().required(),
  }).required(),
});

const updateAttendanceSchema = Joi.object({
  status: Joi.string().valid('present', 'absent', 'half-day', 'leave').required(),
  notes: Joi.string().max(500).allow(''),
});

const getAttendanceHistory = {
  query: Joi.object().keys({
    userId: Joi.string().custom(objectId),
    startDate: Joi.date(),
    endDate: Joi.date(),
    sortBy: Joi.string(),
    limit: Joi.number().integer(),
    page: Joi.number().integer(),
  }),
};

const getDepartmentAttendance = {
  params: Joi.object().keys({
    departmentId: Joi.string().custom(objectId).required(),
  }),
  query: Joi.object().keys({
    date: Joi.date(),
    sortBy: Joi.string(),
    limit: Joi.number().integer(),
    page: Joi.number().integer(),
  }),
};

module.exports = {
  checkInSchema,
  checkOutSchema,
  updateAttendanceSchema,
  getAttendanceHistory,
  getDepartmentAttendance,
}; 
const Joi = require('joi');

const createLeaveSchema = Joi.object({
  type: Joi.string()
    .valid('annual', 'sick', 'personal', 'maternity', 'paternity', 'bereavement', 'unpaid')
    .required(),
  startDate: Joi.date().iso().required(),
  endDate: Joi.date().iso().min(Joi.ref('startDate')).required(),
  reason: Joi.string().required().max(500),
  attachments: Joi.array().items(
    Joi.object({
      name: Joi.string().required(),
      url: Joi.string().uri().required(),
    })
  ),
});

const updateLeaveStatusSchema = Joi.object({
  status: Joi.string().valid('approved', 'rejected').required(),
  rejectionReason: Joi.string().max(500).when('status', {
    is: 'rejected',
    then: Joi.required(),
    otherwise: Joi.forbidden(),
  }),
});

const addCommentSchema = Joi.object({
  text: Joi.string().required().max(500),
});

module.exports = {
  createLeaveSchema,
  updateLeaveStatusSchema,
  addCommentSchema,
}; 
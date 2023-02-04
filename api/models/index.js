const joi = require("@hapi/joi");
exports.newUser = joi.object({
  fname: joi.string().required(),
  lname: joi.string().optional().allow(null, ""),
  email: joi.string().required(),
  mobile: joi.string().optional().allow(null, ""),
  password: joi.string().required(),
});
exports.login = joi.object({
  email: joi.string().required(),
  password: joi.string().required(),
});

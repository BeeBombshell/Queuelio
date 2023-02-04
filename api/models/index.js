const joi = require("joi");
exports.newUser = {
  fname: joi.string().required(),
  lname: joi.string().optional().allow(null, ""),
  email: joi.string().required(),
  mobile: joi.string().optional().allow(null, ""),
  password: joi.string().required(),
};
exports.login = {
  email: joi.string().required(),
  password: joi.string().required(),
};

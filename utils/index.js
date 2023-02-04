const fs = require("fs");
const path = require("path");
var files = {};
const joi = require("joi");
const basename = path.basename(__filename);
fs.readdirSync(__dirname)
  .filter((file) => {
    return (
      file.indexOf(".") !== 0 && file !== basename && file.slice(-3) === ".js"
    );
  })
  .forEach((file) => {
    const func = require(path.join(__dirname, file));
    files = { ...files, ...func };
  });
const validate = (schema) => {
  return (req, res, next) => {
    try {
      const { error } = schema.validate(req.body);
      if (error && Array.isArray(error.details) && error.details[0].message) {
        return res.status(400).send(error.details[0].message);
      } else {
        next();
      }
    } catch (e) {
      console.log(e);
      return res.status(400).json({
        success: false,
        message: "error while validating schema",
      });
    }
  };
};
module.exports = {
  files, validate
};

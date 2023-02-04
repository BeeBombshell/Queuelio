const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const dotenv = require("dotenv");
const router = require("./routes");
dotenv.config({});
const path = require("path");
global.db = require("../db/index").getContext();
app.use(bodyParser.urlencoded({ extended: true }));
let validator = require("express-joi-validation")({
  passError: true,
});
const ResHelper = require('../utils/response')
global._validate = validator;
app.use(express.json());
require("./routes")(app, validator);
app.use((err, req, res, next) => {
  if (err.error.isJoi) {
    let errDetail = [];
    // we had a joi error, let's return a custom 400 json response
    if (err.error.details) {
      err.error.details.map(function (item) {
        var temp = {};
        temp[item.context.key] = item.message;
        errDetail.push(temp);
      });
    }

    ResHelper.response(
      res,
      false,
      "Submitted Information is not valid.",
      400,
      errDetail,
      ""
    );
  } else {
    ResHelper.response(res, false, "Error Occured.", 500, "", "");
  }
});
app.use("/", router);
app.listen(process.env.PORT || 3000, () => {
  console.log(`Server is running on port ${process.env.PORT}`);
});

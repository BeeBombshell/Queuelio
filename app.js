const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const dotenv = require("dotenv");
const router = require("./api/routes")
dotenv.config({ path: "./config.env" });
const path = require("path");
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.json())
app.use("/", router);
app.listen(process.env.PORT || 3000, () => {
  console.log(`Server is running on port ${process.env.PORT}`);
});

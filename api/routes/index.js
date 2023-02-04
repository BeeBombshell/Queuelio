const router = require("express").Router();
const AuthControllers = require("../controllers/Auth");
const { newUser, login } = require("../models");
module.exports = function (app, validate) {
  app.post("/auth/register", validate.body(newUser), AuthControllers.Register);
  app.post("/auth/login", validate.body(login), AuthControllers.Login);
};

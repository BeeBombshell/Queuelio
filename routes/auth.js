const express = require("express");
const router = express.Router();
const session = require('express-session');
const passport = require('passport');
console.log(constants)
const { auth, isLoggedIn } = require(constants.middlewares.auth);
const AuthControllers = require(constants.controllers.auth);
console.log(constants.middlewares)
const {response} = constants.utils;
const User = require("../models/user");
console.log(AuthControllers)
router.get("/", isLoggedIn, AuthControllers.GetLoggedIn);
router.get("/logout", isLoggedIn, AuthControllers.Logout);

router.post("/", AuthControllers.Login);

// router.get("/register", isLoggedIn, AuthControllers.Register);

router.post("/register", AuthControllers.Register);
router.get("/test", AuthControllers.CreateUser);
module.exports = router;

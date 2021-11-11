const express = require("express");
const router = express.Router();
const session = require('express-session');
const passport = require('passport');

const { auth, isLogedIn } = require('../Midlewares/auth.js');

const User = require("../models/user");

router.get("/",isLogedIn, (req, res) => {

  res.render("login", {isLogedIn: req.isLogedIn});
});

router.post("/", (req, res) => {
  const user = new User({
    username: req.body.username,
    password: req.body.password
  });

  req.login(user, (err) => {
    if(err){
      console.log(err);
    }else{
      passport.authenticate("local")(req, res, () => {
        if(typeof(req.session.redirectedFrom) != 'undefined'){
            res.redirect(req.session.redirectedFrom);
        }else{
          res.redirect("/");
        }
      });
    }
  });
});

router.get("/register",isLogedIn, (req, res) => {

    res.render("register", {isLogedIn: req.isLogedIn});
});

router.post("/register", (req, res) => {
  const name = req.body.name;
  const userName = req.body.username;
  const password = req.body.password;

  User.register({username: userName}, password, (err, user) => {
    if(err){
      console.log(err);
      res.redirect("/auth/register");
    }else{
      user.name = name;
      user.save();


      passport.authenticate("local")(req, res, () => {
        if(typeof(req.session.redirectedFrom) != 'undefined'){
            res.redirect(req.session.redirectedFrom);
        }else{
          res.redirect("/");
        }
      });
    }
  });
});

module.exports = router;

const mongoose = require('mongoose');
const session = require('express-session');
const passport = require('passport')
const passportLocalMongoose = require('passport-local-mongoose');

const userSchema = new mongoose.Schema({
  name: String,
  email: String,
  password: String
});

userSchema.plugin(passportLocalMongoose);

const User = mongoose.model("User", userSchema);

passport.use(User.createStrategy());

passport.serializeUser(function(user, done) {
  done(null, user.id);
});

passport.deserializeUser(function(id, done) {
  User.findById(id, function(err, user) {
    done(err, user);
  });
});

module.exports = {
  name : "User",
  model : mongoose.model("user", userSchema)
}

const auth = (req, res, next) => {
  req.session.redirectedFrom = "/queue" + req.url;
  if (req.isAuthenticated()) {
    next();
  } else {
    res.redirect("/auth");
  }
};

const isLoggedIn = (req, res, next) => {
  if (req.isAuthenticated()) {
    req.isLoggedIn = true;
  } else {
    req.isLoggedIn = false;
  }
  next();
};

module.exports = { auth, isLoggedIn };

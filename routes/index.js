const express = require("express");
const router = express.Router();

const { isLoggedIn } = require('../middlewares/auth.js');

router.get("/", isLoggedIn, (req, res) => {

  res.render("index", { isLoggedIn: req.isLoggedIn });
});

module.exports = router

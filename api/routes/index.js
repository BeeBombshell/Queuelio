const router = require('express').Router();
const AuthControllers = require("../controllers/Auth")
router.post("/auth/register", AuthControllers.Register);
router.post("/auth/login", AuthControllers.Login);
module.exports = router;
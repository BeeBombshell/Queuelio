const router = require("express").Router();
const AuthControllers = require("../controllers/Auth");
const { newUser, login } = require("../models");
const { validate } = require("../../utils");
// module.exports = function (app, validate) {
//   app.post("/auth/register", validate.body(newUser), AuthControllers.Register);
//   app.post("/auth/login", validate.body(login), AuthControllers.Login);
//   app.get("/healthz", (req, res) => {
//     try {
//       console.log("Server running");
//       return res.status(200).json({
//         success: true,
//       });
//     } catch (e) {
//       console.log("Server not running", e);
//       return res.status(500).json({
//         success: false,
//       });
//     }
//   });
// };

router.post("/auth/register", validate(newUser), AuthControllers.Register);
router.post("/auth/login", validate(login), AuthControllers.Login);
router.get("/healthz", (req, res) => {
  try {
    console.log("Server running");
    return res.status(200).json({
      success: true,
    });
  } catch (e) {
    console.log("Server not running", e);
    return res.status(500).json({
      success: false,
    });
  }
});
module.exports = router;
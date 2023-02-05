const { response, messages } = require("../../utils/response");
const User = require("../../services/user.service");
const UserServices = new User();

const Register = async (req, res) => {
  try {
    const { email, mobile, fname, lname, password } = req.body;
    const createUser = await UserServices.insert({
      email,
      mobile,
      fname,
      lname,
      password,
    });

    response(
      res,
      createUser.status,
      messages[createUser.code],
      createUser.status ? 201 : 400,
      "",
      ""
    );
  } catch (error) {
     console.log(error)
    response(res, false, messages.error, 500, "", "");
  }
};

const Login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const verifyAuth = await UserServices.verifyPasswordAndCreateToken({
      email,
      password,
    });

    response(
      res,
      verifyAuth.status,
      messages[verifyAuth.code],
      verifyAuth.status ? 201 : 400,
      verifyAuth.status ? { token: verifyAuth.token } : "",
      ""
    );
  } catch (error) {
    response(res, false, messages.error, 500, "", "");
  }
};

module.exports = {
     Login, Register
}
const response = (res, status, message, code, data, token) => {
  const resModel = {
    meta: {
      Status: status ? status : false,
      Message: message ? message : "",
      code: code ? code : 200,
    },
    Data: data ? data : {},
    Token: token ? token : "",
  };
  res.status(code).json(resModel);
};

const isValidResponse = (data) => {
  return (
    data &&
    Array.isArray(data) &&
    data.length
  );
};

const messages = {
  auth : {
    5 : "User already exists",
    10 : "User registered successfully",
    15 : "No account exists for the given mail id",
    20 : "User verified successfully",
    25 : "Login credentials provided cannot be verified"
  },
  error : "Internal Server Error"
}
module.exports = {
  response,
  isValidResponse,
  messages
};

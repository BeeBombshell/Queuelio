// console.log(require('crypto').randomBytes(64).toString('hex'))
require("dotenv").config({ path: "./config/config.env" });
const User = require("./api/queries/services/user.service");

(async () => {
     const users = new User();
     // const usr = await users.insert({
     //      email: "test1@test.com",
     //      password: "test",
     //      fname: "test1",
     //      lname: "user",
     //      mobile: "9987654321"
     // })
     // const usr = await users.verifyPasswordAndCreateToken({
     //      email: "test1@test.com",
     //      password: "test"
     // })
     try {
          const usr = await users.verifyToken({
               token : "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJmbmFtZSI6InRlc3QxIiwibG5hbWUiOiJ1c2VyIiwiZW1haWwiOiJ0ZXN0MUB0ZXN0LmNvbSIsInVzZXJfaWQiOiJiNWVhMjJmOS1hNjAxLTQxMTYtOTE2Yi1jZDE3MmIwZGUxMzkiLCJpc1ZlcmlmaWVkIjp0cnVlLCJpYXQiOjE2NjQ5NjQ0Mjd9.A99DGlpiT1ufFt8Xpv2j2a_wEG5VJ7fPkSFJyfJ21SI"
          })
          console.log(usr);
     } catch (e) {
          reject(e)
     }
     
})();
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { v4: uuidv4 } = require("uuid");
const users = require("../queries/users");
class User {
  async insert({ email, password, fname, lname, mobile }) {
    return new Promise(async (resolve, reject) => {
      try {
        let data = {
          email,
          fname,
          lname,
          mobile,
        };
        const userExists = await users.get({ filter: { email } });
        if (userExists.status) {
          resolve({ status: false, error: 15 });
        } else {
          bcrypt.hash(password, 10, async (err, hash) => {
            if (!err) {
              const insert_user = await users.insert({
                ...data,
                hash,
                user_id: uuidv4(),
              });
              if (insert_user.status) {
                resolve({ status: true });
              } else {
                resolve({ status: false });
              }
            } else {
              resolve({ status: false, error: "Unable to create user" });
            }
          });
        }
      } catch (error) {
        reject(error);
      }
    });
  }
  async verifyPasswordAndCreateToken({ email, password }) {
    return new Promise(async (resolve, reject) => {
      try {
        const user = await users.get({
          filter: { email },
          cols: ["hash", "fname", "lname", "email", "user_id", "mobile"],
        });
        let resDict = {
          status: false,
        };
        if (user.status) {
          if (bcrypt.compareSync(password, user.data.hash)) {
            resDict.status = true;
            resDict.code = 20;
            let tokenData = {
              ...user.data,
              isVerified: true,
            };
            delete tokenData.hash;
            const token = jwt.sign(tokenData, process.env.JWT_SECRET);
            resDict.token = token;
          } else {
            resDict.code = 25;
          }
        } else {
          resDict.code = 5;
        }

        resolve(resDict);
      } catch (error) {
        console.log(error);
        reject(error);
      }
    });
  }
  async verifyToken({ token }) {
    return new Promise(async (resolve, reject) => {
      try {
        resolve({
          status: jwt.verify(token, process.env.JWT_SECRET),
        });
      } catch (error) {
        reject(error);
      }
    });
  }
}

module.exports = User;

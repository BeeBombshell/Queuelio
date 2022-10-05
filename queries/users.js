const db = require("../db/index").getContext();
const utils = require("../utils/response");
const insert = (data) => {
  return new Promise(async (resolve, reject) => {
    try {
      const insertData = await db("users").insert(data);
      resolve(insertData ? { status: true } : { status: false });
    } catch (error) {
      reject({ error, status: false });
    }
  });
};

const get = ({filter, cols}) => {
  return new Promise(async (resolve, reject) => {
    try {
      const data = await db("users").select(cols).where(filter);
      if (utils.isValidResponse(data)) {
        resolve({ status: true, data: data[0], code: 10 });
      } else {
        resolve({ status: false, error: "Unable to fetch data", code : 5});
      }
    } catch (error) {
      reject(error);
    }
  });
};

module.exports = {
  insert,
  get,
};

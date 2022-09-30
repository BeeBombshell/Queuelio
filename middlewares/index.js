const fs = require('fs');
const path = require('path');
var files = {};
const basename = path.basename(__filename);
fs.readdirSync(__dirname)
  .filter((file) => {
    return (
      file.indexOf(".") !== 0 && file !== basename && file.slice(-3) === ".js"
    );
  })
  .map((file) => {
     return file.slice(0, -3)
  })
  .forEach((file) => {
//     const func = require();
    console.log(file)
    files[file] = path.join(__dirname, file)
  });
module.exports = files
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
  .forEach((file) => {
    const func = require(path.join(__dirname, file));
    files = {...files, ...func}
  });
module.exports = files
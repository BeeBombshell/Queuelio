//path constants
const db = {
  models: root + "/models",
  mysql: root + "/db"
};
const middlewares = require(root + "/middlewares");
const routes = root + "/routes";
const controllers = {
  auth: root + "/controllers/Auth.js",
  queue: "",
};
const services = {
  auth: "",
  user: "",
  queues: "",
  activity: "",
  payments: "",
};
const utils = require(root + "/utils")
const config = {
  db_config: "",
};

module.exports = {
  db,
  middlewares,
  config,
  controllers,
  routes,
  utils,
  services,
};

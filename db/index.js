const { development } = require('./knexfile');
let dbContext = {
  knex: null,
  getContext: function() {
    knex = require('knex')(development);
    // knex = require("knex")(configTestServer);
    // knex = require("knex")(configServer);
    return knex;
  },
  destroyContext: function() {
    // knex.destroy();
    console.log("Distroy end.");
  }
};
module.exports = dbContext;
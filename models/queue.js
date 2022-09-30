const mongoose = require('mongoose');

const queueSchema = new mongoose.Schema({
  adminID: String,
  adminName: String,
  title: String,
  paused: Boolean,
  maxLimit: Number,
  joinedUsersID: [String],
  joinedUsersName: [String]
});

module.exports = {
  name : "Queue",
  model : mongoose.model("Queue", queueSchema)
}

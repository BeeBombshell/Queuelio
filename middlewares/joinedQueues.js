const Queue = require("../models/queue");

const getJoinedQueues = async (req, res, next) => {

  await Queue.find((err, foundQueues) => {
    let joinedQueues = [];
    for(queue of foundQueues){
      if(queue.joinedUsersID.indexOf(req.user._id) != -1){
        joinedQueues.push(queue);
      }
    }
    req.joinedQueues = joinedQueues;
    next();
  });

}

module.exports = { getJoinedQueues };

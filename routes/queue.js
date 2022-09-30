const express = require("express");
const router = express.Router();
const qr = require("qrcode");

const { auth, isLoggedIn } = require("../middlewares/auth.js");
const { getJoinedQueues } = require("../middlewares/joinedQueues.js");

const Queue = require("../models/queue");
const User = require("../models/user");

router.get("/all", isLoggedIn, (req, res) => {
  Queue.find((err, foundQueues) => {
    foundQueues.reverse();
    res.render("allQueues", {
      isLoggedIn: req.isLoggedIn,
      queues: foundQueues,
    });
  });
});

router.get("/indi/:queueCode", auth, isLoggedIn, (req, res) => {
  const queueCode = req.params.queueCode;

  Queue.findOne({ _id: queueCode }, (err, foundQueue) => {
    const host = req.get("host");
    const address = "https://" + host + "/queue/join/" + queueCode;

    const userPos = foundQueue.joinedUsersID.indexOf(req.user._id) + 1;

    let isAdmin = false;
    if (foundQueue.adminID == req.user._id) {
      isAdmin = true;

      qr.toDataURL(address, (err, src) => {
        if (err) res.send("Error occured");
        User.findOne({ _id: foundQueue.joinedUsersID[0] }, (err, foundUser) => {
          let nexTurn = "Empty Queue";
          if (foundUser) {
            nexTurn = foundUser.name;
          }
          res.render("indiQueue", {
            isLoggedIn: req.isLoggedIn,
            queue: foundQueue,
            userPos: userPos,
            isAdmin: isAdmin,
            nexTurn: nexTurn,
            qrUrl: src,
          });
        });
      });
    } else {
      res.render("indiQueue", {
        isLoggedIn: req.isLoggedIn,
        queue: foundQueue,
        userPos: userPos,
        isAdmin: isAdmin,
      });
    }
  });
});

router.get("/created", auth, isLoggedIn, (req, res) => {
  Queue.find({ adminID: req.user._id }, (err, foundQueues) => {
    foundQueues.reverse();
    res.render("myQueues", {
      isLoggedIn: req.isLoggedIn,
      queues: foundQueues,
      forWhat: "created",
    });
  });
});

router.get("/", auth, isLoggedIn, getJoinedQueues, (req, res) => {
  req.joinedQueues.reverse();
  res.render("myQueues", {
    isLoggedIn: req.isLoggedIn,
    queues: req.joinedQueues,
    forWhat: "joined",
  });
});

router.get("/create", auth, isLoggedIn, (req, res) => {
  res.render("createQueue", { isLoggedIn: req.isLoggedIn });
});

router.post("/create", (req, res) => {
  const newQueue = new Queue({
    adminID: req.user._id,
    adminName: req.user.name,
    title: req.body.queueName,
    paused: false,
    maxLimit: req.body.maxLimit,
    joinedUsersID: [],
  });

  newQueue.save((err) => {
    if (err) {
      console.log(err);
    } else {
      res.redirect("/queue/created");
    }
  });
});
router.post("/pause", (req, res) => {
  const queueCode = req.body.queueCode;

  Queue.findOne({ _id: queueCode }, (err, foundQueue) => {
    foundQueue.paused = !foundQueue.paused;
    foundQueue.save((err) => {
      if (err) {
        console.log(err);
      } else {
        res.redirect("/queue/indi/" + foundQueue._id);
      }
    });
  });
});

router.get("/join", auth, isLoggedIn, (req, res) => {
  res.render("joinQueue", { isLoggedIn: req.isLoggedIn });
});

router.get("/join/:queueCode", auth, (req, res) => {
  const queueCode = req.params.queueCode;

  Queue.findOne({ _id: queueCode }, (err, foundQueue) => {
    if (foundQueue.joinedUsersID.length !== foundQueue.maxLimit) {
      if (!foundQueue.paused) {
        if (foundQueue.joinedUsersID.indexOf(req.user._id) == -1) {
          foundQueue.joinedUsersID.push(req.user._id);
          foundQueue.joinedUsersName.push(req.user.name);
          foundQueue.save((err) => {
            if (err) {
              console.log(err);
            } else {
              res.redirect("/queue/indi/" + foundQueue._id);
            }
          });
        } else {
          if (foundQueue.joinedUsersID[0] == req.user._id) {
            foundQueue.joinedUsersID.shift();
            foundQueue.save();
            res.render("checkIn", {
              isLoggedIn: req.isLoggedIn,
              userName: req.user.name,
            });
          } else {
            res.send("Its not your turn");
          }
        }
      } else {
        res.send("The queue is currently paused by the admin");
      }
    } else {
      res.send("Queue is Full");
    }
  });
});

router.post("/join", (req, res) => {
  const queueCode = req.body.queueCode;

  Queue.findOne({ _id: queueCode }, (err, foundQueue) => {
    if (foundQueue.joinedUsersID.length !== foundQueue.maxLimit) {
      if (!foundQueue.paused) {
        if (foundQueue.joinedUsersID.indexOf(req.user._id) == -1) {
          foundQueue.joinedUsersID.push(req.user._id);
          foundQueue.joinedUsersName.push(req.user.name);
          foundQueue.save((err) => {
            if (err) {
              console.log(err);
            } else {
              res.redirect("/queue/indi/" + foundQueue._id);
            }
          });
        } else {
          res.send("You are already in the queue");
        }
      } else {
        res.send("The queue is currently paused by the admin");
      }
    } else {
      res.send("Queue is Full");
    }
  });
});

router.post("/checkIn", (req, res) => {
  const queueCode = req.body.queueCode;

  Queue.findOne({ _id: queueCode }, (err, foundQueue) => {
    if (!foundQueue.paused) {
      if (foundQueue.joinedUsersID[0] == req.user._id) {
        foundQueue.joinedUsersID.shift();
        foundQueue.joinedUsersName.shift();
        foundQueue.save();
        res.render("checkIn", {
          isLoggedIn: req.isLoggedIn,
          userName: req.user.name,
        });
      } else {
        res.send("Its not your turn");
      }
    } else {
      res.send("The queue is currently paused by the admin");
    }
  });
});

router.post("/delete", (req, res) => {
  const queueCode = req.body.queueCode;

  Queue.findOneAndDelete({ _id: queueCode }, (err, docs) => {
    res.redirect("/queue/created");
  });
});

router.get("/data/:queueCode", auth, (req, res) => {
  const queueCode = req.params.queueCode;

  Queue.findOne({ _id: queueCode }, (err, foundQueue) => {
    const userPos = foundQueue.joinedUsersID.indexOf(req.user._id) + 1;
    User.findOne({ _id: foundQueue.joinedUsersID[0] }, (err, foundUser) => {
      let nexTurn = "Empty Queue";
      if (foundUser) {
        nexTurn = foundUser.name;
      }
      res.json({
        joinedUsersName: foundQueue.joinedUsersName,
        queueLength: foundQueue.joinedUsersID.length,
        nexTurn: nexTurn,
        userPos: userPos,
      });
    });
  });
});

router.get("/rmUser/:rmUserName/:queueCode", auth, (req, res) => {
  const userName = req.params.rmUserName;
  const queueCode = req.params.queueCode;

  Queue.findOne({ _id: queueCode }, (err, foundQueue) => {
    let rmIndex = foundQueue.joinedUsersName.indexOf(userName);
    foundQueue.joinedUsersID.splice(rmIndex, 1);
    foundQueue.joinedUsersName.splice(rmIndex, 1);
    foundQueue.save();
    res.send({ success: true });
  });
});

module.exports = router;

const session = require("express-session");
const passport = require("passport");
const User = require("../models/user");
const GetLoggedIn = (req, res) => {
  return res.status(200).json({
    isLoggedIn: req.isLoggedIn,
  });
};
const Logout = (req, res) => {
  req.logout();
  return res.status(200).json({
    msg: "logout success",
  });
};
const Login = (req, res) => {
  const user = new User({
    username: req.body.username,
    password: req.body.password,
  });

  req.login(user, (err) => {
    if (err) {
      console.log(err);
    } else {
      passport.authenticate("local")(req, res, () => {
        if (typeof req.session.redirectedFrom != "undefined") {
          return res.status(200).json({
            success: true,
            msg: "redirect",
            data: {
              username: user.username,
              userId: req.user._id,
            },
          });
        } else {
          console.log(user);
          return res.status(200).json({
            success: true,
            data: {
              username: user.username,
              userId: req.user._id,
            },
          });
        }
      });
    }
  });
};
const Register = async (req, res) => {
     const name = req.body.name;
     const userName = req.body.username;
     const password = req.body.password;
   
     User.register({ username: userName }, password, (err, user) => {
       if (err) {
         console.log(err);
         return res.status(500).json({
           success : false,
           msg : "unable to register"
         })
       } else {
         user.name = name;
         user.save();
   
   
         passport.authenticate("local")(req, res, () => {
           if (typeof (req.session.redirectedFrom) != 'undefined') {
             return res.status(200).json({
               success : true,
               msg : "redirect",
               data : {
                 username : userName,
                 userId : req.user._id
               }
             })
           } else {
             return res.status(200).json({
               success : true,
               data : {
                 username : userName,
                 userId : req.user._id
               }
             })
           }
         });
       }
     });
   }
const CreateUser = async (req, res) => {
  try {
    // const user = req.body;
    console.log('----')
    const list = await _db.raw(`select * from users`);
    console.log(list)
    res.json(list);
  } catch (error) {
    
  }
}
module.exports = {
  GetLoggedIn,
  Logout,
  Login,
  Register,
  CreateUser
};

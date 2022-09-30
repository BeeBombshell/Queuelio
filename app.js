
const express = require("express");
const bodyParser = require("body-parser");
const ejs = require("ejs");
const mongoose = require('mongoose');
const session = require('express-session');
const passport = require('passport');
const dotenv = require("dotenv")
dotenv.config({ path: './config/config.env' });
const path = require("path");
global.root = path.resolve(__dirname);
global.constants = require(root + "/constants");

// var validator = require("express-joi-validation")({
//   passError: true, // NOTE: this tells the module to pass the error along for you
// });

// global._validate = validator;
global._pathconst = require("./constants");
global._db = require(_pathconst.db.mysql).getContext();
// console.log(_db);

(async () => {
  const list = await _db.raw(`select * from users`);
  console.log(list)
})();
// Routers
const indexRouter = require("./routes/index");
const authRouter = require("./routes/auth");
const queueRouter = require("./routes/queue");

const app = express();

app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("public"));

app.use(session({
  secret: 'testSecret',
  resave: false,
  saveUninitialized: false
}));

app.use(passport.initialize());
app.use(passport.session());

mongoose.connect(process.env.DATABASE_URL, {useNewUrlParser: true, useUnifiedTopology: true});
mongoose.set('useFindAndModify', false);
mongoose.set('useCreateIndex', true);

// Using Routes
app.use("/", indexRouter);
app.use("/auth", authRouter);
app.use("/queue", queueRouter);
// app.use("/logout",indexRouter)

app.listen(process.env.PORT || 3000, () => {
  console.log(`Server is running on port ${process.env.PORT}`);
});

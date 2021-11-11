
const express = require("express");
const bodyParser = require("body-parser");
const ejs = require("ejs");
const mongoose = require('mongoose');
const session = require('express-session');
const passport = require('passport');
const dotenv = require("dotenv")
dotenv.config({ path: './config/config.env' });

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

mongoose.connect("mongodb+srv://consumer:famousguydb@cluster0.jasyd.mongodb.net/QlioDB?retryWrites=true&w=majority", {useNewUrlParser: true, useUnifiedTopology: true});
mongoose.set('useFindAndModify', false);
mongoose.set('useCreateIndex', true);

// Using Routes
app.use("/", indexRouter);
app.use("/auth", authRouter);
app.use("/queue", queueRouter);


app.listen(process.env.PORT || 3000, () => {
  console.log("Server is running on port 3000");
});

// Adding packages for express server.
const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const session = require("express-session");
const MongoStore = require("connect-mongo")(session);
const passport = require("passport");
const passportLocalMongoose = require("passport-local-mongoose");
const cookieParser = require("cookie-parser");

// Sets up routes.
const giftListRouter = require("./routes/giftList_routes");
const userRouter = require("./routes/user_routes");
const authRouter = require("./routes/auth_routes");
const childGiftListRouter = require("./routes/childGiftList_routes");

// Adds mongoose connection from config files.
const { mongooseConnect } = require("./config/mongoose");

// Sets up app to function.
const app = express();
const port = process.env.PORT || 3009;

// Sets up CORS for localhost and deployed site.
const whitelist = [
  "http://localhost:3000",
  "https://north-pole-post.netlify.app/",
];
app.set("trust proxy", 1);
app.use(cookieParser());

const corsOptions = {
  credentials: true,
  origin: function (origin, callback) {
    const whitelistIndex = whitelist.findIndex((url) => url.includes(origin));
    callback(null, whitelistIndex > -1);
  },
};

app.use(cors(corsOptions));

app.use(bodyParser.json());

if (process.env.NODE_ENV !== "production") {
  require("dotenv").config();
}

const databaseConnection = process.env.NODE_ENV;

mongooseConnect(databaseConnection);

// Sets up express session.
app.use(
  session({
    secret: "we love Santa",
    resave: false,
    saveUninitialized: false,
    proxy: true,
    cookie: {
      maxAge: 1800000,
      sameSite: "none",
      secure: true,
      httpOnly: false,
    },
    store: new MongoStore({
      mongooseConnection: mongoose.connection,
    }),
  })
);

// Adds passport to server.
require("./config/passport");
app.use(passport.initialize());
app.use(passport.session());

// Sets up prefixes for routes.
app.use("/auth", authRouter);
app.use("/giftlist", giftListRouter);
app.use("/dashboard", userRouter);
app.use("/lettertosanta", childGiftListRouter);

// Displays a simple line to say that this is the backend when visiting the deployed site.
app.get("/", (req, res) => {
  res.send("Backend for North Pole Post");
});

app.listen(port, () => console.log(`Santa app listening on port ${port}!`));

module.exports = {
  app,
};

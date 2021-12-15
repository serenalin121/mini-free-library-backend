require("dotenv").config();
require("./config/db.connection");

const express = require("express");
const cors = require("cors");
const routes = require("./routes");
const session = require("express-session");
const passport = require("passport");
const MongoDBStore = require("connect-mongodb-session")(session);
const { URLSearchParams } = require("url");
const app = express();
const PORT = process.env.PORT || 3003;

const whitelist = ["http://localhost:3000", process.env.HEROKUFRONTEND];

const corsOptions = {
  origin: function (origin, callback) {
    if (whitelist.indexOf(origin) !== -1 || !origin) {
      callback(null, true);
    } else {
      callback(new Error("Not allowed by CORS"));
    }
  },
  credentials: true,
};

app.use(cors(corsOptions));

app.use(
  session({
    secret: process.env.SECRET,
    resave: false,
    saveUninitialized: false,
    store: new MongoDBStore({
      uri: process.env.MONGODB_URI,
      collection: "mySessions",
    }),
    cookie: {
      sameSite: "none",
      secure: true,
    },
  })
);

// app.use(
//   session({
//     secret: "thisIsATopSecret",
//     resave: false,
//     saveUninitialized: false,
//   })
// );

app.use(passport.initialize());
app.use(passport.session());

const isAuthenticated = (req, res, next) => {
  console.log("check auth");
  console.log(req.session.passport);

  if (req.session.passport?.user) {
    return next();
  } else {
    res.status(403).json({ msg: "Signin required" });
  }
};
app.use(express.json());

app.use("/library", isAuthenticated, routes.libraries);
app.use("/books", isAuthenticated, routes.books);
app.use("/users", routes.users);
app.use("/admins", routes.admins);

app.get(
  "/auth/google/user",
  passport.authenticate("google-user", { scope: ["email", "profile"] })
);

app.get(
  "/auth/google/admin",
  passport.authenticate("google-admin", { scope: ["email", "profile"] })
);

app.get(
  "/auth/google/callback/user",
  passport.authenticate("google-user", {
    failureRedirect: "http://localhost:3000",
  }),
  function (req, res) {
    const query = {
      email: req.session.passport?.user?.email,
    };

    const urlParameters = new URLSearchParams(query);
    // Successful authentication, redirect secrets.
    res.redirect("http://localhost:3000/user?" + urlParameters);
  }
);

app.get(
  "/auth/google/callback/admin",
  passport.authenticate("google-admin", {
    failureRedirect: "http://localhost:3000",
  }),
  function (req, res) {
    const query = {
      email: req.session.passport?.user?.email,
    };

    const urlParameters = new URLSearchParams(query);
    // Successful authentication, redirect secrets.
    res.redirect("http://localhost:3000/admin?" + urlParameters);
  }
);

app.listen(PORT, () => {
  console.log(`Connected on Port: ${PORT}`);
});

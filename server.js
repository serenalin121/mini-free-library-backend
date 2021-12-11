require("dotenv").config();
require("./config/db.connection");

const express = require("express");
const cors = require("cors");
const routes = require("./routes");
const session = require("express-session");

const app = express();
const PORT = process.env.PORT || 3003;

const whitelist = ["http://localhost:3000", "heroku url here"];
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
    secret: "thisIsATopSecret",
    resave: false,
    saveUninitialized: false,
  })
);

const isAuthenticated = (req, res, next) => {
  console.log(req.session);

  if (req.session.currentUser) {
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

app.listen(PORT, () => {
  console.log(`Connected on Port: ${PORT}`);
});

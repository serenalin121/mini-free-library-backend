require("dotenv").config();
require("./config/db.connection");

const express = require("express");
const cors = require("cors");
// const routes = require("./routes");

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
};

app.use(cors(corsOptions));

app.use(express.json());

// app.use("/library", routes.library);

app.listen(PORT, () => {
  console.log(`Connected on Port: ${PORT}`);
});

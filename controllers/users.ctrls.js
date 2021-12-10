const db = require("../models");
const bcrypt = require("bcrypt");

const signup = (req, res) => {
  console.log("signup");
  req.body.password = bcrypt.hashSync(
    req.body.password,
    bcrypt.genSaltSync(10)
  );
  db.User.create(req.body, (err, createdUser) => {
    if (err) {
      res.status(400).json({ err: err.message });
    } else {
      req.session.currentUser = createdUser;
      res.status(200).json(createdUser);
    }
  });
};

const signin = (req, res) => {
  db.User.findOne({ email: req.body.email }, (err, foundUser) => {
    if (err) {
      res.send(err);
    } else {
      if (foundUser) {
        if (bcrypt.compareSync(req.body.password, foundUser.password)) {
          req.session.currentUser = foundUser;
          res.status(200).json(foundUser);
        } else {
          res
            .status(404)
            .json({ err: "Incorrect Password or Email Address..." });
        }
      } else {
        res.status(400).json({ err: err });
      }
    }
  });
};

const renew = (req, res) => {
  res.status(200).json({ result: !!req.session.currentUser });
};

const signout = (req, res) => {
  req.session.destroy(() => {
    res.status(200).json({ message: "User signed out" });
  });
};

module.exports = {
  renew,
  signup,
  signin,
  signout,
};

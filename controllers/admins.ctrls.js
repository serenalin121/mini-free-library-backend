const db = require("../models");
const bcrypt = require("bcrypt");

const signup = (req, res) => {
  console.log("signup");
  req.body.password = bcrypt.hashSync(
    req.body.password,
    bcrypt.genSaltSync(10)
  );
  db.Admin.create(req.body, (err, createdAdmin) => {
    if (err) {
      res.status(400).json({ err: err.message });
    } else {
      req.session.currentUser = createdAdmin;
      res.status(200).json(createdAdmin);
    }
  });
};

const signin = (req, res) => {
  db.Admin.findOne({ email: req.body.email }, (err, foundAdmin) => {
    if (err) {
      res.send(err);
    } else {
      if (foundAdmin) {
        if (bcrypt.compareSync(req.body.password, foundAdmin.password)) {
          req.session.currentUser = foundAdmin;

          res.status(200).json(foundAdmin);
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
    res.status(200).json({ message: "Admin signed out" });
  });
};

module.exports = {
  renew,
  signup,
  signin,
  signout,
};

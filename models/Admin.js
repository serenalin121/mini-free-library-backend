const mongoose = require("mongoose");
const { Schema, model } = mongoose;
const passportLocalMongoose = require("passport-local-mongoose");
const findOrCreate = require("mongoose-findorcreate");
const passport = require("passport");
const GoogleStrategy = require("passport-google-oauth20").Strategy;

const adminSchema = new Schema({
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
  },
  isAdmin: Boolean,
});

const backendUrl =
  process.env.NODE_ENV !== "production"
    ? "http://localhost:3003"
    : process.env.HEROKUBACKEND;

adminSchema.plugin(passportLocalMongoose);
adminSchema.plugin(findOrCreate);

const Admin = model("Admin", adminSchema);

passport.use(
  "google-admin",
  new GoogleStrategy(
    {
      clientID: process.env.CLIENT_ID,
      clientSecret: process.env.CLIENT_SECRET,
      callbackURL: `${backendUrl}/auth/google/callback/admin`,
      userProfileURL: "https://www.googleapis.com/oauth2/v3/userinfo",
    },
    function (accessToken, refreshToken, profile, cb) {
      Admin.findOrCreate(
        { email: profile.emails[0].value },
        function (err, user) {
          user.isAdmin = true;
          return cb(null, user);
        }
      );
    }
  )
);

module.exports = Admin;

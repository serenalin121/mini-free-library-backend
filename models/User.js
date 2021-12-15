const mongoose = require("mongoose");
const { Schema, model } = mongoose;
const passportLocalMongoose = require("passport-local-mongoose");
const findOrCreate = require("mongoose-findorcreate");
const passport = require("passport");
const GoogleStrategy = require("passport-google-oauth20").Strategy;

const userSchema = new Schema({
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

console.log(process.env.NODE_ENV, backendUrl);

userSchema.plugin(passportLocalMongoose);
userSchema.plugin(findOrCreate);

const User = model("User", userSchema);

passport.use(User.createStrategy());
passport.serializeUser(function (user, done) {
  console.log("serialized", user);
  done(null, user);
});
passport.deserializeUser(function (user, done) {
  console.log("deserialized", user);
  done(null, user);
});
passport.use(
  "google-user",
  new GoogleStrategy(
    {
      clientID: process.env.CLIENT_ID,
      clientSecret: process.env.CLIENT_SECRET,
      callbackURL: `${backendUrl}/auth/google/callback/user`,
      userProfileURL: "https://www.googleapis.com/oauth2/v3/userinfo",
    },
    function (accessToken, refreshToken, profile, cb) {
      console.log("in google strategy");
      User.findOrCreate(
        { email: profile.emails[0].value },
        function (err, user) {
          user.isAdmin = false;
          console.log(err);
          console.log(user);
          return cb(null, user);
        }
      );
    }
  )
);

module.exports = User;

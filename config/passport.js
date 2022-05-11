const GoogleStrategy = require("passport-google-oauth20").Strategy;
const User = require("../models/User");

module.exports = function (passport) {
  passport.use(
    new GoogleStrategy(
      {
        clientID: process.env.GOOGLE_CLIENT_ID,
        clientSecret: process.env.GOOGLE_CLIENT_SECRET,
        callbackURL: "/auth/google/callback",
      },
      async (req, accessToken, refreshToken, profile, done) => {
        const newUser = {
          googleId: profile.id,
          displayName: profile.displayName,
          firstName: profile.name.givenName,
          lastName: profile.name.familyName,
          image: profile.photos[0].value,
        };

        let user = await User.findOne({ googleId: profile.id });
        if (user) {
          done(null, user);
        } else {
          // Create user *DONT FORGET TO REMOVE AFTER THE USERS ARE ADDED
          await User.create(newUser);
          done(null, user);
        }
      }
    )
  );
  passport.serializeUser((user, done) => {
    if (user) {
      done(null, user.id);
    } else {
      done(null, false);
    }
  });

  passport.deserializeUser(async (id, done) => {
    const user = await User.findById(id).catch((err) => {
      console.log(err);
    });

    if (user) {
      done(null, user);
    } else {
      done("error", user);
    }
  });
};

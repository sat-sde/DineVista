const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const User = require('../models/User');

const clientID = (process.env.GOOGLE_CLIENT_ID || 'placeholder').trim();
const clientSecret = (process.env.GOOGLE_CLIENT_SECRET || 'placeholder').trim();

passport.use(new GoogleStrategy({
    clientID: clientID,
    clientSecret: clientSecret,
    callbackURL: process.env.APP_URL + "/auth/google/callback"
  },
  async (accessToken, refreshToken, profile, done) => {
    try {
      // 1. Check if user already exists via Google ID
      let user = await User.findOne({ googleId: profile.id });
      if (user) {
        return done(null, user);
      }

      // 2. Check if user already exists via email (link account)
      user = await User.findOne({ email: profile.emails[0].value });
      if (user) {
        user.googleId = profile.id;
        user.profilePicture = profile.photos[0].value;
        await user.save();
        return done(null, user);
      }

      // 3. Create a new user
      const newUser = new User({
        googleId: profile.id,
        first_name: profile.name.givenName || profile.displayName,
        last_name: profile.name.familyName || '',
        email: profile.emails[0].value,
        profilePicture: profile.photos && profile.photos.length > 0 ? profile.photos[0].value : '',
        role: 'user'
      });

      await newUser.save();
      return done(null, newUser);

    } catch (err) {
      console.error("Google Auth Error:", err);
      return done(err, null);
    }
  }
));

// Serialization: Defines what data is stored in the session cookie
passport.serializeUser((user, done) => {
  done(null, user.id);
});

// Deserialization: Retrieves the user from the DB using the stored ID
passport.deserializeUser(async (id, done) => {
  try {
    const user = await User.findById(id);
    done(null, user);
  } catch (err) {
    done(err, null);
  }
});

module.exports = passport;

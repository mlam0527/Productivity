const router = require('express').Router();
const passport = require('passport');
const { googleClientSecret, googleClientID } = require('../../secrets');
const Account = require('../db/models/Accounts')
//redirect with get request at '/auth/google/' from index.js
router.get('/', passport.authenticate('google', { scope: 'email' }));

//callback after signining in with Google
router.get("/callback", passport.authenticate("google", {
  successRedirect: "/me",
  failureRedirect: "/login"
}));

//strategy to store permanent access token on user model
const GoogleStrategy = require('passport-google-oauth').OAuth2Strategy;
const googleConfig = {
  clientID: googleClientID,
  clientSecret: googleClientSecret,
  callbackURL: '/auth/google/callback'
};

// configure the strategy with our config object, and write the function that passport will invoke after google sends us the user's profile and access token
const strategy = new GoogleStrategy(googleConfig, function (token, refreshToken, profile, done) {

  //passport callback function  
  const googleId = profile.id;
  const name = profile.displayName;
  const email = profile.emails[0].value;

  Account.findOne({ googleId: googleId  })
    .then(function (doc) {
      if (!doc) {
        return Account.create({ googleId, name, email })
          .then(function (doc) {
            done(null, doc);
          });
      } else {
        done(null, doc);
      }
    })
    .catch(done);
});

// register our strategy with passport
passport.use(strategy);

router.use(require('./passport.middleware'));

module.exports = router;
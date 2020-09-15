const router = require('express').Router();
//initialize passport
const passport = require('passport');
router.use(passport.initialize());
router.use(passport.session());

//serialization and deserialization
const User = require('../db/models/user');
passport.serializeUser((user, done) => {
  try {
    done(null, user, id);
  } catch (err) {
    done(err)
  }
}) 
 
passport.deserializeUser((id, done) => {
  User.findById(id)
    .then(user => done(null, user))
    .catch(done);
})

module.exports = router;
const router = require('express').Router();
//initialize passport
const passport = require('passport');
const Account = require('../db/models/Accounts')

// router.use(passport.initialize());
// router.use(passport.session());

//serialization and deserialization
passport.serializeUser((user, done) => {
  try {
    done(null, user.id);
  } catch (err) {
    done(err)
  }
}) 
 
passport.deserializeUser((id, done) => {
  try {
    Account.findById(id).then(user => done(null, user))
  } catch (err) {
    console.log('error')
    done(err)
  }
  // Account.findById(user._id)
  //   .then(user => 
  //   {
  //     console.log(user)
  //     done(null, user)
  //     })
  //   .catch(done());
})

module.exports = router;
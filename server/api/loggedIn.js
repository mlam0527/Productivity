const router = require('express').Router();
const { getGoogleCal } = require('./googleCal');

//define express routes
router.get('/', (req, res, next) => {
  try {
    getGoogleCal();
    console.log('loggedIn In')
    res.send('hello')
  } catch(err) {
    next(err)
  }
})

module.exports = router;
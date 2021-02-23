const router = require('express').Router();
const { getGoogleCal } = require('./googleCal');

//define express routes
router.get('/', async (req, res, next) => {
  try {
    await getGoogleCal().then((data) => {
      
      let today = [];
      let tomorrow = [];
      let following = [];
      res.send(data)
    })
  } catch(err) {
    next(err)
  }
})

module.exports = router;
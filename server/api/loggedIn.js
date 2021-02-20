const router = require('express').Router();
const { getGoogleCal } = require('./googleCal');

//define express routes
router.get('/', async (req, res, next) => {
  try {
    console.log('here')
    // getGoogleCal().then((events) => {
    //   console.log('here')
    //   res.send(events)
    //   console.log(events)
    // })
    const events = await getGoogleCal().then((data) => console.log('api route',     res.send(data)))
    // console.log('events', events)
  } catch(err) {
    next(err)
  }
})

module.exports = router;
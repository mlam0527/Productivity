const router = require('express').Router();

//define express routes
router.get('/', (req, res, next) => {
  try {
    res.send('hello')
  } catch(err) {
    next(err)
  }
})

module.exports = router;
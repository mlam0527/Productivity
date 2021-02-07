const router = require('express').Router();

//require all API routes - '/api/routeName'
router.use('/test', require('./test'))

//404 error handler
router.use((req, res, next)=> {
  const err = new Error('Not found');
  err.status = 404;
  next(err);
})

module.exports = router
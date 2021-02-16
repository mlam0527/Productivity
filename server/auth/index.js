const router = require('express').Router();

//require all API routes - '/api/routeName'
router.use('/login', require('./login'))
// router.use('/signup', require('./signup'))
router.use('/logout', require('./logout'))
router.use('/me', require('./loggedIn'))

//routes for Google oauth
router.use('/google', require('./oauth'))

module.exports = router
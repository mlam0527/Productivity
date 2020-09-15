const express = require('express');
const morgan = require('morgan');
const bodyParser = require('body-parser');
const path = require('path');

const app = express();

//middleware for debugging
app.use(morgan('dev'));

//middleware for body parsing
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}))

//serve static files
app.use(express.static(path.join(__dirname, '../public')));

//authentication with express-session passport and connection-session-sequelize
const session = require('express-session');
//google oauth
if (process.env.Node_ENV === 'development') {
  require('./auth/secrets');
}

//storing secrets in the database - sessionStore
const dbStore = require('./auth/dbStore')
dbStore.sync();

//session middleware
app.use(session({
  secret: process.env.GOOGLE_CLIENT_SECRET || 'secret code',
  store: dbStore,
  resave: false,
  saveUninitialized: false
}))

//API route
app.use('/api', require('./api'))
app.use('/auth', require('./auth'))

//API route doesn't exist then app.get * loads
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '../public/index.html'))
})

//500 server errors
app.use(function(err, req, res, next) {
  console.error(err);
  console.error(err.stack);
  res.status(err.status || 500).send(err.message || 'Internal server error.')
})

module.exports = app;
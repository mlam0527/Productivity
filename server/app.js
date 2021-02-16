const express = require('express');
const morgan = require('morgan');
const bodyParser = require('body-parser');
const path = require('path');
const passport = require('passport');

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

// session middleware
const MongoStore = require('connect-mongo')(session);
const mongoose = require('mongoose');
const { mongoURI } = require('../secrets')

mongoose
  .connect(mongoURI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(console.log('mongodb connected'))
  .catch(err => console.log(err))

app.use(session({
  secret: process.env.GOOGLE_CLIENT_SECRET || 'secret code',
  store: new MongoStore({mongooseConnection: mongoose.connection}),
  resave: false,
  saveUninitialized: false
}))

app.use(passport.initialize());
app.use(passport.session());

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
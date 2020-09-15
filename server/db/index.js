const db = require('./database');

//require models from models folder
const User = require('./models/user');
const Account = require('./models/account');

//define associations between models
User.hasOne(Account)

module.exports = {
  db,
  User,
  Account
}
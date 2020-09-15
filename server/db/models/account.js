const Sequelize = require('sequelize');
const db = require('../database');

//define models
const Account = db.define('account', {
  name: {
    type: Sequelize.STRING
  }
})

module.exports = Account;
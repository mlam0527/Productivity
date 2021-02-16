//connection-session-sequelize stores secrets in the database so that when a server reloads, the current loggedin users are not affected -- https://www.npmjs.com/package/connect-session-sequelize

const db = require('../db');
const express = require('express');
const session = require('express-session');
const Sequelize = require('sequelize');

const SequelizeStore = require('connect-session-sequelize')(session.Store);

// https://sequelize.org/v5/class/lib/sequelize.js~Sequelize.html#instance-constructor-constructor
const secretDB = new Sequelize('secret_database', 'username', 'password', {
  dialect: 'sqlite'
})

const dbStore = new SequelizeStore({ db: secretDB })
//create and config the database for secrets

module.exports = dbStore;
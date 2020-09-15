const Sequelize = require('sequelize');
const db = require('../database');

//define models -- add encryption for passwords (salt and hash)
const User = db.define('user', {
  googleId: { //for google Oaugth
    type: Sequelize.STRING
  },
  email: {
    type: Sequelize.STRING,
    allowNull: false
  },
  password: {
    type: Sequelize.STRING
  }, 
  salt: {
    type: Sequelize.STRING
  }
}, {
    hooks: {
      beforeCreate: setSaltAndPassword,
      beforeUpdate: setSaltAndPassword
  }
})

//uses encryptPassword function to create the saltedHash
User.prototype.correctPassword = function (candidatePassword) {
  return this.User.encryptPassword(candidatePassword, this.salt) === this.password;
}

//used to make sure that no more information is needed is send to the client
const _ = require('lodash')
User.prototype.sanitize = function () {
  return _.omit(this.toJSON(), ['password', 'salt']);
};

// this should generate our random salt
//https://nodejs.org/api/crypto.html#crypto_crypto_randombytes_size_callback
User.generateSalt = function () {
  return crypto.randomBytes(16).toString('base64');
}

// accepts a plain text password and a salt, and returns its hash
User.encryptPassword = function (plainText, salt) {
  const hash = crypto.createHash('sha1'); //creates a hash instances
  hash.update(plaintText);
  hash.update(salt);
  return hash.digest('hex')
};

// we need to salt and hash again when the user enters their password for the first time
// and do it again whenever they change it
function setSaltAndPassword(user) {
  if (user.changed('password')) {
    user.salt = User.generateSalt()
    user.password = User.encryptPassword(user.password, user.salt)
  }
}

module.exports = User;
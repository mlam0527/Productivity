//define database -db
//location of db depends on deployment service
const Sequelize = require('sequelize');
const db = new Sequelize(process.env.DATABASE_URL || 'postgres://localhost:5432/boilerplate', {
  logging: false
})

module.exports = db;
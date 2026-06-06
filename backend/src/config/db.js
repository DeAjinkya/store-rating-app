// const { Sequelize } = require("sequelize");

// const sequelize = new Sequelize(
//  "store_rating",
//  "root",
//  "root",
//  {
//    host: "localhost",
//    dialect: "mysql"
//  }
// );

// module.exports = sequelize;

const { Sequelize } = require("sequelize");

const sequelize = new Sequelize(
  process.env.DB_NAME,
  process.env.DB_USER,
  process.env.DB_PASSWORD,
  {
    host: process.env.DB_HOST,
    dialect: "mysql"
  }
);

console.log("DB_USER:", process.env.DB_USER);
console.log("DB_PASSWORD:", process.env.DB_PASSWORD);
console.log("DB_NAME:", process.env.DB_NAME);

module.exports = sequelize;
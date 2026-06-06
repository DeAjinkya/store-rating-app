const { DataTypes } = require("sequelize");
const sequelize = require("../config/db");

const User = sequelize.define("User", {
  name: {
    type: DataTypes.STRING
  },

  email: {
    type: DataTypes.STRING,
    unique: true
  },

  password: {
    type: DataTypes.STRING
  },

  address: {
    type: DataTypes.STRING
  },

  role: {
    type: DataTypes.ENUM(
      "ADMIN",
      "USER",
      "STORE_OWNER"
    ),
    defaultValue: "USER"
  }
},{
    timestamps: false
  });

module.exports = User;
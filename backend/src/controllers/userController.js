const { Op } = require("sequelize");
const sequelize = require("../config/db");
const Store = require("../models/Store");
const Rating = require("../models/Rating");

const getStores = async (req, res) => {
  try {
    const { search } = req.query;

    let whereCondition = {};

    if (search && search.trim() !== "") {
      whereCondition = {
        [Op.or]: [
          { name: { [Op.like]: `%${search}%` } },
          { address: { [Op.like]: `%${search}%` } },
        ],
      };
    }

    const stores = await Store.findAll({
      where: whereCondition,
    });

    res.json(stores);
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Server error" });
  }
};

module.exports = {
    getStores
};
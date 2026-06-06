const { Op } = require("sequelize");
const Store = require("../models/Store");
const Rating = require("../models/Rating");

const createStore = async (req, res) => {
  try {
    const { name, email, address, ownerId } = req.body;

    const store = await Store.create({
      name,
      email,
      address,
      ownerId
    });

    res.status(201).json({
      message: "Store created successfully",
      store
    });

  } catch (error) {
    res.status(500).json({
      message: error.message
    });
  }
};



const getStores = async (req, res) => {
  try {
    const { search } = req.query;

    const stores = await Store.findAll({
      where: search
        ? {
            [Op.or]: [
              { name: { [Op.like]: `%${search}%` } },
              { address: { [Op.like]: `%${search}%` } },
            ],
          }
        : {},

      include: [
        {
          model: Rating,
          required: false,
        },
      ],
    });

    const result = stores.map((store) => {
      const ratings = store.Ratings || [];

      // calculate average rating
      const avg =
        ratings.length > 0
          ? ratings.reduce((sum, r) => sum + r.rating, 0) /
            ratings.length
          : 0;

      // get current user's rating
      const userRatingObj = ratings.find(
        (r) => r.userId === req.user.id
      );

      return {
        id: store.id,
        name: store.name,
        email: store.email,
        address: store.address,
        averageRating: avg.toFixed(2),
        userRating: userRatingObj ? userRatingObj.rating : null,
      };
    });

    res.status(200).json(result);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

module.exports = {
  createStore,
  getStores
};
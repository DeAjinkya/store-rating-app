const { User, Store, Rating } = require("../models");
const { fn, col } = require("sequelize");

const getDashboard = async (req, res) => {
  try {
    const ownerId = req.user.id;

    const stores = await Store.findAll({
      where: {
        ownerId
      },
      include: [
        {
          model: Rating,
          attributes: ["rating"],
          include: [
            {
              model: User,
              attributes: ["id", "name", "email"]
            }
          ]
        }
      ]
    });

    const dashboard = stores.map((store) => {
      const ratings = store.Ratings;

      const averageRating =
        ratings.length > 0
          ? (
              ratings.reduce(
                (sum, r) => sum + r.rating,
                0
              ) / ratings.length
            ).toFixed(2)
          : "0.00";

      return {
        storeId: store.id,
        storeName: store.name,
        averageRating,
        ratings: ratings.map((r) => ({
          userId: r.User.id,
          userName: r.User.name,
          userEmail: r.User.email,
          rating: r.rating
        }))
      };
    });

    res.status(200).json(dashboard);

  } catch (error) {
    console.error(error);

    res.status(500).json({
      message: "Server error"
    });
  }
};

module.exports = {
  getDashboard
};
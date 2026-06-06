const Store = require("../models/Store");
const Rating = require("../models/Rating");

const getOwnerStore = async (req, res) => {
  try {
    const store = await Store.findOne({
      where: { ownerId: req.user.id },
      include: [Rating],
    });

    if (!store) {
      return res.status(404).json({ message: "No store found" });
    }

    const ratings = store.Ratings || [];

    const avg =
      ratings.length > 0
        ? ratings.reduce((a, r) => a + r.rating, 0) / ratings.length
        : 0;

    res.json({
      id: store.id,
      name: store.name,
      address: store.address,
      averageRating: avg.toFixed(2),
      ratings,
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

module.exports = { getOwnerStore };
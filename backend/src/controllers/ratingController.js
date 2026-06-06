const Rating = require("../models/Rating");

const submitRating = async (req, res) => {
  try {
    const { storeId, rating } = req.body;

    if (rating < 1 || rating > 5) {
      return res.status(400).json({
        message: "Rating must be 1 to 5"
      });
    }

    const existingRating = await Rating.findOne({
      where: {
        userId: req.user.id,
        storeId
      }
    });

    if (existingRating) {
      existingRating.rating = rating;

      await existingRating.save();

      return res.status(200).json({
        message: "Rating updated successfully",
        rating: existingRating
      });
    }

    const newRating = await Rating.create({
      rating,
      userId: req.user.id,
      storeId
    });

    res.status(201).json({
      message: "Rating submitted successfully",
      rating: newRating
    });

  } catch (error) {
    res.status(500).json({
      message: error.message
    });
  }
};

module.exports = {
  submitRating
};
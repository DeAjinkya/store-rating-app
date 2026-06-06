const express = require("express");
const router = express.Router();

const { submitRating } = require("../controllers/ratingController");

const auth = require("../middleware/authMiddleware");
const authorize = require("../middleware/authorize");

router.post(
  "/",
  auth,
  authorize("USER"),
  submitRating
);

module.exports = router;
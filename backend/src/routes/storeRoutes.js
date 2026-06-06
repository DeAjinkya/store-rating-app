const express = require("express");
const router = express.Router();

const {
  createStore,
  getStores
} = require("../controllers/storeController");

const auth = require("../middleware/authMiddleware");
const authorize = require("../middleware/authorize");

router.get("/", getStores);

router.post(
  "/",
  auth,
  authorize("ADMIN"),
  createStore
);

module.exports = router;
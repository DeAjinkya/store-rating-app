const express = require("express");

const router = express.Router();

const auth = require("../middleware/authMiddleware");

const role = require("../middleware/authorize");

const {
  getDashboard
} = require("../controllers/storeOwnerController");

router.get(
  "/dashboard",
  auth,
  role("STORE_OWNER"),
  getDashboard
);

module.exports = router;
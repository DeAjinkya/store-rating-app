const express = require("express");
const router = express.Router();

const {
  getDashboard,
  getUsers,
  createUser,
  getStores,
  createStore
} = require("../controllers/adminController");

const auth = require("../middleware/authMiddleware");
const authorize = require("../middleware/authorize");

router.post(
  "/users",
  auth,
  authorize("ADMIN"),
  createUser
);

router.get(
  "/users",
  auth,
  authorize("ADMIN"),
  getUsers
);

router.post(
  "/stores",
  auth,
  authorize("ADMIN"),
  createStore
);

router.get(
  "/stores",
  auth,
  authorize("ADMIN"),
  getStores
);

router.get(
  "/dashboard",
  auth,
  authorize("ADMIN"),
  getDashboard
);

module.exports = router;
const express = require("express");
const router = express.Router();

const { getOwnerStore } = require("../controllers/ownerController");
const auth = require("../middleware/authMiddleware");

// IMPORTANT: route must match frontend call
router.get("/store", auth, getOwnerStore);

module.exports = router;
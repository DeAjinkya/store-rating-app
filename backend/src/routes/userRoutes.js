const express = require("express");

const router = express.Router();

const auth = require("../middleware/authMiddleware");
const authorize = require("../middleware/authorize");

const {
    getStores
} = require("../controllers/userController");

router.get(
    "/stores",
    auth,
    authorize("USER"),
    getStores
);

module.exports = router;
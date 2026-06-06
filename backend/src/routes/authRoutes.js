const express = require("express");
const router = express.Router();

const {
  register,
  login,
  changePassword,
} = require("../controllers/authController");
const auth = require("../middleware/authMiddleware");
const authorize = require("../middleware/authorize");

router.post("/register", register);
router.post("/login", login);
router.put(
  "/change-password",
  auth,
  changePassword
);

router.get(
  "/dashboard",
  auth,
  authorize("ADMIN"),
  (req, res) => {
    res.json({
      message: "Welcome Admin"
    });
  }
);


module.exports = router;
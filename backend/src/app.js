require("dotenv").config();

const express = require("express");
const cors = require("cors");
const sequelize = require("./config/db");

require("./models");

const authRoutes = require("./routes/authRoutes");
const storeRoutes = require("./routes/storeRoutes");
const ratingRoutes = require("./routes/ratingRoutes");
const adminRoutes = require("./routes/adminRoutes");
const storeOwnerRoutes = require("./routes/storeOwnerRoutes");
const userRoutes = require("./routes/userRoutes");


const verifyToken = require("./middleware/authMiddleware");

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use("/api/auth", authRoutes);
app.use("/api/stores", storeRoutes);
app.use("/api/ratings", ratingRoutes);
app.use("/api/admin", adminRoutes);
app.use("/api/store-owner", storeOwnerRoutes);
app.use("/api/user", userRoutes);
app.use("/api/owner", require("./routes/ownerRoutes"));

// Protected test route
app.get("/api/profile", verifyToken, (req, res) => {
  res.json({
    message: "Protected Route Accessed",
    user: req.user,
  });
});

// Start server
sequelize
  .sync()
  .then(() => {
    console.log("Database connected");

    app.listen(5000, () => {
      console.log("Server running on port 5000");
    });
  })
  .catch((err) => {
    console.error(err);
  });
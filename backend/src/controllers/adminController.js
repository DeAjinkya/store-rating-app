const sequelize = require("../config/db");
const bcrypt = require("bcryptjs");
const User = require("../models/User");
const Store = require("../models/Store");
const Rating = require("../models/Rating");

const { Op } = require("sequelize");

const getUsers = async (req, res) => {
    try {
        const {
            name,
            email,
            address,
            role,
            sortBy = "name",
            order = "ASC"
        } = req.query;

        const where = {
            role: {
                [Op.in]: ["USER", "ADMIN"]
            }
        };

        if (name) {
            where.name = {
                [Op.like]: `%${name}%`
            };
        }

        if (email) {
            where.email = {
                [Op.like]: `%${email}%`
            };
        }

        if (address) {
            where.address = {
                [Op.like]: `%${address}%`
            };
        }

        if (role) {
            where.role = role;
        }

        const users = await User.findAll({
            where,
            attributes: [
                "id",
                "name",
                "email",
                "address",
                "role"
            ],
            order: [[sortBy, order]]
        });

        res.status(200).json(users);

    } catch (error) {
        res.status(500).json({
            message: error.message
        });
    }
};

const getStores = async (req, res) => {
  try {
    const {
      name,
      email,
      address,
      sortBy = "name",
      order = "ASC"
    } = req.query;

    const where = {};

    if (name) {
      where.name = {
        [Op.like]: `%${name}%`
      };
    }

    if (email) {
      where.email = {
        [Op.like]: `%${email}%`
      };
    }

    if (address) {
      where.address = {
        [Op.like]: `%${address}%`
      };
    }

    const stores = await Store.findAll({
      where,
      attributes: [
        "id",
        "name",
        "email",
        "address",
        [
          sequelize.fn(
            "AVG",
            sequelize.col("Ratings.rating")
          ),
          "averageRating"
        ]
      ],
      include: [
        {
          model: Rating,
          attributes: []
        }
      ],
      group: ["Store.id"],
      order: [[sortBy, order]]
    });

    res.status(200).json(stores);

  } catch (error) {
    res.status(500).json({
      message: error.message
    });
  }
};


const createUser = async (req, res) => {
  try {
    const { name, email, password, address, role } = req.body;

    // Validate required fields
    if (!name || !email || !password || !address || !role) {
      return res.status(400).json({
        message: "All fields are required",
      });
    }

    // Validate role
    const validRoles = ["ADMIN", "USER", "STORE_OWNER"];

    if (!validRoles.includes(role)) {
      return res.status(400).json({
        message: "Invalid role",
      });
    }

    // Check if user already exists
    const existingUser = await User.findOne({
      where: { email },
    });

    if (existingUser) {
      return res.status(400).json({
        message: "Email already registered",
      });
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create user
    const user = await User.create({
      name,
      email,
      password: hashedPassword,
      address,
      role,
    });

    res.status(201).json({
      message: "User created successfully",
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
        address: user.address,
        role: user.role,
      },
    });

  } catch (error) {
    console.error(error);

    res.status(500).json({
      message: "Server error",
    });
  }
};

const createStore = async (req, res) => {
    try {
        const { name, email, address, ownerId } = req.body;

        if (!name || !email || !address || !ownerId) {
            return res.status(400).json({
                message: "All fields are required"
            });
        }

        const owner = await User.findOne({
            where: {
                id: ownerId,
                role: "STORE_OWNER"
            }
        });

        if (!owner) {
            return res.status(404).json({
                message: "Store owner not found"
            });
        }

        const store = await Store.create({
            name,
            email,
            address,
            ownerId
        });

        res.status(201).json({
            message: "Store created successfully",
            store
        });

    } catch (error) {
        res.status(500).json({
            message: error.message
        });
    }
};

const getDashboard = async (req, res) => {
    try {
        const totalUsers = await User.count();
        const totalStores = await Store.count();
        const totalRatings = await Rating.count();

        res.status(200).json({
            totalUsers,
            totalStores,
            totalRatings
        });

    } catch (error) {
        res.status(500).json({
            message: error.message
        });
    }
};

module.exports = {
    getDashboard,
    getUsers,
    getStores,
    createStore,
    createUser
};
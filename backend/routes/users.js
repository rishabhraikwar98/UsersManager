const express = require("express");
const router = express.Router();
const {
  getAllUsers,
  getUserById,
  addNewUser,
  updateUser,
  deleteUser,
} = require("../controllers/usersController");

// Get all users with optional pagination
router.get("/", getAllUsers);

// Get a single user by ID
router.get("/:id", getUserById);

// Create a new user
router.post("/", addNewUser);

// Update a user by ID
router.put("/:id", updateUser);

// Delete a user by ID
router.delete("/:id", deleteUser);

module.exports = router;

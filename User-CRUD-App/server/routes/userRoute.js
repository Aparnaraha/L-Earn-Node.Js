const express = require("express");
const router = express.Router();

// 1. Import your controller CRUD actions
const { 
  createUser, 
  getAllUsers, 
  getUserById, 
  updateUserById, 
  deleteUserById 
} = require("../controller/userController");

// 2. 🌟 ADD THIS IMPORT: Pull in your authentication middleware block
// (Double check that the folder path points correctly to your verifyToken file!)
const { verifyToken } = require("../middleware/authMiddleware");

// 3. 🌟 UPDATE: Protect your routes by adding 'verifyToken' right before your controller actions!
// This guarantees that req.user will be populated safely before the controller runs.

// CREATE USER ROUTE => POST /api/users
router.post("/users", verifyToken, createUser);

// GET ALL USERS ROUTE => GET /api/users
router.get("/users", verifyToken, getAllUsers);

// SPECIFIC ELEMENT CRUD IDENTIFIERS
router
  .route("/users/:id")
  .get(verifyToken, getUserById)
  .patch(verifyToken, updateUserById)
  .delete(verifyToken, deleteUserById);

module.exports = router;
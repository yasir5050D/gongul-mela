const express = require("express");
const router = express.Router();
const userController = require("../controllers/userController");

// EJS Routes
router.get("/", userController.showRegistrationForm);
router.post("/register", userController.registerUser);

// API Routes
router.get("/users", userController.getAllUsers);
router.get("/users/:id", userController.getUserById);
router.put("/users/:id", userController.updateUser);
router.delete("/users/:id", userController.deleteUser);

module.exports = router;

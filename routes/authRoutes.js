const express = require("express");
const { register, login, myProfile } = require("../controllers/authController");
const authMiddleware = require("../middleware/authMiddleware");

const router = express.Router();

router.post("/register", register);
router.post("/login", login);
router.get("/my-profile", authMiddleware, myProfile);

module.exports = router;

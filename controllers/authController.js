const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { getUserCollection } = require("../models/User");
const User = require('../models/User');

const register = async (req, res) => {
    try {
        const { fullName, email, username, password } = req.body;
        if (!fullName || !email || !username || !password) {
            return res.status(400).json({ message: "All fields are required." });
        }

        const users = getUserCollection();
        const existingUser = await users.findOne({ username });

        if (existingUser) {
            return res.status(400).json({ message: "Username already exists." });
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        await users.insertOne({
            fullName,
            email,
            username,
            password: hashedPassword,
        });

        res.status(201).json({ message: "User registered successfully." });
    } catch (error) {
        res.status(500).json({ message: "Server error." });
    }
};

const login = async (req, res) => {
    try {
        const { username, password } = req.body;
        if (!username || !password) {
            return res.status(400).json({ message: "All fields are required." });
        }

        const users = getUserCollection();
        const user = await users.findOne({ username });

        if (!user) {
            return res.status(400).json({ message: "Invalid username or password." });
        }

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json({ message: "Invalid username or password." });
        }

        const token = jwt.sign({ userId: user._id, username: user.username }, process.env.JWT_SECRET, { expiresIn: "1h" });

        res.json({ token });
    } catch (error) {
        res.status(500).json({ message: "Server error." });
    }
};


const myProfile = async (req, res) => {
    try {
        const user = await User.findOne({ _id: req.user.id });

        if (!user) {
            return res.status(404).json({ message: "User not found." });
        }

        res.json({
            name: user.name,  
            email: user.email,  
            username: user.username   
            // password is not included for security reasons
        });
    } catch (error) {
        console.error("Error fetching user profile:", error); // Log any error for debugging
        res.status(500).json({ message: "Server error." });
    }
};

module.exports = { register, login, myProfile };

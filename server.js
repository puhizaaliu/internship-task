require("dotenv").config();
const express = require("express");
const cors = require("cors");
const connectDB = require("./config/db");

// Initialize Express App
const app = express();
app.use(express.json());
app.use(cors());

// Connect to MongoDB
connectDB();

// Import Routes
const authRoutes = require("./routes/authRoutes");
const carRoutes = require("./routes/carRoutes");

// Use Routes
app.use("/api", authRoutes);
app.use("/api", carRoutes);

// Start Server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

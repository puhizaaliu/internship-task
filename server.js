require("dotenv").config();
const express = require("express");
const cors = require("cors");
const connectDB = require("./config/db");
const userRoutes = require('./routes/userRoutes')

const app = express();
app.use(express.json());
app.use(cors());

connectDB();
const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost:27017/internship-task', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => {
  console.log('Connected to MongoDB');
})
.catch(err => {
  console.error('Error connecting to MongoDB', err);
});

const authRoutes = require("./routes/authRoutes");
const carRoutes = require("./routes/carRoutes");

app.use("/api/user", authRoutes);
app.use("/api/cars", carRoutes);
app.use("/api/users",userRoutes)

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

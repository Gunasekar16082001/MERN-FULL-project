const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv").config();
const errorHandler = require("../backend/middleware/errorMiddleware");
const colors = require("colors");
const connectDB = require("./config/db");

connectDB();
// Create Express app
const app = express();

// Set the port
const port = process.env.PORT || 5001;

// Parse JSON body
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// Error handler middleware
app.use(errorHandler);

// Routes
app.use("/api/goals", require("./routes/goalRoutes"));

// Start the server
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});

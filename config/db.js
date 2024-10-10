//mongoose
const mongoose = require("mongoose");

// Load environment variables from .env file
require('dotenv').config();

//connectdb function
exports.connectDB = async () => {
    try {
        await mongoose.connect(process.env.MONGODB_URL);
        console.log("MongoDB Connected");
    } catch (error) {
        console.log("Database connection failed", error);
    }
}
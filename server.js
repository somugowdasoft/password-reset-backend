//express
const express = require("express");
const dotenv = require("dotenv");
const { connectDB } = require("./config/db");
const bodyParser = require("body-parser");
const authRoutes = require("./routes/authRoutes");
const errorHandler = require("./middleware/errorHandler")

//cors
const cors = require("cors");

dotenv.config();
const app = express();
app.use(cors());

//connectDB
connectDB();

//Middleware body parser
app.use(bodyParser.json());

//router
app.use("/api/auth", authRoutes);

//error handler
app.use(errorHandler);

//Start server
const PORT = process.env.PORT || 5000
app.listen(PORT, () => {
    console.log(`Server running on port http://localhost:${PORT}`);
})


const express = require("express");
const cors = require("cors");
const { connection } = require("./db");
const { authRoute } = require("./Routes/AuthRoute");
const { userRoute } = require("./Routes/UsersRoute");
const { hotelRoute } = require("./Routes/HotelsRoute");
const { roomRoute } = require("./Routes/RoomRoutes");
const cookie_parser = require("cookie-parser");
const app = express();
require('dotenv').config();

// Middlewares
app.use(express.json());
app.use(cookie_parser());
app.use(cors());

// Test Route
app.get("/", (req, res) => {
    res.send("Welcome to the app");
});

// Routes
app.use("/auth", authRoute);
app.use("/user", userRoute);
app.use("/hotel", hotelRoute);
app.use("/room", roomRoute);

// Global Error-Handling Middleware
app.use((err, req, res, next) => {
    const status = err.status || 500;
    const message = err.message || "Internal Server Error";
    res.status(status).json({
        success: false,
        status: status,
        message: message,
    });
});

// Start the server
app.listen(process.env.port, async () => {
    try {
        await connection;
        console.log('Connected to backend');
    } catch (error) {
        console.log('Error in backend');
    }
    console.log(`Server running on port ${process.env.port}`);
});

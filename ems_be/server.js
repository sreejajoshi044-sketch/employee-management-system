import express from "express";
import cors from "cors";
import dotenv from "dotenv";

import authRoutes from "./routes/authRoutes.js";
import employeeRoutes from "./routes/employeeRoutes.js";
import errorHandler from "./middleware/errorHandler.js";

dotenv.config();

const app = express();

const PORT = process.env.PORT || 5000;

// Built-in middleware
app.use(express.json());

// CORS middleware
app.use(
    cors({
        origin: process.env.FRONTEND_URL
    })
);

// Custom logging middleware
const logger = (req, res, next) => {
    console.log(`${req.method} ${req.url}`);
    next();
};

app.use(logger);

// Health check
app.get("/", (req, res) => {
    res.status(200).json({
        success: true,
        message: "Employee Management API is running"
    });
});

// Employee routes
app.use("/api/employees", employeeRoutes);

// Authentication routes
app.use("/api/auth", authRoutes);

// 404 handler
app.use((req, res) => {
    res.status(404).json({
        success: false,
        message: "Route not found"
    });
});

// Error handler
app.use(errorHandler);

app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
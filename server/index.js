const express = require("express");
const cors = require("cors");
const cookieParser = require("cookie-parser");
require("dotenv").config();
const connectDB = require("./config/db");

const app = express();

connectDB();

// CORS configuration
const corsOptions = {
  origin: [
    "http://localhost:5173",
    "https://muloanaptech.vercel.app",
    "https://muloanaptech-1.onrender.com"
  ],
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization', 'Cookie']
};

// Middleware
app.use(cors(corsOptions));
app.options('*', cors(corsOptions));
app.use(express.json());
app.use(cookieParser());
app.use(express.static("assets"));

// Routes
app.use("/api/auth", require("./routes/auth"));
app.use("/api/loans", require("./routes/loan"));

// Test route
app.get("/api/test", (req, res) => {
  res.json({ message: "API is working!" });
});

// Root route
app.get("/", (req, res) => {
  res.json({ message: "LoanAptech API is running!", status: "active" });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, "0.0.0.0", () => {
  console.log(` Server running on port ${PORT}`);
});

console.log("MONGO_URI from env:", process.env.MONGO_URI ? "SET" : "NOT SET");

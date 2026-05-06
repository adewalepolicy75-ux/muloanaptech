const express = require("express");
const cors = require("cors");
const cookieParser = require("cookie-parser");
require("dotenv").config();
const connectDB = require("./config/db");

const app = express();

connectDB();

// Simplified CORS configuration
const allowedOrigins = [
  "http://localhost:5173",
  "https://muloanaptech.vercel.app",
  "https://muloanaptech-1.onrender.com"
];

app.use(cors({
  origin: function(origin, callback) {
    if (!origin) return callback(null, true);
    if (allowedOrigins.indexOf(origin) === -1) {
      const msg = 'The CORS policy for this site does not allow access from the specified Origin.';
      return callback(new Error(msg), false);
    }
    return callback(null, true);
  },
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization', 'Cookie']
}));

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

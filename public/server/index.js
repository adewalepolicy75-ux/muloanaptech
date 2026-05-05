const express = require("express");
const cors = require("cors");
const cookieParser = require("cookie-parser");
require("dotenv").config();
const connectDB = require("./config/db");

const app = express();

connectDB();

// Middleware
app.use(
  cors({
    origin: [
          
      "http://localhost:5173",
      "https://muloanaptech.vercel.app"


    ],
    credentials: true,
  }),
);
app.use(express.json());
app.use(cookieParser());

// Routes
app.use("/api/auth", require("./routes/auth"));
app.use("/api/loans", require("./routes/loan"));

// Test route
app.get("/api/test", (req, res) => {
  res.json({ message: "API is working!" });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(` Server running on port ${PORT}`);
});

console.log("MONGO_URI from env:", process.env.MONGO_URI ? "SET" : "NOT SET");
// Force redeploy Mon, May  4, 2026  3:01:34 PM


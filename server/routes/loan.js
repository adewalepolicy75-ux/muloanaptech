const express = require("express");
const router = express.Router();
const Loan = require("../models/Loan");
const auth = require("../middleware/auth");

// Apply for a loan
router.post("/apply", auth, async (req, res) => {
  try {
    let { fullName, email, phoneNumber, amount, purpose, duration, interestRate } = req.body;

    amount = Number(amount);
    duration = Number(duration);
    interestRate = Number(interestRate) || 5;

    if (!fullName || !email || !phoneNumber || !amount || !purpose || !duration) {
      return res
        .status(400)
        .json({ error: "Please provide all required fields" });
    }

    if (amount <= 0 || duration <= 0) {
      return res
        .status(400)
        .json({ error: "Amount and duration must be valid numbers" });
    }

    // Monthly interest rate
    const rate = interestRate / 100 / 12;

    const monthlyPayment =
      (amount * rate * Math.pow(1 + rate, duration)) /
      (Math.pow(1 + rate, duration) - 1);

    const totalPayment = monthlyPayment * duration;

    const loan = await Loan.create({
      userId: req.user._id,
      fullName,
      email,
      phoneNumber,
      amount,
      purpose,
      duration,
      interestRate,
      monthlyPayment: Math.round(monthlyPayment * 100) / 100,
      totalPayment: Math.round(totalPayment * 100) / 100,
    });

    res.status(201).json({
      message: "Loan application submitted successfully",
      loan,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Server error" });
  }
});

// Get user's loans
router.get("/", auth, async (req, res) => {
  try {
    const loans = await Loan.find({ userId: req.user._id }).sort({ createdAt: -1 });
    res.json(loans);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Server error" });
  }
});

// Get single loan
router.get("/:id", auth, async (req, res) => {
  try {
    const loan = await Loan.findOne({ _id: req.params.id, userId: req.user._id });
    if (!loan) {
      return res.status(404).json({ error: "Loan not found" });
    }
    res.json(loan);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Server error" });
  }
});

module.exports = router;

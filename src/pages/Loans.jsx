import React from "react";
import { Link } from "react-router-dom";
import "./Loans.css";

const Loans = () => {
  const loanProducts = [
    { id: 1, name: "Personal Loan", minAmount: 1000, maxAmount: 50000, interestRate: 5, minDuration: 6, maxDuration: 60, icon: "🏦", description: "Perfect for personal expenses, travel, medical emergencies." },
    { id: 2, name: "Business Loan", minAmount: 5000, maxAmount: 100000, interestRate: 7, minDuration: 12, maxDuration: 84, icon: "💼", description: "Grow your business with flexible repayment options." },
    { id: 3, name: "Emergency Loan", minAmount: 500, maxAmount: 10000, interestRate: 8, minDuration: 3, maxDuration: 12, icon: "🚨", description: "Quick cash for unexpected expenses." },
    { id: 4, name: "Education Loan", minAmount: 2000, maxAmount: 30000, interestRate: 4.5, minDuration: 12, maxDuration: 48, icon: "📚", description: "Invest in your education and future career." }
  ];

  return (
    <div className="loans-page">
      <div className="loans-hero">
        <h1>Our Loan Products</h1>
        <p>Find the perfect loan that fits your needs</p>
      </div>

      <div className="loans-container">
        {loanProducts.map((loan) => (
          <div className="loan-product-card" key={loan.id}>
            <div className="loan-icon">{loan.icon}</div>
            <h2>{loan.name}</h2>
            <p className="loan-description">{loan.description}</p>
            <div className="loan-details">
              <div className="detail-item"><span className="detail-label">Amount</span><span className="detail-value">${loan.minAmount.toLocaleString()} - ${loan.maxAmount.toLocaleString()}</span></div>
              <div className="detail-item"><span className="detail-label">Interest Rate</span><span className="detail-value">{loan.interestRate}%</span></div>
              <div className="detail-item"><span className="detail-label">Duration</span><span className="detail-value">{loan.minDuration} - {loan.maxDuration} months</span></div>
            </div>
            <Link to="/apply" className="apply-btn">Apply Now →</Link>
          </div>
        ))}
      </div>

      <div className="cta-section">
        <h2>Ready to get started?</h2>
        <p>Apply for a loan today and get approved within minutes</p>
        <Link to="/apply" className="cta-btn">Apply Now</Link>
      </div>
    </div>
  );
};

export default Loans;

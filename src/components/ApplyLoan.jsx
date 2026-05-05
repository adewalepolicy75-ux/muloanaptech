import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./ApplyLoan.css";

const ApplyLoan = () => {
  const [formData, setFormData] = useState({
    fullName: "",
    emailAddress: "",
    loanAmount: "",
    loanTenure: "",
    purpose: ""
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const response = await fetch(
        "https://muloanaptech-1.onrender.com/api/loans/apply",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          credentials: "include",
          body: JSON.stringify(formData),
        },
      );

      const data = await response.json();

      if (response.ok) {
        navigate("/loan");
      } else {
        setError(data.error || "Application failed");
      }
    } catch (error) {
      setError("Network error. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="apply-container">
      <div className="apply-card">
        <h2 className="apply-title">Apply for Loan</h2>
        
        {error && <div className="error-message">{error}</div>}
        
        <form onSubmit={handleSubmit} className="apply-form">
          <div className="input-group">
            <label>Full Name</label>
            <input
              type="text"
              name="fullName"
              value={formData.fullName}
              onChange={handleChange}
              placeholder="John Doe"
              required
            />
          </div>

          <div className="input-group">
            <label>Email Address</label>
            <input
              type="email"
              name="emailAddress"
              value={formData.emailAddress}
              onChange={handleChange}
              placeholder="john@example.com"
              required
            />
          </div>

          <div className="input-group">
            <label>Loan Amount ($)</label>
            <input
              type="number"
              name="loanAmount"
              value={formData.loanAmount}
              onChange={handleChange}
              placeholder="50000"
              required
            />
          </div>

          <div className="input-group">
            <label>Loan Tenure</label>
            <select
              name="loanTenure"
              value={formData.loanTenure}
              onChange={handleChange}
              required
            >
              <option value="">Select tenure</option>
              <option value="6 months">6 months</option>
              <option value="1 year">1 year</option>
              <option value="2 years">2 years</option>
              <option value="3 years">3 years</option>
              <option value="5 years">5 years</option>
            </select>
          </div>

          <div className="input-group">
            <label>Purpose of Loan</label>
            <textarea
              name="purpose"
              value={formData.purpose}
              onChange={handleChange}
              placeholder="e.g., Home renovation, Business expansion, Education..."
              required
            />
          </div>

          <button type="submit" disabled={loading} className="apply-submit-btn">
            {loading ? "Submitting..." : "Submit Application"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default ApplyLoan;

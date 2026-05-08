import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./ApplyLoan.css";

const ApplyLoan = () => {
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phoneNumber: "",
    amount: "",
    purpose: "",
    duration: ""
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  // Get logged in user data
  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await fetch(
          "https://muloanaptech-1.onrender.com/api/auth/me",
          {
            credentials: "include",
          }
        );
        if (response.ok) {
          const data = await response.json();
          setUser(data.user);
          // Pre-fill form with user data
          setFormData(prev => ({
            ...prev,
            fullName: data.user.name || "",
            email: data.user.email || "",
            phoneNumber: data.user.phone || "",
          }));
        } else {
          navigate("/login");
        }
      } catch (error) {
        navigate("/login");
      }
    };
    fetchUser();
  }, [navigate]);

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
            "Content-Type": "application/json"
          },
          credentials: "include",
          body: JSON.stringify(formData)
        }
      );

      const data = await response.json();

      if (response.ok) {
        alert("Loan application submitted successfully!");
        navigate("/dashboard");
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
              placeholder="Enter your full name"
              required
            />
          </div>

          <div className="input-group">
            <label>Email Address</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="your@email.com"
              required
            />
          </div>

          <div className="input-group">
            <label>Phone Number</label>
            <input
              type="tel"
              name="phoneNumber"
              value={formData.phoneNumber}
              onChange={handleChange}
              placeholder="08012345678"
              required
            />
          </div>

          <div className="input-group">
            <label>Loan Amount ($)</label>
            <input
              type="number"
              name="amount"
              value={formData.amount}
              onChange={handleChange}
              placeholder="50000"
              required
            />
          </div>

          <div className="input-group">
            <label>Loan Duration (months)</label>
            <select
              name="duration"
              value={formData.duration}
              onChange={handleChange}
              required
            >
              <option value="">Select duration</option>
              <option value="6">6 months</option>
              <option value="12">1 year</option>
              <option value="24">2 years</option>
              <option value="36">3 years</option>
              <option value="60">5 years</option>
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

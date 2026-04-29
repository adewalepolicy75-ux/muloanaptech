import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./Dashboard.css";

const Dashboard = () => {
  const [user, setUser] = useState(null);
  const [loans, setLoans] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    checkAuth();
    fetchLoans();
  }, []);

  const checkAuth = async () => {
    try {
      const response = await fetch("http://localhost:5000/api/auth/me", {
        credentials: "include",
      });

      if (response.ok) {
        const data = await response.json();
        setUser(data.user);
      } else {
        navigate("/login");
      }
    } catch (error) {
      navigate("/login");
    }
  };

  const fetchLoans = async () => {
    try {
      const response = await fetch("http://localhost:5000/api/loans", {
        credentials: "include",
      });

      if (response.ok) {
        const data = await response.json();
        setLoans(data);
      }
    } catch (error) {
      console.error("Error fetching loans:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = async () => {
    try {
      await fetch("http://localhost:5000/api/auth/logout", {
        method: "POST",
        credentials: "include",
      });
      navigate("/login");
    } catch (error) {
      console.error("Logout error:", error);
    }
  };

  if (loading) {
    return <div className="dashboard-loading">Loading...</div>;
  }

  return (
    <div className="dashboard-container">
      <div className="dashboard-header">
        <h1>Welcome, {user?.name || "User"}!</h1>
      </div>

      <div className="dashboard-stats">
        <div className="stat-card">
          <h3>Total Loans</h3>
          <p className="stat-number">{loans.length}</p>
        </div>
        <div className="stat-card">
          <h3>Active Loans</h3>
          <p className="stat-number">
            {loans.filter(l => l.status === "active").length}
          </p>
        </div>
        <div className="stat-card">
          <h3>Total Amount</h3>
          <p className="stat-number">
            ${loans.reduce((sum, l) => sum + (l.amount || 0), 0).toLocaleString()}
          </p>
        </div>
      </div>

      <div className="dashboard-section">
        <h2>My Loan Applications</h2>
        {loans.length === 0 ? (
          <p className="no-loans">No loan applications yet.</p>
        ) : (
          <table className="loans-table">
            <thead>
              <tr>
                <th>Amount</th>
                <th>Purpose</th>
                <th>Status</th>
                <th>Date</th>
              </tr>
            </thead>
            <tbody>
              {loans.map((loan, index) => (
                <tr key={index}>
                  <td>${loan.amount?.toLocaleString()}</td>
                  <td>{loan.purpose}</td>
                  <td>
                    <span className={`status-${loan.status || "pending"}`}>
                      {loan.status || "Pending"}
                    </span>
                  </td>
                  <td>{new Date(loan.createdAt).toLocaleDateString()}</td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>

      <div className="dashboard-actions">
        <button 
          className="apply-btn"
          onClick={() => navigate("/apply")}
        >
          Apply for a Loan
        </button>
      </div>
    </div>
  );
};

export default Dashboard;

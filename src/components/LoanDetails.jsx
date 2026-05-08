import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";

function LoanDetails() {
  const { id } = useParams();
  const [loan, setLoan] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchLoan = async () => {
      try {
        const res = await fetch(`https://muloanaptech-1.onrender.com/api/loans/${id}`, {
          credentials: "include"
        });
        const data = await res.json();
        if (!res.ok) throw new Error(data.error || "Loan not found");
        setLoan(data.loan || data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    fetchLoan();
  }, [id]);

  if (loading) return <div style={{ textAlign: "center", padding: "50px" }}>Loading...</div>;
  if (error) return <div style={{ textAlign: "center", padding: "50px", color: "red" }}>{error}</div>;
  if (!loan) return <div style={{ textAlign: "center", padding: "50px" }}>Loan not found</div>;

  return (
    <div style={{ maxWidth: "600px", margin: "50px auto", padding: "20px" }}>
      <div style={{ border: "1px solid #ddd", borderRadius: "10px", padding: "30px", boxShadow: "0 2px 10px rgba(0,0,0,0.1)" }}>
        <h2>Loan Details</h2>
        <p><strong>Amount:</strong> ₦{loan.amount?.toLocaleString()}</p>
        <p><strong>Duration:</strong> {loan.duration} months</p>
        <p><strong>Monthly Payment:</strong> ₦{loan.monthlyPayment?.toLocaleString()}</p>
        <p><strong>Total Payment:</strong> ₦{loan.totalPayment?.toLocaleString()}</p>
        <p><strong>Purpose:</strong> {loan.purpose}</p>
        <p><strong>Status:</strong> {loan.status}</p>
        <p><strong>Applied:</strong> {new Date(loan.createdAt).toLocaleDateString()}</p>
        <Link to="/dashboard">Back to Dashboard</Link>
      </div>
    </div>
  );
}

export default LoanDetails;

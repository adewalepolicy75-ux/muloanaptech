import React, { useState } from "react";
import { Link } from "react-router-dom";
import "./Loans.css";

const Loans = () => {
  const [calculator, setCalculator] = useState({
    amount: 10000,
    rate: 5,
    duration: 12
  });
  const [monthlyPayment, setMonthlyPayment] = useState(0);
  const [totalPayment, setTotalPayment] = useState(0);
  const [totalInterest, setTotalInterest] = useState(0);

  // Eligibility checker state
  const [eligibility, setEligibility] = useState({
    income: "",
    employmentStatus: "",
    creditScore: ""
  });
  const [eligibilityResult, setEligibilityResult] = useState(null);

  const loanProducts = [
    { id: 1, name: "Personal Loan", minAmount: 1000, maxAmount: 50000, interestRate: 5, minDuration: 6, maxDuration: 60, icon: "🏦" },
    { id: 2, name: "Business Loan", minAmount: 5000, maxAmount: 100000, interestRate: 7, minDuration: 12, maxDuration: 84, icon: "💼" },
    { id: 3, name: "Emergency Loan", minAmount: 500, maxAmount: 10000, interestRate: 8, minDuration: 3, maxDuration: 12, icon: "🚨" },
    { id: 4, name: "Education Loan", minAmount: 2000, maxAmount: 30000, interestRate: 4.5, minDuration: 12, maxDuration: 48, icon: "📚" }
  ];

  const faqs = [
    { q: "How long does it take to get approved?", a: "Most applications are approved within 10-30 minutes during business hours." },
    { q: "What credit score do I need?", a: "We accept scores as low as 550, but better rates are available for higher scores." },
    { q: "Can I pay off my loan early?", a: "Yes, there are no prepayment penalties. You can pay off your loan anytime." },
    { q: "What documents do I need?", a: "Valid ID, proof of income, and bank statements from the last 3 months." },
    { q: "Is my information secure?", a: "Yes, we use 256-bit encryption to protect your data." }
  ];

  const testimonials = [
    { name: "John D.", text: "Got approved in 15 minutes! Best loan experience ever.", rating: 5, location: "Lagos" },
    { name: "Mary A.", text: "The interest rates are very competitive. Highly recommended!", rating: 5, location: "Abuja" },
    { name: "Peter O.", text: "Quick and easy process. Will use again.", rating: 4, location: "Ibadan" }
  ];

  const calculateLoan = () => {
    const principal = calculator.amount;
    const monthlyRate = calculator.rate / 100 / 12;
    const months = calculator.duration;
    
    if (monthlyRate === 0) {
      const monthly = principal / months;
      setMonthlyPayment(Math.round(monthly));
      setTotalPayment(principal);
      setTotalInterest(0);
    } else {
      const monthly = principal * monthlyRate * Math.pow(1 + monthlyRate, months) / (Math.pow(1 + monthlyRate, months) - 1);
      const total = monthly * months;
      setMonthlyPayment(Math.round(monthly));
      setTotalPayment(Math.round(total));
      setTotalInterest(Math.round(total - principal));
    }
  };

  const checkEligibility = () => {
    let result = { eligible: false, message: "", maxAmount: 0 };
    
    if (eligibility.income >= 50000 && eligibility.employmentStatus === "Employed" && eligibility.creditScore >= 600) {
      result.eligible = true;
      result.message = "Congratulations! You are eligible for a loan up to ₦500,000";
      result.maxAmount = 500000;
    } else if (eligibility.income >= 30000 && eligibility.employmentStatus === "Employed" && eligibility.creditScore >= 500) {
      result.eligible = true;
      result.message = "You are eligible for a loan up to ₦200,000. Improve your credit score for better rates.";
      result.maxAmount = 200000;
    } else if (eligibility.income >= 20000) {
      result.eligible = false;
      result.message = "You may need a higher income or better employment status. Try our secured loan options.";
      result.maxAmount = 50000;
    } else {
      result.eligible = false;
      result.message = "Unfortunately, you don't meet the minimum requirements at this time.";
      result.maxAmount = 0;
    }
    setEligibilityResult(result);
  };

  React.useEffect(() => {
    calculateLoan();
  }, [calculator]);

  return (
    <div className="loans-page">
      <div className="loans-hero">
        <h1>Our Loan Products</h1>
        <p>Find the perfect loan that fits your needs</p>
      </div>

      {/* Loan Products Grid */}
      <div className="loans-container">
        {loanProducts.map((loan) => (
          <div className="loan-product-card" key={loan.id}>
            <div className="loan-icon">{loan.icon}</div>
            <h2>{loan.name}</h2>
            <div className="loan-details">
              <div className="detail-item"><span className="detail-label">Amount</span><span className="detail-value">${loan.minAmount.toLocaleString()} - ${loan.maxAmount.toLocaleString()}</span></div>
              <div className="detail-item"><span className="detail-label">Interest Rate</span><span className="detail-value">{loan.interestRate}%</span></div>
              <div className="detail-item"><span className="detail-label">Duration</span><span className="detail-value">{loan.minDuration} - {loan.maxDuration} months</span></div>
            </div>
            <Link to="/apply" className="apply-btn">Apply Now →</Link>
          </div>
        ))}
      </div>

      {/* Loan Calculator */}
      <div className="calculator-section">
        <h2>Loan Calculator</h2>
        <p>Calculate your monthly payments</p>
        <div className="calculator">
          <div className="calc-inputs">
            <div><label>Loan Amount ($)</label><input type="number" value={calculator.amount} onChange={(e) => setCalculator({...calculator, amount: Number(e.target.value)})} /></div>
            <div><label>Interest Rate (%)</label><input type="number" step="0.5" value={calculator.rate} onChange={(e) => setCalculator({...calculator, rate: Number(e.target.value)})} /></div>
            <div><label>Duration (months)</label><input type="number" value={calculator.duration} onChange={(e) => setCalculator({...calculator, duration: Number(e.target.value)})} /></div>
          </div>
          <div className="calc-results">
            <div className="result-card"><h4>Monthly Payment</h4><p className="result-amount">${monthlyPayment.toLocaleString()}</p></div>
            <div className="result-card"><h4>Total Payment</h4><p className="result-amount">${totalPayment.toLocaleString()}</p></div>
            <div className="result-card"><h4>Total Interest</h4><p className="result-amount">${totalInterest.toLocaleString()}</p></div>
          </div>
        </div>
      </div>

      {/* Eligibility Checker */}
      <div className="eligibility-section">
        <h2>Check Your Eligibility</h2>
        <p>See if you qualify for a loan</p>
        <div className="eligibility-checker">
          <input type="number" placeholder="Monthly Income ($)" value={eligibility.income} onChange={(e) => setEligibility({...eligibility, income: Number(e.target.value)})} />
          <select value={eligibility.employmentStatus} onChange={(e) => setEligibility({...eligibility, employmentStatus: e.target.value})}>
            <option value="">Employment Status</option>
            <option value="Employed">Employed</option>
            <option value="Self-Employed">Self-Employed</option>
            <option value="Student">Student</option>
          </select>
          <select value={eligibility.creditScore} onChange={(e) => setEligibility({...eligibility, creditScore: Number(e.target.value)})}>
            <option value="">Credit Score</option>
            <option value="750">Excellent (750+)</option>
            <option value="650">Good (650-749)</option>
            <option value="550">Fair (550-649)</option>
            <option value="450">Poor (Below 550)</option>
          </select>
          <button onClick={checkEligibility}>Check Eligibility</button>
          {eligibilityResult && (<div className={`eligibility-result ${eligibilityResult.eligible ? 'eligible' : 'not-eligible'}`}><strong>{eligibilityResult.eligible ? '✅ Eligible!' : '❌ Not Eligible'}</strong><p>{eligibilityResult.message}</p>{eligibilityResult.maxAmount > 0 && <p>Maximum loan amount: ${eligibilityResult.maxAmount.toLocaleString()}</p>}</div>)}
        </div>
      </div>

      {/* Comparison Table */}
      <div className="comparison-section">
        <h2>Compare Loan Products</h2>
        <table className="comparison-table">
          <thead><tr><th>Feature</th><th>Personal Loan</th><th>Business Loan</th><th>Emergency Loan</th></tr></thead>
          <tbody>
            <tr><td>Interest Rate</td><td>5%</td><td>7%</td><td>8%</td></tr>
            <tr><td>Loan Amount</td><td>$1k - $50k</td><td>$5k - $100k</td><td>$500 - $10k</td></tr>
            <tr><td>Duration</td><td>6-60 months</td><td>12-84 months</td><td>3-12 months</td></tr>
            <tr><td>Approval Time</td><td>30 minutes</td><td>24 hours</td><td>15 minutes</td></tr>
            <tr><td>Processing Fee</td><td>1%</td><td>2%</td><td>0.5%</td></tr>
          </tbody>
        </table>
      </div>

      {/* FAQ Section */}
      <div className="faq-section">
        <h2>Frequently Asked Questions</h2>
        <div className="faq-list">{faqs.map((faq, idx) => (<details key={idx}><summary>{faq.q}</summary><p>{faq.a}</p></details>))}</div>
      </div>

      {/* Testimonials */}
      <div className="testimonials-section">
        <h2>What Our Customers Say</h2>
        <div className="testimonials-grid">{testimonials.map((t, idx) => (<div className="testimonial-card" key={idx}><div className="rating">{"★".repeat(t.rating)}{"☆".repeat(5-t.rating)}</div><p>"{t.text}"</p><h4>{t.name}</h4><small>{t.location}</small></div>))}</div>
      </div>

      <div className="cta-section"><h2>Ready to get started?</h2><p>Apply for a loan today and get approved within minutes</p><Link to="/apply" className="cta-btn">Apply Now</Link></div>
    </div>
  );
};

export default Loans;

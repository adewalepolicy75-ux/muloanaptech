import React from "react";
import "./About.css";

const About = () => {
  return (
    <div className="about-container">
      <div className="about-header">
        <h1>About LoanAptech</h1>
        <p>Your trusted partner for quick and easy loans</p>
      </div>

      <div className="about-section">
        <h2>Who We Are</h2>
        <p>
          LoanAptech is a modern digital lending platform dedicated to providing 
          fast, secure, and affordable personal loans to individuals across Nigeria 
          and beyond. We believe that access to credit should be simple, transparent, 
          and hassle-free.
        </p>
      </div>

      <div className="about-section">
        <h2>Our Mission</h2>
        <p>
          To empower individuals with quick access to funds when they need them most, 
          using cutting-edge technology to deliver a seamless borrowing experience.
        </p>
      </div>

      <div className="about-section">
        <h2>Why Choose Us</h2>
        <ul>
          <li>✅ Instant loan approval within minutes</li>
          <li>✅ Competitive interest rates starting from 5%</li>
          <li>✅ No hidden fees or charges</li>
          <li>✅ Flexible repayment plans (6-60 months)</li>
          <li>✅ 100% online process - no paperwork</li>
          <li>✅ Secure and confidential</li>
        </ul>
      </div>

      <div className="about-section">
        <h2>How It Works</h2>
        <div className="steps">
          <div className="step">
            <span className="step-number">1</span>
            <h3>Sign Up</h3>
            <p>Create a free account in minutes</p>
          </div>
          <div className="step">
            <span className="step-number">2</span>
            <h3>Apply</h3>
            <p>Fill out our simple loan application</p>
          </div>
          <div className="step">
            <span className="step-number">3</span>
            <h3>Get Approved</h3>
            <p>Receive instant decision</p>
          </div>
          <div className="step">
            <span className="step-number">4</span>
            <h3>Get Funded</h3>
            <p>Money deposited in 24 hours</p>
          </div>
        </div>
      </div>

      <div className="about-section contact-info">
        <h2>Contact Us</h2>
        <p>📧 support@loanaptech.com</p>
        <p>📞 +234 805 721 5622</p>
        <p>📍 Ibadan, Oyo State, Nigeria</p>
      </div>
    </div>
  );
};

export default About;

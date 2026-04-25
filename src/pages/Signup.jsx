import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./AuthPage.css"; // Save your CSS in this file

const AuthPage = ({ type = "login" }) => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [error, setError] = useState("");

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (type === "signup" && formData.password !== formData.confirmPassword) {
      setError("Passwords don't match");
      return;
    }

    // Handle your authentication logic here
    console.log("Form submitted:", formData);

    // Navigate after successful login/signup
    // navigate('/dashboard');
  };

  return (
    <div className="auth-container">
      <h2>{type === "login" ? "Welcome Back!" : "Create Account"}</h2>

      <form onSubmit={handleSubmit}>
        <input
          type="email"
          name="email"
          placeholder="Email Address"
          value={formData.email}
          onChange={handleChange}
          required
        />

        <input
          type="password"
          name="password"
          placeholder="Password"
          value={formData.password}
          onChange={handleChange}
          required
        />

        {type === "signup" && (
          <input
            type="password"
            name="confirmPassword"
            placeholder="Confirm Password"
            value={formData.confirmPassword}
            onChange={handleChange}
            required
          />
        )}

        {error && <div className="error-message">{error}</div>}

        <button type="submit">
          {type === "login" ? "Sign In" : "Sign Up"}
        </button>
      </form>

      <div className="auth-footer">
        {type === "login" ? (
          <p>
            Don't have an account?{" "}
            <Link to="/signup" className="auth-link">
              Sign Up
            </Link>
          </p>
        ) : (
          <p>
            Already have an account?{" "}
            <Link to="/login" className="auth-link">
              Sign In
            </Link>
          </p>
        )}
      </div>
    </div>
  );
};

export default AuthPage;

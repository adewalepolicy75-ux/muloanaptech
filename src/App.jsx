import React from "react";
import "./App.css";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import About from "./components/About";
import Contact from "./components/Contact";
import Privacy from "./components/Privacy";
import Terms from "./components/Terms";
import Faq from "./components/Faq";
import Home from "./pages/Home";
import Signup from "./components/Signup";
import Login from "./components/Login";
import Dashboard from "./components/Dashboard";
import ApplyLoan from "./components/ApplyLoan";
import LoanDetails from "./components/LoanDetails";
import Loans from "./pages/Loans";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

function App() {
  return (
    <Router>
      <div className="App">
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/privacy" element={<Privacy />} />
          <Route path="/terms" element={<Terms />} />
          <Route path="/faq" element={<Faq />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/login" element={<Login />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/apply" element={<ApplyLoan />} />
          <Route path="/loan/:id" element={<LoanDetails />} />
          <Route path="/loans" element={<Loans />} />
        </Routes>
        <Footer />
      </div>
    </Router>
  );
}

export default App;

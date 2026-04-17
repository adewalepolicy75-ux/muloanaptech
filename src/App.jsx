import React from "react";
import "./App.css";
import About from "./components/About";
import Footer from "./components/Footer";
import Contact from "./components/Contact";
import Privacy from "./components/Privacy";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Terms from "./components/Terms";
export default function APP() {
  return (
    <Router>
      <div className="APP">
      
        <Routes>
          <Route path="/contact" element={<Contact />} />
          <Route path="/about" element={<About />} />
          <Route path="/privacy" element={<Privacy />} />
          <Route path="/terms" element={<Terms />} />
        </Routes>
        <Footer />
      </div>
    </Router>
  );
}

import React from "react";

export default function Services() {
  const services = [
    "Web Development",
    "Frontend Development",
    "Next.js Full-stack Apps",
    "Cybersecurity Testing",
    "API & Database Setup",
    "Performance Optimization",
  ];

  return (
    <section className="services-section">
      <h2>My Services</h2>

      <div className="services-grid">
        {services.map((item, index) => (
          <div key={index} className="service-card">
            {item}
          </div>
        ))}
      </div>
    </section>
  );
}

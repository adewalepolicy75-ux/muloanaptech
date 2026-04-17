import React, { useState } from "react";
import "./Faq.css";

function Faq() {
  // Organized FAQ with categories
  const [faqCategories] = useState([
    {
      category: "🛒 Orders & Payments",
      icon: "💰",
      questions: [
        {
          id: 1,
          question: "What payment methods do you accept?",
          answer:
            "We accept credit cards (Visa, Mastercard), debit cards, bank transfers, and cash on delivery for select locations.",
        },
        {
          id: 2,
          question: "Is it safe to pay online?",
          answer:
            "Yes! We use SSL encryption and secure payment gateways. Your payment information is never stored on our servers.",
        },
        {
          id: 3,
          question: "Can I change my order after placing it?",
          answer:
            "Orders can be modified within 2 hours of placement. Contact support immediately with your order number.",
        },
      ],
    },
    {
      category: "🚚 Shipping & Delivery",
      icon: "📦",
      questions: [
        {
          id: 4,
          question: "How long does shipping take?",
          answer:
            "Lagos: 1-2 days, Other cities: 3-5 days, Remote areas: 5-7 days. You'll receive tracking info via email.",
        },
        {
          id: 5,
          question: "Do you offer free shipping?",
          answer:
            "Yes! Free shipping on all orders over ₦100,000. Otherwise, shipping costs ₦2,500 - ₦5,000 depending on location.",
        },
        {
          id: 6,
          question: "Can I track my order?",
          answer:
            "Absolutely! You'll receive a tracking number via email once your order ships. Track through our website or courier's portal.",
        },
      ],
    },
    {
      category: "🔄 Returns & Warranty",
      icon: "🔧",
      questions: [
        {
          id: 7,
          question: "What is your return policy?",
          answer:
            "14-day hassle-free returns for unused items in original packaging. Free returns for defective products.",
        },
        {
          id: 8,
          question: "How long does warranty last?",
          answer:
            "Warranty varies by brand: Samsonite (10 years), Travelpro (5 years), Tumi (5 years), others (1-3 years).",
        },
        {
          id: 9,
          question: "How do I claim warranty?",
          answer:
            "Contact our support team with your order number and photos of the issue. We'll guide you through the process.",
        },
      ],
    },
    {
      category: "📞 Customer Support",
      icon: "💬",
      questions: [
        {
          id: 10,
          question: "How can I contact support?",
          answer:
            "Email: support@bagstore.com | Phone: +234 123 456 7890 | Live chat: 8 AM - 8 PM daily",
        },
        {
          id: 11,
          question: "Do you have a physical store?",
          answer:
            "Yes! Visit our showroom in Lagos at 123 Main Street, Victoria Island. Open Monday-Saturday, 9 AM - 6 PM.",
        },
      ],
    },
  ]);

  const [openCategories, setOpenCategories] = useState({});

  const toggleCategory = (categoryName) => {
    setOpenCategories((prev) => ({
      ...prev,
      [categoryName]: !prev[categoryName],
    }));
  };

  return (
    <div className="faq-page">
      <div className="faq-container">
        <h1>📋 Frequently Asked Questions</h1>
        <p className="faq-subtitle">
          Everything you need to know about shopping with BagStore
        </p>

        <div className="faq-list">
          {/* Using .map() for categories */}
          {faqCategories.map((category, idx) => (
            <div
              key={idx}
              className="faq-category"
              style={{ marginBottom: "30px" }}
            >
              <h2
                onClick={() => toggleCategory(category.category)}
                style={{
                  fontSize: "1.3rem",
                  color: "#1e40af",
                  marginBottom: "15px",
                  cursor: "pointer",
                  display: "flex",
                  alignItems: "center",
                  gap: "10px",
                }}
              >
                <span>{category.icon}</span>
                {category.category}
                <span style={{ fontSize: "0.8rem" }}>
                  {openCategories[category.category] ? "▲" : "▼"}
                </span>
              </h2>

              {/* Show/hide category based on state */}
              {(openCategories[category.category] || idx === 0) && (
                <div>
                  {/* Using .map() for questions in each category */}
                  {category.questions.map((item) => (
                    <details className="faq-item" key={item.id}>
                      <summary>{item.question}</summary>
                      <p>{item.answer}</p>
                    </details>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Faq;

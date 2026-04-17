import React from "react";
import "./Terms.css"; // Your CSS code goes here

export default function Terms() {
  // ========== Using arrays with .map() instead of writing repetitive HTML ==========

  // Array of terms sections
  const termsSections = [
    {
      id: 1,
      title: "1. Acceptance of Terms",
      content:
        "By accessing and using BagStore's website and services, you agree to be bound by these Terms and Conditions. If you do not agree with any part of these terms, you may not use our services.",
    },
    {
      id: 2,
      title: "2. Product Information",
      content:
        "We strive to display accurate product descriptions, prices, and images. However, we do not guarantee that all information is error-free. BagStore reserves the right to correct any errors or update product information without prior notice.",
    },
    {
      id: 3,
      title: "3. Pricing and Payment",
      content:
        "All prices are listed in Nigerian Naira (₦) and include applicable taxes. We accept various payment methods including credit cards, debit cards, and bank transfers. Payment must be received in full before order processing.",
    },
    {
      id: 4,
      title: "4. Shipping and Delivery",
      content:
        "We offer nationwide shipping across Nigeria. Delivery times vary based on location, typically 2-7 business days. Shipping costs are calculated at checkout. Risk of loss transfers to you upon delivery.",
    },
    {
      id: 5,
      title: "5. Returns and Refunds",
      content:
        "We offer a 14-day return policy for unused items in original packaging. To initiate a return, contact our customer support. Refunds are processed within 7-10 business days after we receive the returned item.",
    },
    {
      id: 6,
      title: "6. Warranty",
      content:
        "Select brands come with manufacturer warranties. Warranty periods vary by product and brand. Please refer to the product page for specific warranty information. Damage from misuse or accidents is not covered.",
    },
    {
      id: 7,
      title: "7. User Accounts",
      content:
        "You are responsible for maintaining the confidentiality of your account credentials. Notify us immediately of any unauthorized account access. We reserve the right to suspend or terminate accounts violating these terms.",
    },
    {
      id: 8,
      title: "8. Privacy Policy",
      content:
        "Your privacy is important to us. We collect and process personal data according to our Privacy Policy. By using our services, you consent to such collection and use in accordance with our Privacy Policy.",
    },
    {
      id: 9,
      title: "9. Limitation of Liability",
      content:
        "BagStore shall not be liable for any indirect, incidental, or consequential damages arising from product use or inability to use our services. Our total liability is limited to the amount paid for the product.",
    },
    {
      id: 10,
      title: "10. Changes to Terms",
      content:
        "We may update these terms at any time. Continued use of our services after changes constitutes acceptance of new terms. Check this page periodically for updates.",
    },
  ];

  // Array for contact information
  const contactInfo = [
    { icon: "📧", label: "Email", value: "support@bagstore.com" },
    { icon: "📞", label: "Phone", value: "+234 123 456 7890" },
    { icon: "📍", label: "Address", value: "Lagos, Nigeria" },
  ];

  return (
    <div className="terms-page">
      <div className="terms-container">
        <h1>Terms & Service</h1>
        <p className="update-date">Last Updated: April 17, 2026</p>

        <div className="terms-content">
          {/* ========== Using .map() to display all terms sections ========== */}
          {termsSections.map((section) => (
            <section key={section.id}>
              <h2>{section.title}</h2>
              <p>{section.content}</p>
            </section>
          ))}

          {/* Contact Section - Also using .map() */}
          <section>
            <h2>11. Contact Us</h2>
            {contactInfo.map((info, index) => (
              <p key={index}>
                <strong>
                  {info.icon} {info.label}:
                </strong>{" "}
                {info.value}
              </p>
            ))}
          </section>
        </div>
      </div>
    </div>
  );
};

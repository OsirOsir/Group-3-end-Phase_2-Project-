import React, { useState } from 'react';
import '../styles/FAQ.css';

const FAQ = () => {
  const [activeIndex, setActiveIndex] = useState(null);

  const faqs = [
    {
      question: 'What payment methods do you accept?',
      answer: 'We accept a variety of payment methods, including Visa, MasterCard, American Express, PayPal, and Apple Pay. You can choose your preferred payment option at checkout.'
    },
    {
      question: 'How can I track my order?',
      answer: 'Once your order is shipped, you will receive an email with a tracking number. You can use this number to track your order on our website under "My Orders" or through the carrier’s tracking system.'
    },
    {
      question: 'What is your return policy?',
      answer: 'We offer a 30-day return policy on most items. If you’re not satisfied with your purchase, you can return it within 30 days of receipt for a full refund or exchange. Items must be in their original condition and packaging. Please visit our Returns page for more details.'
    },
    {
      question: 'Do you offer international shipping?',
      answer: 'Yes, we offer international shipping to select countries. Shipping costs and delivery times vary depending on the destination. You can see the available shipping options and costs at checkout.'
    }
  ];

  const toggleFAQ = (index) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  return (
    <div className="faq-section">
      <h2>Frequently Asked Questions</h2>
      {faqs.map((faq, index) => (
        <div key={index} className="faq-item">
          <div className="faq-question" onClick={() => toggleFAQ(index)}>
            <h3>{faq.question}</h3>
            <span className="faq-toggle">{activeIndex === index ? '-' : '+'}</span>
          </div>
          <div className={`faq-answer ${activeIndex === index ? 'active' : ''}`}>
            <p>{faq.answer}</p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default FAQ;

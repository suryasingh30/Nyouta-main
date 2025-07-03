// WeddingFeatures.jsx
import React from 'react';
import './WeddingFeatures.css';

const WeddingFeatures = () => {
  const features = [
    'Love Story Section',
    'Personalized URL',
    'Family Details',
    'RSVP Management',
    'Photo Gallery',
    'Countdown Timer',
    'Travel & Accommodation Info',
    'Mobile-Friendly Design',
    'Password Protection',
    'Impressive on Social Media',
  ];

  return (
    <div className="features-container">
      <div className="headings">
        <h2 className="features-heading">
          “ Everything about your wedding in one place “
        </h2>
        <p className="features-subheading">
          The Perfect Wedding Begins with the Perfect Website
        </p>
      </div>
      <div className="features-content">

        <div className="features-left"></div>

        <div className="features-right">
          <h3 className="features-title">Website Features&gt;</h3>
          <ul className="features-list">
            {features.map((item, idx) => (
              <li key={idx}>• {item}</li>
            ))}
          </ul>

          <button className="start-button">START YOUR WEBSITE</button>
        </div>
      </div>
    </div>
  );
};

export default WeddingFeatures;

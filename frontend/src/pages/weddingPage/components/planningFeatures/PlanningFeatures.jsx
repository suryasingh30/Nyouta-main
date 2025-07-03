// PlanningFeatures.jsx
import React from 'react';
import './PlanningFeatures.css';

const PlanningFeatures = () => {
  const features = [
    {
      title: 'Create Your Website in Minutes',
      desc: 'Pick a beautiful template, customize it with colors and photos, and share all your wedding details easily.',
    },
    {
      title: 'All Event Details in One Place',
      desc: 'From Haldi to Reception share event timings, dress codes, maps, accommodation, and transport info with your guests.',
    },
    {
      title: 'Easy RSVP and Guest Greetings',
      desc: 'Collect RSVPs for each event and receive heartfelt wishes and blessings digitally from your guests.',
    },
    {
      title: 'Share Your Story',
      desc: 'Add your journey, proposal story, and wedding gallery to make your website truly personal.',
    },
    {
      title: 'Real-Time Updates',
      desc: 'Instantly update guests about any changes—like venue, timings, or special announcements.',
    },
    {
      title: 'Receive Digital Greetings',
      desc: "Let guests send their love, blessings, and personal messages directly through your website—a keepsake you'll cherish forever.",
    },
    {
      title: 'Private and Mobile-Friendly',
      desc: 'Secure your site with a password and make it easy for guests to access anytime, anywhere.',
    },
    {
      title: 'Countdown to Your Big Day',
      desc: 'Add a live countdown for all your wedding celebrations!',
    },
  ];

  return (
    <div className="plan-container">
      <div className="heading">
        <h2 className="plan-heading">Make Your Wedding Planning Stress-Free and Stylish</h2>
        <p className="plan-subheading">
          Set up your own unique wedding website to share with your guests.
        </p>
      </div>
      <div className="plan-content">
        <div className="plan-left">

          <div className="feature-list">
            {features.map((item, idx) => (
              <div className="feature-item" key={idx}>
                <p className="feature-title">• {item.title}</p>
                <p className="feature-desc">{item.desc}</p>
              </div>
            ))}
          </div>

          <p className="read-more">READ MORE.......</p>

          <button className="create-btn">CREATE YOUR WEBSITE</button>
        </div>

        <div className="plan-right"></div>
      </div>
    </div>
  );
};

export default PlanningFeatures;

// AiPoweredSection.jsx
import React from 'react';
import './AiPoweredSection.css';
import RecentCouples from '../recentCouples/RecentCouples';

const AiPoweredSection = () => {
  const features = [
    {
      title: 'Easy Website Creation',
      desc: 'Our AI-assisted builder adapts to your style…',
    },
    {
      title: 'Smart Guest Integration',
      desc: 'Automated RSVP tracking and real-time updates…',
    },
    {
      title: 'Dynamic Personalization',
      desc: 'Machine learning suggests design elements…',
    },
  ];

  return (
    <div className="ai-section">
      <div className="ai-content">
        <div className="ai-left"></div>

        <div className="ai-right">
          {features.map((item, idx) => (
            <div className="ai-feature" key={idx}>
              <div className="ai-dot"></div>
              <div>
                <p className="ai-title">{item.title}</p>
                <p className="ai-desc">{item.desc}</p>
              </div>
            </div>
          ))}

          <button className="ai-button">SETUP YOUR WEBSITE</button>
        </div>
      </div>

      <div className="recent-couples">
        <RecentCouples/>
      </div>
    </div>
  );
};

export default AiPoweredSection;

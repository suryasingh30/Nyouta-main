// WeddingDesigns.jsx
import React from 'react';
import './WeddingDesigns.css';

const WeddingDesigns = () => {
  const designs = [1, 2, 3];

  return (
    <div className="wedding-container">
      <h2 className="wedding-title">Weddings Made Wonderfully Easy</h2>
      <p className="wedding-subtitle">
        Free Wedding website: Seamlessly Share Dates, Venues and memories
      </p>

      <h3 className="wedding-heading">Choose your Elegant Design Here for FREE...</h3>

      <div className="design-cards">
        {designs.map((_, index) => (
          <div className="design-card" key={index}>
            <div className="design-thumbnail">
              <div className="design-overlay"></div>
            </div>
            <div className="button-group">
              <button className="btn preview">PREVIEW</button>
              <button className="btn create">CREATE</button>
            </div>
          </div>
        ))}
      </div>

      <button className="btn view-all">VIEW ALL DESIGN</button>
    </div>
  );
};

export default WeddingDesigns;

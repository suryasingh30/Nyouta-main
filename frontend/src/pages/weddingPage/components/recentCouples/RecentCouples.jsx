import React from 'react';
import './RecentCouples.css';
import frame from '../../images/path2.png';

const couples = [
  { name: 'Ravi & Priya', place: 'Delhi' },
  { name: 'Aman & Shruti', place: 'Mumbai' },
  { name: 'Rahul & Sneha', place: 'Jaipur' },
  { name: 'Karan & Isha', place: 'Pune' },
  { name: 'Arjun & Meera', place: 'Goa' },
];

const RecentCouples = () => {
  return (
    <div className="couples-section">
      <div className="banner">GO with New Trendz!</div>
      <h3 className="section-heading">Recently Created by Happy Couples</h3>

      <div className="couples-grid">
        {couples.map((couple, index) => (
          <div key={index} className="couple-card" style={{ backgroundImage: `url(${frame})` }}>
            <div className="card-inner">
              <div className="photo"></div>
              <div className="name">{couple.name}</div>
              <div className="place">{couple.place}</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default RecentCouples;

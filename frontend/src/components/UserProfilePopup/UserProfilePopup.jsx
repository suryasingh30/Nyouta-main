import React from 'react';
import './UserProfilePopup.scss';

const UserProfilePopup = ({ user, onClose, onLogout }) => {
  if (!user) return null;

  return (
    <>
      <div className="userprofile-overlay" onClick={onClose} />
      <div className="userprofile-popup" role="dialog" aria-modal="true" aria-labelledby="userprofile-title">
        <button className="close-icon" onClick={onClose} aria-label="Close user profile">
          &times;
        </button>
        <h2 id="userprofile-title">User Profile</h2>
        <div className="user-details">
          <p><strong>Name:</strong> {user.name}</p>
          <p><strong>Email:</strong> {user.email}</p>
        </div>
        <button className="logout-btn" onClick={onLogout}>
          <span className="logout-icon" aria-hidden="true">&#x1F511;</span> Logout
        </button>
      </div>
    </>
  );
};

export default UserProfilePopup;

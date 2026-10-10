import React from 'react';
import './Footer.css';

const Footer = () => {
  return (
    <footer className="app-footer">
      <div className="footer-content">
        <div className="footer-status">
          <span className="status-dot"></span>
          <span>Global Data Services Operational</span>
        </div>
        <p>&copy; {new Date().getFullYear()} Country Explorer • Built with React & Leaflet</p>
      </div>
    </footer>
  );
};

export default Footer;


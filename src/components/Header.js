import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import './Header.css';

const Header = () => {
  const location = useLocation();

  return (
    <header className="app-header">
      <Link to="/home" className="logo-link">
        <div className="logo">
          <span className="earth-icon">🌍</span>
          <span className="logo-text">Country <span className="logo-accent">Explorer</span></span>
        </div>
      </Link>

      <nav className="nav-menu">
        <Link 
          to="/home" 
          className={`nav-link ${location.pathname === '/home' ? 'active' : ''}`}
        >
          <span>Home</span>
        </Link>
        <Link 
          to="/about" 
          className={`nav-link ${location.pathname === '/about' ? 'active' : ''}`}
        >
          <span>About</span>
        </Link>
      </nav>
    </header>
  );
};

export default Header;
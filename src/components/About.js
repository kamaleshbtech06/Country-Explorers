import React from 'react';
import './About.css';

const About = () => {
  return (
    <div className="about-container">
      <header className="about-hero">
        <span className="earth-icon-lg" role="img" aria-label="Globe">
          🌍
        </span>

        <h2>
          About <span className="highlight">Country Explorer</span>
        </h2>

        <p className="subtitle">
          An interactive, high-fidelity gateway optimized for real-time exploratory data analysis.
        </p>
      </header>

      <section className="about-card">
        <p className="about-description">
          This system provides access to global country demography, capitals, ISO keys, flags, and mapping coordinates compiled straight to your screen.
        </p>

        <div className="features-grid">
          <article className="feature-item">
            <span className="feature-icon">🔍</span>
            <h3>Dynamic Search</h3>
            <p>
              Search across country names, capital cities, and three-letter ISO codes instantly.
            </p>
          </article>

          <article className="feature-item">
            <span className="feature-icon">🗺️</span>
            <h3>Interactive Maps</h3>
            <p>
              OpenStreetMap and Leaflet integration pinpointing exact capital coordinates on world maps.
            </p>
          </article>

          <article className="feature-item">
            <span className="feature-icon">📊</span>
            <h3>Region Filtering</h3>
            <p>
              Filter nations by Americas, Asia, Europe, Africa, Oceania, and sort by demography or area.
            </p>
          </article>
        </div>

        <div className="tech-stack">
          <span className="tech-label">Built With Modern Web Standards</span>
          <span className="badge react">React 19</span>
          <span className="badge router">React Router v7</span>
          <span className="badge leaflet">Leaflet Maps</span>
          <span className="badge api">REST API v3</span>
        </div>
      </section>
    </div>
  );
};

export default About;
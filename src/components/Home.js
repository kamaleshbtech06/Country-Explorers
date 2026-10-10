import React, { useState, useEffect, useMemo } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import L from 'leaflet';
import { localCountries } from './countriesData';
import './Home.css';

import 'leaflet/dist/leaflet.css';
import icon from 'leaflet/dist/images/marker-icon.png';
import iconShadow from 'leaflet/dist/images/marker-shadow.png';

let DefaultIcon = L.icon({
  iconUrl: icon,
  shadowUrl: iconShadow,
  iconSize: [25, 41],
  iconAnchor: [12, 41],
});

L.Marker.prototype.options.icon = DefaultIcon;

const REGIONS = ['All', 'Americas', 'Asia', 'Europe', 'Africa', 'Oceania'];

const Home = () => {
  const [countries, setCountries] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [searchCriteria, setSearchCriteria] = useState('name');
  const [selectedRegion, setSelectedRegion] = useState('All');
  const [sortBy, setSortBy] = useState('name-asc');
  const [loading, setLoading] = useState(true);

  const navigate = useNavigate();

  useEffect(() => {
    setCountries(localCountries);
    setLoading(false);
  }, []);

  const filteredCountries = useMemo(() => {
    return countries
      .filter((country) => {
        if (selectedRegion !== 'All' && country.region !== selectedRegion) {
          return false;
        }

        const q = searchTerm.trim().toLowerCase();
        if (!q) return true;

        if (searchCriteria === 'name') {
          return country.name?.common?.toLowerCase().includes(q);
        }
        if (searchCriteria === 'code') {
          return country.cca3?.toLowerCase().includes(q);
        }
        if (searchCriteria === 'capital') {
          return country.capital?.[0]?.toLowerCase().includes(q);
        }
        return false;
      })
      .sort((a, b) => {
        if (sortBy === 'name-asc') {
          return a.name.common.localeCompare(b.name.common);
        }
        if (sortBy === 'name-desc') {
          return b.name.common.localeCompare(a.name.common);
        }
        if (sortBy === 'pop-desc') {
          return (b.population || 0) - (a.population || 0);
        }
        if (sortBy === 'area-desc') {
          return (b.area || 0) - (a.area || 0);
        }
        return 0;
      });
  }, [countries, searchTerm, searchCriteria, selectedRegion, sortBy]);

  const totalPopulation = useMemo(() => {
    return filteredCountries.reduce((sum, c) => sum + (c.population || 0), 0);
  }, [filteredCountries]);

  if (loading) {
    return (
      <div className="loading-state">
        <div className="spinner"></div>
        <p>Loading Global Data Registry...</p>
      </div>
    );
  }

  return (
    <div className="home-page">
      <section className="hero-banner">
        <div className="hero-badge">🌐 Dynamic Global Database</div>
        <h1 className="hero-title">
          Explore Nations of <span className="hero-highlight">The World</span>
        </h1>
        <p className="hero-subtitle">
          Search geographical statistics, interactive mapping coordinates, capitals, and demography across all continents.
        </p>

        <div className="stats-strip">
          <div className="stat-card">
            <span className="stat-icon">🗺️</span>
            <div>
              <span className="stat-number">{filteredCountries.length}</span>
              <span className="stat-label">Countries Shown</span>
            </div>
          </div>
          <div className="stat-card">
            <span className="stat-icon">👥</span>
            <div>
              <span className="stat-number">
                {totalPopulation > 1_000_000_000
                  ? `${(totalPopulation / 1_000_000_000).toFixed(2)}B`
                  : `${(totalPopulation / 1_000_000).toFixed(1)}M`}
              </span>
              <span className="stat-label">Total Demography</span>
            </div>
          </div>
          <div className="stat-card">
            <span className="stat-icon">📍</span>
            <div>
              <span className="stat-number">{selectedRegion}</span>
              <span className="stat-label">Active Region</span>
            </div>
          </div>
        </div>
      </section>

      <section className="controls-section">
        <div className="search-bar-wrap">
          <span className="search-icon">🔍</span>
          <input
            type="text"
            placeholder={`Search by ${searchCriteria}...`}
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="search-input"
          />
          {searchTerm && (
            <button className="clear-btn" onClick={() => setSearchTerm('')} title="Clear search">
              ✕
            </button>
          )}
        </div>

        <div className="selectors-wrap">
          <div className="select-group">
            <label className="select-label">Criteria</label>
            <select
              value={searchCriteria}
              onChange={(e) => setSearchCriteria(e.target.value)}
              className="custom-select"
            >
              <option value="name">Name</option>
              <option value="capital">Capital</option>
              <option value="code">Country Code</option>
            </select>
          </div>

          <div className="select-group">
            <label className="select-label">Sort By</label>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="custom-select"
            >
              <option value="name-asc">Alphabetical (A - Z)</option>
              <option value="name-desc">Alphabetical (Z - A)</option>
              <option value="pop-desc">Population (High - Low)</option>
              <option value="area-desc">Land Area (Largest)</option>
            </select>
          </div>
        </div>
      </section>

      <section className="region-filter-bar">
        {REGIONS.map((region) => (
          <button
            key={region}
            className={`region-btn ${selectedRegion === region ? 'active' : ''}`}
            onClick={() => setSelectedRegion(region)}
          >
            {region === 'All' ? '🌍 All Continents' : region}
          </button>
        ))}
      </section>

      <section className="grid-container">
        {filteredCountries.length > 0 ? (
          filteredCountries.map((country) => (
            <div key={country.cca3} className="country-card">
              <Link to={`/country/${country.cca3}`} className="card-link">
                <div className="flag-wrapper">
                  <img
                    src={country.flags?.png}
                    alt={`${country.name?.common} flag`}
                    className="flag-img"
                    loading="lazy"
                    onError={(e) => {
                      e.target.onerror = null;
                      const code = country.cca3 || 'NAV';
                      e.target.src = `data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="320" height="180" viewBox="0 0 320 180"><rect width="320" height="180" fill="%230f172a"/><text x="50%" y="50%" dominant-baseline="middle" text-anchor="middle" fill="%2300f0ff" font-family="sans-serif" font-weight="bold" font-size="24">🏳️ ${code}</text></svg>`;
                    }}
                  />
                  <div className="flag-overlay" />
                  <span className="region-pill">{country.region}</span>
                </div>

                <div className="card-info">
                  <div className="card-header-row">
                    <h3 className="country-title">{country.name?.common}</h3>
                    <span className="code-tag">{country.cca3}</span>
                  </div>

                  <div className="metric-row">
                    <span className="metric-icon">🏛️</span>
                    <span className="metric-text">
                      <strong>Capital:</strong> {country.capital?.[0] || 'N/A'}
                    </span>
                  </div>

                  <div className="metric-row">
                    <span className="metric-icon">👥</span>
                    <span className="metric-text">
                      <strong>Population:</strong> {country.population ? country.population.toLocaleString() : 'N/A'}
                    </span>
                  </div>

                  {country.subregion && (
                    <div className="metric-row">
                      <span className="metric-icon">🗺️</span>
                      <span className="metric-text">
                        <strong>Subregion:</strong> {country.subregion}
                      </span>
                    </div>
                  )}

                  <div className="card-action">
                    <span>Explore Profile</span>
                    <span className="arrow">→</span>
                  </div>
                </div>
              </Link>
            </div>
          ))
        ) : (
          <div className="no-data-card">
            <span className="no-data-icon">🔍</span>
            <h3>No Countries Found</h3>
            <p>We couldn't find any country matching "{searchTerm}". Try changing your search query or region filter.</p>
            <button className="reset-filter-btn" onClick={() => { setSearchTerm(''); setSelectedRegion('All'); }}>
              Reset Filters
            </button>
          </div>
        )}
      </section>

      <section className="map-section">
        <div className="map-header">
          <div>
            <h3>🌍 Interactive World Coordinate Map</h3>
            <p>Click on any marker to inspect country statistics and launch details.</p>
          </div>
          <span className="map-count-badge">{filteredCountries.length} Pinpoints</span>
        </div>

        <div className="map-frame">
          <MapContainer center={[20, 0]} zoom={2} className="map-box" scrollWheelZoom={false}>
            <TileLayer
              attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />

            {filteredCountries.map((country) =>
              country.latlng ? (
                <Marker key={country.cca3} position={country.latlng}>
                  <Popup className="custom-popup">
                    <div className="popup-card">
                      <img src={country.flags?.png} alt="flag" className="popup-flag" />
                      <h4>{country.name?.common}</h4>
                      <p>🏛️ Capital: {country.capital?.[0] || 'N/A'}</p>
                      <p>👥 Demography: {country.population ? country.population.toLocaleString() : 'N/A'}</p>
                      <button
                        className="popup-btn"
                        onClick={() => navigate(`/country/${country.cca3}`)}
                      >
                        View Full Details →
                      </button>
                    </div>
                  </Popup>
                </Marker>
              ) : null
            )}
          </MapContainer>
        </div>
      </section>
    </div>
  );
};

export default Home;

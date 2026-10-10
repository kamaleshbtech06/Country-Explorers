import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { MapContainer, TileLayer, Marker } from 'react-leaflet';
import { localCountries } from './countriesData';
import L from 'leaflet';
import './CountryDetails.css';

import 'leaflet/dist/leaflet.css';
import icon from 'leaflet/dist/images/marker-icon.png';
import iconShadow from 'leaflet/dist/images/marker-shadow.png';

let DefaultIcon = L.icon({
  iconUrl: icon,
  shadowUrl: iconShadow,
  iconSize: [25, 41],
  iconAnchor: [12, 41]
});
L.Marker.prototype.options.icon = DefaultIcon;

const CountryDetails = () => {
  const { code } = useParams();
  const [country, setCountry] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (code) {
      const match = localCountries.find(c => c.cca3?.toLowerCase() === code.toLowerCase());
      setCountry(match || null);
    }
    setLoading(false);
  }, [code]);

  const openGoogleMaps = () => {
    if (!country?.latlng) return;
    const [lat, lng] = country.latlng;
    const query = country.capital?.[0] || country.name?.common;
    const url = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(query)}&center=${lat},${lng}`;
    window.open(url, '_blank');
  };

  if (loading) {
    return (
      <div className="details-loading">
        <div className="spinner"></div>
        <p>Retrieving Country Profile...</p>
      </div>
    );
  }

  if (!country) {
    return (
      <div className="details-error">
        <h2>Country Profile Not Found</h2>
        <p>No regional record was found matching code <strong>{code}</strong>.</p>
        <Link to="/home" className="back-btn">← Back to Explorer</Link>
      </div>
    );
  }

  const formattedLanguages = typeof country.languages === 'string'
    ? country.languages
    : Array.isArray(country.languages)
    ? country.languages.join(', ')
    : country.languages && typeof country.languages === 'object'
    ? Object.values(country.languages).join(', ')
    : 'N/A';

  const formattedCurrencies = typeof country.currencies === 'string'
    ? country.currencies
    : Array.isArray(country.currencies)
    ? country.currencies.join(', ')
    : country.currencies && typeof country.currencies === 'object'
    ? Object.values(country.currencies).map(c => c.name || c).join(', ')
    : 'N/A';

  return (
    <div className="details-page">
      <div className="details-container">
        <div className="nav-top">
          <Link to="/home" className="back-link">
            <span>←</span> Back to Explorer
          </Link>
          <span className="iso-badge">ISO 3166-1: {country.cca3}</span>
        </div>

        <header className="details-hero">
          <div className="hero-flag-box">
            <img
              src={country.flags?.png}
              alt={`${country.name?.common} flag`}
              className="hero-flag-img"
              onError={(e) => {
                e.target.onerror = null;
                const code = country.cca3 || 'NAV';
                e.target.src = `data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="600" height="350" viewBox="0 0 600 350"><rect width="600" height="350" fill="%230f172a"/><text x="50%" y="50%" dominant-baseline="middle" text-anchor="middle" fill="%2300f0ff" font-family="sans-serif" font-weight="bold" font-size="32">🏳️ ${code}</text></svg>`;
              }}
            />
          </div>

          <div className="hero-meta">
            <span className="region-tag">{country.region} • {country.subregion || 'N/A'}</span>
            <h1 className="country-name">{country.name?.common}</h1>
            <p className="country-lead">
              Capital city of <strong>{country.capital?.[0] || 'N/A'}</strong> with a total demography of{' '}
              <strong>{country.population ? country.population.toLocaleString() : 'N/A'}</strong> citizens.
            </p>
          </div>
        </header>

        <section className="metrics-grid">
          <div className="info-card">
            <span className="info-icon">🏛️</span>
            <div className="info-content">
              <span className="info-label">Capital City</span>
              <p className="info-value">{country.capital?.[0] || 'N/A'}</p>
            </div>
          </div>

          <div className="info-card">
            <span className="info-icon">👥</span>
            <div className="info-content">
              <span className="info-label">Population</span>
              <p className="info-value">{country.population ? country.population.toLocaleString() : 'N/A'}</p>
            </div>
          </div>

          <div className="info-card">
            <span className="info-icon">📐</span>
            <div className="info-content">
              <span className="info-label">Total Land Area</span>
              <p className="info-value">{country.area ? `${country.area.toLocaleString()} km²` : 'N/A'}</p>
            </div>
          </div>

          <div className="info-card">
            <span className="info-icon">📍</span>
            <div className="info-content">
              <span className="info-label">Region & Subregion</span>
              <p className="info-value">{country.region} ({country.subregion || 'N/A'})</p>
            </div>
          </div>

          <div className="info-card">
            <span className="info-icon">🗣️</span>
            <div className="info-content">
              <span className="info-label">Official Languages</span>
              <p className="info-value">{formattedLanguages}</p>
            </div>
          </div>

          <div className="info-card">
            <span className="info-icon">💱</span>
            <div className="info-content">
              <span className="info-label">Currencies</span>
              <p className="info-value">{formattedCurrencies}</p>
            </div>
          </div>
        </section>

        {country.latlng && (
          <section className="map-details-section">
            <div className="map-title-row">
              <div>
                <h3>📍 Capital Coordinates</h3>
                <p>Geographic latitude & longitude pinpoint for {country.capital?.[0] || country.name?.common}</p>
              </div>
              <button className="gmaps-btn" onClick={openGoogleMaps}>
                Open Google Maps ↗
              </button>
            </div>

            <div className="map-detail-frame">
              <MapContainer
                center={country.latlng}
                zoom={5}
                style={{ height: '350px', width: '100%' }}
                scrollWheelZoom={false}
              >
                <TileLayer
                  attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
                  url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                />
                <Marker position={country.latlng} />
              </MapContainer>
            </div>
          </section>
        )}
      </div>
    </div>
  );
};

export default CountryDetails;

import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

const colors = [
  ['#0f172a', '#1e3a8a', '#0f172a'],
  ['#111827', '#2563eb', '#0f172a'],
  ['#0b1220', '#10b981', '#0f172a'],
  ['#1f2937', '#f59e0b', '#0f172a'],
  ['#0f172a', '#ef4444', '#0f172a'],
];

const LandingPage = () => {
  const navigate = useNavigate();
  const [theme, setTheme] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setTheme((prev) => (prev + 1) % colors.length);
    }, 4000);

    return () => clearInterval(interval);
  }, []);

  const bg = colors[theme];

  return (
    <div style={{ ...styles.page, background: `linear-gradient(135deg, ${bg[0]}, ${bg[1]}, ${bg[2]})` }}>
      <div style={styles.bgWrap}>
        <div style={styles.blob1} />
        <div style={styles.blob2} />
      </div>

      <div style={styles.frame}>
        <table style={styles.table}>
          <tbody>
            <tr>
              <td colSpan="3" style={styles.headerCell}>
                <div style={styles.iconRow}>
                  <span style={styles.icon}>✈️</span>
                  <span style={styles.earth}>🌍</span>
                  <span style={styles.icon}>🗺️</span>
                </div>

                <h1 style={styles.title}>Country Explorer</h1>

                <p style={styles.subtitle}>
                  🌐 Discover Countries • 🏳️ Flags • 📌 Capitals • 👥 Population
                </p>
              </td>
            </tr>

            <tr>
              <td style={styles.cell}>🌎 250+ Countries</td>
              <td style={styles.cell}>🗺️ Live Maps</td>
              <td style={styles.cell}>🔍 Smart Search</td>
            </tr>

            <tr>
              <td colSpan="3" style={styles.featureCell}>
                <div style={styles.features}>
                  <span>🏳️ Flags</span>
                  <span>📌 Capitals</span>
                  <span>👥 Population</span>
                  <span>📐 Area</span>
                  <span>💱 Currency</span>
                  <span>🌐 Languages</span>
                </div>
              </td>
            </tr>

            <tr>
              <td colSpan="3" style={styles.buttonCell}>
                <button style={styles.button} onClick={() => navigate('/home')}>
                  🚀 Explore Now
                </button>
              </td>
            </tr>

            <tr>
              <td colSpan="3" style={styles.footer}>
                🌍 Built with React • 2026 Country Explorer
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default LandingPage;


const styles = {
  page: {
    minHeight: '100vh',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    transition: 'all 1s ease',
    position: 'relative',
    overflow: 'hidden',
    fontFamily: 'Arial'
  },


  bgWrap: {
    position: 'absolute',
    inset: 0,
    zIndex: 0
  },

  blob1: {
    position: 'absolute',
    width: '400px',
    height: '400px',
    borderRadius: '50%',
    background: 'rgba(255,255,255,0.08)',
    filter: 'blur(60px)',
    top: '-100px',
    left: '-100px',
    animation: 'float 6s ease-in-out infinite'
  },

  blob2: {
    position: 'absolute',
    width: '300px',
    height: '300px',
    borderRadius: '50%',
    background: 'rgba(0,255,200,0.1)',
    filter: 'blur(60px)',
    bottom: '-80px',
    right: '-80px',
    animation: 'float2 7s ease-in-out infinite'
  },

  
  frame: {
    zIndex: 2,
    width: '92%',
    maxWidth: '900px',
    background: 'rgba(255,255,255,0.08)',
    backdropFilter: 'blur(14px)',
    border: '1px solid rgba(255,255,255,0.15)',
    borderRadius: '20px',
    padding: '20px'
  },

  table: {
    width: '100%',
    color: '#fff',
    textAlign: 'center',
    borderCollapse: 'collapse'
  },

  headerCell: {
    padding: '25px'
  },


  iconRow: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    gap: '15px',
    fontSize: '32px'
  },

  earth: {
    fontSize: '60px',
    animation: 'spin 6s linear infinite',
    filter: 'drop-shadow(0 0 12px rgba(0,200,255,0.8))'
  },

  icon: {
    fontSize: '28px'
  },

  title: {
    fontSize: '36px',
    margin: '10px 0'
  },

  subtitle: {
    fontSize: '14px',
    opacity: 0.8
  },

  cell: {
    padding: '15px',
    border: '1px solid rgba(255,255,255,0.1)'
  },

  featureCell: {
    padding: '15px'
  },

  features: {
    display: 'flex',
    justifyContent: 'center',
    flexWrap: 'wrap',
    gap: '10px'
  },

  buttonCell: {
    padding: '20px'
  },

  button: {
    padding: '14px 32px',
    fontSize: '16px',
    fontWeight: 'bold',
    borderRadius: '12px',
    border: 'none',
    cursor: 'pointer',
    color: '#fff',
    background: 'linear-gradient(135deg, #3b82f6, #06b6d4)',
    boxShadow: '0 0 20px rgba(0,150,255,0.5)'
  },

  footer: {
    fontSize: '12px',
    opacity: 0.6,
    padding: '10px'
  }
};

if (typeof document !== 'undefined') {
  const styleEl = document.createElement('style');
  styleEl.textContent = `
    @keyframes spin {
      0% { transform: rotate(0deg); }
      100% { transform: rotate(360deg); }
    }
    @keyframes float {
      0% { transform: translateY(0px); }
      50% { transform: translateY(20px); }
      100% { transform: translateY(0px); }
    }
    @keyframes float2 {
      0% { transform: translateY(0px); }
      50% { transform: translateY(-20px); }
      100% { transform: translateY(0px); }
    }
  `;
  document.head.appendChild(styleEl);
}
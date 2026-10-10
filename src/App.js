import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';
import Header from './components/Header';
import Footer from './components/Footer';
import Home from './components/Home';
import CountryDetails from './components/CountryDetails';
import About from './components/About';
import LandingPage from './components/LandingPage';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route
          path="/home"
          element={
            <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
              <Header />
              <main style={{ flex: 1 }}><Home /></main>
              <Footer />
            </div>
          }
        />
        <Route
          path="/country/:code"
          element={
            <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
              <Header />
              <main style={{ flex: 1 }}><CountryDetails /></main>
              <Footer />
            </div>
          }
        />
        <Route
          path="/about"
          element={
            <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
              <Header />
              <main style={{ flex: 1 }}><About /></main>
              <Footer />
            </div>
          }
        />
      </Routes>
    </Router>
  );
}

export default App;


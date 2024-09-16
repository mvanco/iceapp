import React from 'react';
import { useState } from 'react';
import logo from './logo.svg';
import './App.css';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import HistoryScreen from './screen/HistoryScreen';
import PredictionScreen from './screen/PredictionScreen';

function App() {
  return (
    <div className="App">
      <Router>
        <div className="match-parent flex-column">
          <div className="AppBar">
            <span className="AppBar-title">DeutcheTelecom</span>
          </div>
          <div className="Page">
            <Routes>
              <Route path="/" element={<HistoryScreen/>} />
              <Route path="/new" element={<PredictionScreen/>} />
            </Routes>
          </div>
        </div>
      </Router>
    </div>
  );
}

export default App;

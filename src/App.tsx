import React from 'react';
import logo from './logo.svg';
import './App.css';
import { BrowserRouter as Router, Routes, Route, Link, useNavigate } from 'react-router-dom';
import HomePage from './page/HomePage';
import TermsPage from './page/TermsPage';
import PageWrapper from './page/PageWrapper';
import LoginScreen from './screen/LoginScreen';

function onLogout() {

}

function onRefresh() {
  window.location.reload();
}

function onWeb() {

}

const InternalScreen = () => {
  return (
    <>
      <h2>Internal page</h2>
      <div className="Menu">
        <Link to="/internal/home">Home</Link>
        <Link to="/internal/terms">Terms</Link>
      </div>
    </>
  )
}

function App() {
  const navigate = useNavigate();
  return (
    <div className="App">
      <Router>
        <div className="match-parent flex-column">
          <div className="AppBar">
            <span className="AppBar-title">Attendance</span>
            <a href="#" onClick={onLogout}>Logout</a>&nbsp;
            <a href="javascript:void(0);" onClick={onRefresh}>Refresh</a>&nbsp;
            <a href="https://iceapp.cz" onClick={onWeb}>Web App</a>
          </div>
          <div className="Page">
            <Routes>
              <Route path="/" element={<LoginScreen />} />
              <Route path="/internal/*" element={<PageWrapper/>}>
                  <Route index element={<HomePage />} />
                  <Route path="home" element={<HomePage />} />
                  <Route path="terms" element={<TermsPage />} />
              </Route>
            </Routes>
          </div>
        </div>
      </Router>
    </div>
  );
}

export default App;

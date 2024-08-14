import React from 'react';
import { useState } from 'react';
import logo from './logo.svg';
import './App.css';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import HomePage from './page/HomePage';
import TermsPage from './page/TermsPage';
import PageWrapper from './page/PageWrapper';
import AdminPageWrapper from './page/AdminPageWrapper';
import LoginScreen from './screen/LoginScreen';
import RegisterScreen from './screen/RegisterScreen';
import CurrentConfig from './model/Config';
import { useEffect } from 'react';
import AdminUsersPage from './page/AdminUsersPage';
import AdminTermsPage from './page/AdminTermsPage';

function onLogout() {
  CurrentConfig.clearSession();
  window.location.href="/";
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
  const [loggedIn, setLoggedIn] = useState(false);

  useEffect(() => {
    setLoggedIn(CurrentConfig.token !== undefined);
  }, []);

  return (
    <div className="App">
      <Router>
        <div className="match-parent flex-column">
          <div className="AppBar">
            <span className="AppBar-title">Attendance</span>
            {loggedIn && <><a href="#" onClick={onLogout}>Odhlásit</a>&nbsp;&nbsp;&nbsp;</> }
            <a href="javascript:void(0);" onClick={onRefresh}>Obnovit</a>&nbsp;&nbsp;&nbsp;
            <a href="https://iceapp.cz?mode=web" onClick={onWeb}>Web</a>
          </div>
          <div className="Page">
            <Routes>
              <Route path="/" element={<LoginScreen setLoggedIn={setLoggedIn}/>} />
              <Route path="/register" element={<RegisterScreen/>} />
              <Route path="/internal/*" element={<PageWrapper/>}>
                  <Route index element={<HomePage />} />
                  <Route path="home" element={<HomePage />} />
                  <Route path="terms" element={<TermsPage />} />
              </Route>
              <Route path="/admin/*" element={<AdminPageWrapper/>}>
                  <Route index element={<HomePage />} />
                  <Route path="home" element={<HomePage />} />
                  <Route path="users" element={<AdminUsersPage />} />
                  <Route path="terms" element={<AdminTermsPage />} />
              </Route>
            </Routes>
          </div>
        </div>
      </Router>
    </div>
  );
}

export default App;

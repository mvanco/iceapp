import React from 'react';
import logo from './logo.svg';
import './App.css';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';


function onLogout() {

}

function onRefresh() {

}

function onWeb() {

}

const LoginScreen = () => {
  return (
    <>
      <h2>Login screen</h2>
      <Link to="/internal">Log in</Link>
    </>
  )
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

const HomeScreen = () => {
  return (
    <>
      <h2>Home screen</h2>
      <div className="Menu">
        <Link to="/internal/home">Home</Link>
        <Link to="/internal/terms">Terms</Link>
      </div>
    </>
  )
}

const TermsScreen = () => {
  return (
    <>
      <h2>Terms screen</h2>
      <div className="Menu">
        <Link to="/internal/home">Home</Link>
        <Link to="/internal/terms">Terms</Link>
      </div>
    </>
  )
}


function App() {
  return (
    <div className="App">
      <Router>
        <div>
          <div className="AppBar">
            <a href="#" onClick={onLogout}>Logout</a>&nbsp;
            <a href="#" onClick={onRefresh}>Refresh</a>&nbsp;
            <a href="#" onClick={onWeb}>Web App</a>
          </div>
          <div className="Page">
            <Routes>
              <Route path="/" element={<LoginScreen />} />
              <Route path="/internal/*">
                <Route index element={<HomeScreen />} />
                <Route path="home" element={<HomeScreen />} />
                <Route path="terms" element={<TermsScreen />} />
              </Route>
            </Routes>
          </div>
        </div>
      </Router>
    </div>
  );
}

export default App;

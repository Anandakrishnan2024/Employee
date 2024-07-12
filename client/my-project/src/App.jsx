
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css'
import Register from './components/Register';
import Login from './components/Login';
import UserProfile from './components/UserProfile';


function App() {
 

  return (
    <Router>
    <Routes>+
      <Route path="/" element={<Register />} />
      <Route path="/login" element={<Login />} />
      <Route path="/users/:userId" element={<UserProfile />}></Route>
      {/* Add more routes as needed */}
    </Routes>
  </Router>
  )
}

export default App

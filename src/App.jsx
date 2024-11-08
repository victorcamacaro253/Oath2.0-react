import { useState } from 'react'
import './App.css'
import Profile from './components/profile';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './components/login';

function App() {

  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path='/profile'  element={<Profile />} />
      </Routes>
    </Router>
  )
}

export default App

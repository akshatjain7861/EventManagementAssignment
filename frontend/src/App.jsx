import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Navbar from './components/Navbar';
import EventPage from './components/EventPage';
import EventCards from './components/EventCards';

export default function App() {
  return (
    <Router>
      <Navbar />  {/* Navbar added here */}
      <Routes>
        <Route path="/" element={<EventPage />} />
        <Route path="/showevent" element={<EventCards />} />
      </Routes>
    </Router>
  );
}


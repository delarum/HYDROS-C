import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import Home from './pages/Home';
import Involve from './pages/Involve';
import GarbageShop from './pages/GarbageShop';
import Weather from './pages/Weather';
import About from './pages/About';
import Projects from './pages/Projects';
import Contact from './pages/Contact';

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/shop" element={<GarbageShop />} />
      <Route path="/pages/involve" element={<Involve />} />
      <Route path="/pages/weather" element={<Weather />} />
      <Route path="/pages/About" element={<About />} />
      <Route path="/pages/Projects" element={<Projects />} />
      <Route path="/pages/Contact" element={<Contact />} />

      <Route path="/pages/Home.jsx" element={<Navigate to="/" replace />} />
      <Route path="/index.html" element={<Navigate to="/" replace />} />
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}

export default App;
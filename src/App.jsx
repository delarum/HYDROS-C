import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import Home from './pages/Home';
import Involve from './pages/Involve';
import GarbageShop from './pages/GarbageShop';

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/shop" element={<GarbageShop />} />
      <Route path="/pages/involve" element={<Involve />} />
      <Route path="/pages/Home.jsx" element={<Navigate to="/" replace />} />
      <Route path="/index.html" element={<Navigate to="/" replace />} />
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}

export default App;
import React from 'react'
import Involve from './pages/Involve'

import Home from './pages/Home';
import { Routes, Route, Navigate } from 'react-router-dom';
function App() {
  return (
   
   <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/involve" element={<Involve />} />
      <Route path="/pages/Home.jsx" element={<Navigate to="/" replace />} />
    </Routes>
  
  );
}

export default App
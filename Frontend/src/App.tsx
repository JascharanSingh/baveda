// src/App.tsx
import React from 'react';
import Header from './components/Header';
import Footer from './components/Footer';
import Admin from './Pages/Admin';
import Home from './Pages/Home';
import { Routes, Route } from 'react-router-dom';
import WineAndSpirits from './components/WineAndSpirits';
function App() {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <WineAndSpirits/>
      <main className="flex-grow">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<h1>About</h1>} />
          <Route path="/contact" element={<h1>Hello, it is Contact</h1>} />
          <Route path="/admin" element={<Admin />} />
        </Routes>
      </main>
      <Footer />
    </div>
  );
}

export default App;
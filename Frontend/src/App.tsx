// src/App.tsx
import React from 'react';
import Header from './components/Header';
import Footer from './components/Footer';
import Admin from './Pages/Admin';
import Home from './Pages/Home';
import { Routes, Route } from 'react-router-dom';
import { IKContext } from 'imagekitio-react';

function App() {
  return (
    <IKContext
  publicKey="public_fO8gX+ROJuQ/1YSkIBVs4wA6FSE="
  urlEndpoint="https://ik.imagekit.io/zq9tdggx6"
  transformationPosition="path"
  
  >
    <div className="min-h-screen flex flex-col">
      <Header />
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
    </IKContext>
  );
}

export default App;
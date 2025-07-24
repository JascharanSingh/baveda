import React from 'react';
import Header from './components/Header';
import Footer from './components/Footer';
import Admin from './Pages/Admin';

function App() {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-grow">
        {/* Main content goes here */}
        <Admin/>
      </main>
      <Footer />
    </div>
  );
}

export default App;

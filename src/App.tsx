import React from 'react';

function App() {
  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center justify-center px-4">
      <div className="bg-white rounded-2xl shadow-lg p-8 max-w-2xl w-full text-center">
        <h1 className="text-4xl font-bold text-blue-600 mb-4">
          Welcome to Baveda
        </h1>
        <p className="text-gray-700 mb-6">
          Tailwind CSS is now integrated with React and Vite. Start building beautiful UIs faster than ever!
        </p>
        <button className="bg-blue-600 text-white px-6 py-3 rounded-xl text-lg font-medium hover:bg-blue-700 transition duration-300">
          Get Started
        </button>
      </div>
    </div>
  );
}

export default App;

import React, { useState, useEffect } from 'react';
import './WelcomeModal.css';

const WelcomeModal: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    const hasSeenModal = sessionStorage.getItem('hasSeenWelcomeModal');
    if (!hasSeenModal) {
      setIsOpen(true);
    }
  }, []);

  const handleEnter = () => {
    setIsOpen(false);
    sessionStorage.setItem('hasSeenWelcomeModal', 'true');
  };

  if (!isOpen) {
    return null;
  }

  return (
    <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50">
      <div className="bg-gradient-to-r from-pink-500 to-yellow-500 p-1 rounded-lg shadow-2xl animate-fade-in-down">
        <div className="bg-white dark:bg-gray-800 p-8 rounded-lg text-center">
          <h2 className="text-4xl font-extrabold mb-4 text-transparent bg-clip-text bg-gradient-to-r from-pink-500 to-yellow-500 animate-pulse">
            WELCOME TO OUR PLATFORM 
                🏦"CIVIC REPORT"
          </h2>
          <p className="mb-8 text-lg text-gray-600 dark:text-gray-400">DEAR USER / ADMIN</p>
          <button
            onClick={handleEnter}
            className="bg-gradient-to-r from-pink-500 to-yellow-500 hover:from-pink-600 hover:to-yellow-600 text-white font-bold py-3 px-8 rounded-full shadow-lg transform hover:scale-105 transition-transform duration-300"
          >
            Enter
          </button>
        </div>
      </div>
    </div>
  );
};

export default WelcomeModal;

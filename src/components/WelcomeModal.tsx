import React, { useState, useEffect } from "react";
import "./WelcomeModal.css";

const WelcomeModal: React.FC = () => {
  const [showWelcome, setShowWelcome] = useState(false);
  const [showPrivacy, setShowPrivacy] = useState(false);
  const [accepted, setAccepted] = useState(false);

  useEffect(() => {
    const hasSeenWelcome = sessionStorage.getItem("hasSeenWelcomeModal");
    const hasAcceptedPrivacy = sessionStorage.getItem("hasAcceptedPrivacy");

    // Show welcome if never seen
    if (!hasSeenWelcome) {
      setShowWelcome(true);
    } else if (!hasAcceptedPrivacy) {
      // If welcome done but privacy not accepted, show privacy directly
      setShowPrivacy(true);
    }
  }, []);

  const handleEnterWelcome = () => {
    setShowWelcome(false);
    sessionStorage.setItem("hasSeenWelcomeModal", "true");
    setTimeout(() => setShowPrivacy(true), 300); // small delay for smooth transition
  };

  const handleAcceptPrivacy = () => {
    if (!accepted) return; // prevent entering without ticking checkbox
    setShowPrivacy(false);
    sessionStorage.setItem("hasAcceptedPrivacy", "true");
    // ✅ Now user can fully enter the site
  };

  return (
    <>
      {/* Welcome Modal */}
      {showWelcome && (
        <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50">
          <div className="bg-gradient-to-r from-pink-500 to-yellow-500 p-1 rounded-lg shadow-2xl animate-fade-in-down">
            <div className="bg-white dark:bg-gray-800 p-8 rounded-lg text-center">
              <h2 className="text-4xl font-extrabold mb-4 text-transparent bg-clip-text bg-gradient-to-r from-pink-500 to-yellow-500 animate-pulse">
                WELCOME TO OUR PLATFORM 🏦 "CIVIC REPORT"
              </h2>
              <p className="mb-8 text-lg text-gray-600 dark:text-gray-400">
                DEAR USER / ADMIN
              </p>
              <button
                onClick={handleEnterWelcome}
                className="bg-gradient-to-r from-pink-500 to-yellow-500 hover:from-pink-600 hover:to-yellow-600 text-white font-bold py-3 px-8 rounded-full shadow-lg transform hover:scale-105 transition-transform duration-300"
              >
                Enter
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Privacy Policy Modal */}
      {showPrivacy && (
        <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50">
          <div className="bg-gradient-to-r from-blue-500 to-green-500 p-1 rounded-lg shadow-2xl animate-fade-in-down w-[90%] max-w-lg">
            <div className="bg-white dark:bg-gray-800 p-8 rounded-lg text-center space-y-6">
              <h2 className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-500 to-green-500">
                Privacy Policy
              </h2>
              <p className="text-gray-600 dark:text-gray-300 text-sm leading-relaxed max-h-48 overflow-y-auto">
                By using Civic Report, you agree to the collection and use of
                your information in accordance with this policy. Your data will
                only be used for improving community services and will not be
                shared with unauthorized third parties. Please review carefully
                before proceeding.
              </p>

              <div className="flex items-center justify-center gap-2">
                <input
                  type="checkbox"
                  id="accept"
                  checked={accepted}
                  onChange={(e) => setAccepted(e.target.checked)}
                  className="h-4 w-4 text-blue-600"
                />
                <label htmlFor="accept" className="text-gray-700 dark:text-gray-300 text-sm">
                  I have read and accept the Privacy Policy
                </label>
              </div>

              <button
                onClick={handleAcceptPrivacy}
                disabled={!accepted}
                className={`w-full py-3 rounded-full font-bold transition-all duration-300 shadow-lg ${
                  accepted
                    ? "bg-gradient-to-r from-blue-500 to-green-500 text-white hover:scale-105"
                    : "bg-gray-400 text-gray-200 cursor-not-allowed"
                }`}
              >
                Accept & Continue
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default WelcomeModal;

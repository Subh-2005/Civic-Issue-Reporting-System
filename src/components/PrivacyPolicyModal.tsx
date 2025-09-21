import React, { useState } from 'react';

interface PrivacyPolicyModalProps {
  onAgree: () => void;
}

const PrivacyPolicyModal: React.FC<PrivacyPolicyModalProps> = ({ onAgree }) => {
  const [isChecked, setIsChecked] = useState(false);

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 backdrop-blur-sm flex items-center justify-center z-50">
      <div className="bg-white/30 dark:bg-gray-800/30 backdrop-blur-lg p-8 rounded-lg text-center max-w-lg">
        <h2 className="text-2xl font-bold mb-4">Privacy Policy</h2>
        <p className="mb-4 text-left">
          Your privacy is important to us. It is our policy to respect your privacy regarding any information we may collect from you across our website, and other sites we own and operate.
        </p>
        <p className="mb-4 text-left">
          We only ask for personal information when we truly need it to provide a service to you. We collect it by fair and lawful means, with your knowledge and consent. We also let you know why we’re collecting it and how it will be used.
        </p>
        <div className="flex items-center justify-center mb-4">
          <input
            type="checkbox"
            id="privacy-agree"
            checked={isChecked}
            onChange={() => setIsChecked(!isChecked)}
            className="mr-2"
          />
          <label htmlFor="privacy-agree">I agree to the Privacy Policy</label>
        </div>
        <button
          onClick={onAgree}
          disabled={!isChecked}
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded disabled:bg-gray-400"
        >
          Continue
        </button>
      </div>
    </div>
  );
};

export default PrivacyPolicyModal;
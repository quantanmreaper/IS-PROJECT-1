import React from "react";

const TutorRegistrationModal = ({ isOpen, onClose, onConfirm }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white rounded-2xl shadow-lg w-full max-w-md p-6 relative">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 text-xl"
        >
          &times;
        </button>

        {/* Title */}
        <h2 className="text-2xl font-semibold text-center mb-2">
          Do you want to become a tutor?
        </h2>

        {/* Description */}
        <p className="text-center text-gray-600 mb-6">
          As a tutor, you'll help fellow students, gain experience, and even earn rewards. It only takes a minute to register.
        </p>

        {/* Action Buttons */}
        <div className="flex flex-col gap-3">
          <button
            onClick={onConfirm}
            className="bg-blue-600 text-white rounded-xl px-4 py-2 hover:bg-blue-700 transition"
          >
            ✅ Yes, I want to register as a tutor
          </button>
          <button
            onClick={onClose}
            className="border border-gray-300 text-gray-700 rounded-xl px-4 py-2 hover:bg-gray-100 transition"
          >
            ❌ No, maybe later
          </button>
        </div>

        {/* Optional Extra Info */}
        <div className="mt-6 text-sm text-gray-500 text-center">
          <p><strong>What does being a tutor involve?</strong></p>
          <ul className="mt-2 space-y-1">
            <li>• Help students in 1-on-1 or group sessions</li>
            <li>• Choose your own availability and subjects</li>
            <li>• Earn experience and recognition</li>
          </ul>
        </div>

        {/* Footer Note */}
        <div className="mt-6 text-xs text-center text-gray-400">
          You can always become a tutor later from your profile settings.
        </div>
      </div>
    </div>
  );
};

export default TutorRegistrationModal;

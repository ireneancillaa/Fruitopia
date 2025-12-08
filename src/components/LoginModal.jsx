import React from "react";
import ReactDOM from "react-dom";

const LoginModal = ({ show, onClose }) => {
  if (!show) return null;

  // Render modal ke document.body agar full-page overlay
  return ReactDOM.createPortal(
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
      <div className="bg-white p-6 rounded-xl shadow-lg max-w-sm w-full text-center">
        <h2 className="text-xl font-bold mb-4">Log In Required</h2>
        <p className="mb-6">Log in to add items into your cart</p>
        <button
          onClick={onClose}
          className="px-6 py-2 rounded bg-[#007E6E] text-white hover:bg-[#005d52]"
        >
          OK
        </button>
      </div>
    </div>,
    document.body
  );
};

export default LoginModal;

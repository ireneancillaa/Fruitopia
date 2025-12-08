import React, { useState } from "react";
import { useAuth } from "../hooks/useAuthHook";
import LoginModal from "../components/LoginModal";
import { useDiscount } from "../context/DiscountContext";

const Banner = ({ data }) => {
  const { user } = useAuth();
  const { applyDiscount } = useDiscount();
  const [showLoginModal, setShowLoginModal] = useState(false);
  const [notification, setNotification] = useState(null);
  const [fading, setFading] = useState(false);

  const handleClaim = () => {
    if (!user) {
      setShowLoginModal(true);
      return;
    }

    applyDiscount("Pineapple", 25, 18000);

    // Tampilkan notifikasi
    setNotification("Pineapple discount claimed!");
    setFading(false);

    // Mulai fade out setelah 2 detik
    setTimeout(() => setFading(true), 2000);

    // Hapus notifikasi setelah fade out selesai (misal 500ms)
    setTimeout(() => setNotification(null), 2500);
  };

  return (
    <div className="container mx-auto px-1 md:px-2 max-w-screen-2xl">
      <div
        style={{ backgroundColor: data.bgColor }}
        className="grid grid-cols-1 md:grid-cols-3 gap-6 items-center text-black rounded-3xl"
      >
        {/* Konten banner */}
        <div className="p-6 sm:p-8">
          <p className="text-sm">{data.discount}</p>
          <h1 className="uppercase text-4xl lg:text-7xl font-bold">
            {data.title}
          </h1>
          <p className="text-sm">{data.date}</p>
        </div>
        <div className="h-full flex items-center">
          <img
            src={data.image}
            className="scale-125 w-[250px] md:w-[340px] mx-auto drop-shadow-[-8px_4px_6px_rgba(0,0,0,.4)] object-contain"
          />
        </div>
        <div className="flex flex-col justify-center gap-4 p-6 sm:p-8">
          <p className="font-bold text-xl">{data.title2}</p>
          <p className="text-3xl sm:text-5xl font-bold">{data.title3}</p>
          <p className="text-sm tracking-wide leading-5">{data.title4}</p>
          <div>
            <button
              onClick={handleClaim}
              className="px-4 py-2 text-lg font-semibold border border-[#007E6E] text-[#007E6E] rounded-full transition-all duration-300 hover:bg-[#007E6E] hover:text-white"
            >
              Claim Now
            </button>
          </div>
        </div>
      </div>

      {/* Notification modal dengan fade out */}
      {notification && (
        <div
          className={`fixed inset-0 z-50 flex items-center justify-center pointer-events-none transition-opacity duration-500 ${
            fading ? "opacity-0" : "opacity-100"
          }`}
        >
          <div className="bg-green-500 text-white px-8 py-5 rounded-lg shadow-2xl flex items-center gap-3">
            <div className="text-3xl">✓</div>
            <div>
              <p className="font-semibold text-lg">{notification}</p>
            </div>
          </div>
        </div>
      )}

      {/* Login modal */}
      <LoginModal
        show={showLoginModal}
        onClose={() => setShowLoginModal(false)}
      />
    </div>
  );
};

export default Banner;

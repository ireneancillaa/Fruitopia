import React, { useState } from "react";
import Logo from "../assets/logo.svg";
import Login from "./Login";
import Register from "./Register";
import { useAuth } from "../hooks/useAuthHook";
import { FiShoppingCart } from "react-icons/fi";
import { Link, useLocation } from "react-router-dom";

const MenuLinks = [
  { id: 1, name: "Home", link: "/" },
  { id: 2, name: "Shop", link: "/shop" },
  { id: 3, name: "Testimonials", link: "/testimonials" },
  { id: 4, name: "Contact", link: "/contact" },
];

const Navbar = () => {
  const [showLogin, setShowLogin] = useState(false);
  const [showRegister, setShowRegister] = useState(false);
  const { isAuthenticated, user, logout } = useAuth();
  const location = useLocation();

  // Dummy cart items count
  const getTotalItems = () => 0;

  const handleCartClick = () => {
    if (!isAuthenticated) {
      setShowLogin(true);
    } else {
      window.location.href = "/cart";
    }
  };

  const visibleMenuLinks = isAuthenticated
    ? MenuLinks
    : MenuLinks.filter((l) => l.id <= 2);

  return (
    <>
      <nav className="bg-white sticky top-0 z-50">
        <div className="container mx-auto px-1 md:px-2 max-w-screen-2xl">
          <div className="flex items-center py-4 w-full">
            <a href="#" className="flex items-center gap-4">
              <img src={Logo} alt="Logo" className="h-8 w-8 sm:h-10 sm:w-10" />
              <span className="font-black tracking-widest text-2xl uppercase">
                FRUITOPIA
              </span>
            </a>

            <div className="flex-1 hidden lg:flex justify-center">
              <ul className="flex items-center gap-6">
                {visibleMenuLinks.map((item) => (
                  <li key={item.id}>
                    <Link
                      to={item.link}
                      className={`relative font-medium text-sm pb-1 transition-all duration-200 after:content-[''] after:absolute after:bottom-0 after:left-0 after:h-0.5 after:transition-all after:duration-200 ${
                        location.pathname === item.link
                          ? "text-[#007E6E] after:w-full after:bg-[#007E6E]"
                          : "text-black hover:text-[#007E6E] after:w-0 after:bg-[#007E6E] hover:after:w-full"
                      }`}
                    >
                      {item.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            <div className="flex items-center gap-4">
              <button
                onClick={handleCartClick}
                title="Shopping Cart"
                className="text-2xl hover:text-[#007E6E] transition relative"
                aria-label="Cart"
              >
                <FiShoppingCart className="h-6 w-6" />
                {getTotalItems() > 0 && (
                  <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center">
                    {getTotalItems()}
                  </span>
                )}
              </button>

              {isAuthenticated ? (
                <>
                  <span className="text-sm text-[#007E6E] font-semibold">
                    Hi, {user?.name}!
                  </span>
                  <button
                    onClick={logout}
                    className="px-3 py-2 bg-[#007E6E] text-white rounded-md text-sm font-semibold hover:bg-[#006456] transition"
                  >
                    Logout
                  </button>
                </>
              ) : (
                <>
                  <button
                    onClick={() => setShowLogin(true)}
                    className="px-3 py-2 bg-gray-200 text-black border border-[#007E6E] rounded-md text-sm font-semibold hover:bg-[#a5c1bd] transition"
                  >
                    Login
                  </button>

                  <button
                    onClick={() => setShowRegister(true)}
                    className="px-3 py-2 bg-[#007E6E] text-white rounded-md text-sm font-semibold hover:bg-[#006456] transition"
                  >
                    Register
                  </button>
                </>
              )}
            </div>
          </div>
        </div>
      </nav>

      {showLogin && (
        <Login
          onClose={() => setShowLogin(false)}
          switchToRegister={() => {
            setShowLogin(false);
            setShowRegister(true);
          }}
        />
      )}

      {showRegister && (
        <Register
          onClose={() => setShowRegister(false)}
          switchToLogin={() => {
            setShowRegister(false);
            setShowLogin(true);
          }}
        />
      )}
    </>
  );
};

export default Navbar;

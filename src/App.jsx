import React from "react";
import { Routes, Route } from "react-router-dom";

import Navbar from "./components/Navbar";
import HomePage from "./components/HomePage";
import Shop from "./components/Shop";
import Cart from "./components/Cart";
import Testimonials from "./components/Testimonials";
import Contact from "./components/Contact";
import Footer from "./components/Footer";

import AuthProvider from "./context/AuthProvider";
import { DiscountProvider } from "./context/DiscountContext";

const App = () => {
  return (
    <AuthProvider>
      <DiscountProvider>
        <Navbar />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/shop" element={<Shop />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/testimonials" element={<Testimonials />} />
          <Route path="/contact" element={<Contact />} />
        </Routes>
        <Footer />
      </DiscountProvider>
    </AuthProvider>
  );
};

export default App;

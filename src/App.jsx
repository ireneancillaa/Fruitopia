import React from 'react'
import Navbar from './components/Navbar'
import HomePage from './components/HomePage.jsx'
import Shop from "./components/Shop.jsx"
import Cart from './components/Cart.jsx'
import Testimonials from './components/Testimonials.jsx'
import Contact from './components/Contact.jsx'
import Footer from './components/Footer.jsx'
import { AuthProvider } from './hooks/useAuth.js'
import { CartProvider } from './context/CartContext.jsx'
import { Routes, Route } from "react-router-dom"
import { BrowserRouter } from "react-router-dom"

const App = () => {
  return (
    <AuthProvider>
      <CartProvider>
        <Navbar />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/shop" element={<Shop />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/testimonials" element={<Testimonials />} />
          <Route path="/contact" element={<Contact />} />
        </Routes>
        <Footer />
      </CartProvider>
    </AuthProvider>
  );
}

export default App

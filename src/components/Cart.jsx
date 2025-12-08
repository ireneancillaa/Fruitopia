import React from "react";
import { Link } from "react-router-dom";
import { FaShoppingCart, FaTrash, FaArrowLeft } from "react-icons/fa";

const cartStyles = `
  @keyframes fadeInUp {
    from { opacity: 0; transform: translateY(30px); }
    to { opacity: 1; transform: translateY(0); }
  }

  .cart-container { animation: fadeInUp 0.6s ease-out; }
  .cart-item { animation: fadeInUp 0.6s ease-out; transition: all 0.3s ease; }
  .cart-item:hover { transform: translateY(-4px); box-shadow: 0 8px 16px rgba(0, 126, 110, 0.1); }
  .quantity-btn { transition: all 0.2s ease; }
  .quantity-btn:hover { background-color: #005d52; color: white; }
`;

// Dummy data untuk tampilan UI
const dummyCart = [
  {
    id: 1,
    name: "Apple",
    price: 26000,
    quantity: 2,
    image_url: "https://via.placeholder.com/150",
  },
  {
    id: 2,
    name: "Banana",
    price: 15000,
    quantity: 3,
    image_url: "https://via.placeholder.com/150",
  },
];

const Cart = () => {
  const cart = dummyCart;
  const getTotalItems = () =>
    cart.reduce((sum, item) => sum + item.quantity, 0);
  const getTotalPrice = () =>
    cart.reduce((sum, item) => sum + item.price * item.quantity, 0);

  if (cart.length === 0) {
    return (
      <>
        <style>{cartStyles}</style>
        <div className="min-h-screen bg-white py-12">
          <div className="container mx-auto px-4">
            <div className="flex items-center gap-2 mb-8">
              <Link
                to="/"
                className="flex items-center gap-2 text-[#007E6E] hover:text-[#005d52]"
              >
                <FaArrowLeft /> Back Home
              </Link>
            </div>
            <div className="text-center py-20">
              <div className="inline-block p-6 bg-gray-100 rounded-full mb-6">
                <FaShoppingCart size={60} className="text-gray-400" />
              </div>
              <h1 className="text-4xl font-bold text-gray-900 mb-4">
                Your Cart is Empty
              </h1>
              <p className="text-gray-600 text-lg mb-8 max-w-md mx-auto">
                Looks like you haven't added any items to your cart yet.
              </p>
              <Link
                to="/shop"
                className="inline-block bg-[#007E6E] hover:bg-[#005d52] text-white font-bold py-3 px-8 rounded-lg transition-colors duration-200"
              >
                Continue Shopping
              </Link>
            </div>
          </div>
        </div>
      </>
    );
  }

  return (
    <>
      <style>{cartStyles}</style>
      <div className="min-h-screen bg-white py-12">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between mb-8">
            <div>
              <h1 className="text-4xl font-bold text-black mb-2">
                Shopping Cart
              </h1>
              <p className="text-gray-600">
                {getTotalItems()} items in your cart
              </p>
            </div>
            <Link
              to="/shop"
              className="flex items-center gap-2 bg-[#007E6E] hover:bg-[#005d52] text-white font-semibold py-3 px-6 rounded-lg transition-colors duration-200"
            >
              <FaArrowLeft /> Continue Shopping
            </Link>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2 space-y-4">
              {cart.map((item, index) => (
                <div
                  key={item.id}
                  className="cart-item bg-white border border-gray-200 rounded-2xl p-6 flex gap-6"
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
                  <div className="w-32 h-32 bg-gray-100 rounded-xl overflow-hidden shrink-0">
                    <img
                      src={item.image_url}
                      alt={item.name}
                      className="w-full h-full object-cover"
                    />
                  </div>

                  <div className="flex-1">
                    <div className="flex justify-between items-start mb-3">
                      <div>
                        <h3 className="text-xl font-bold text-gray-900">
                          {item.name}
                        </h3>
                        <p className="text-[#007E6E] font-semibold text-lg">
                          Rp {new Intl.NumberFormat("id-ID").format(item.price)}
                        </p>
                      </div>
                      <button className="text-red-500 hover:text-red-700 transition-colors p-2">
                        <FaTrash size={20} />
                      </button>
                    </div>

                    <div className="flex items-center gap-3">
                      <span className="text-gray-600 text-sm">Quantity:</span>
                      <button className="quantity-btn bg-gray-200 text-gray-800 font-bold py-1 px-3 rounded-lg">
                        −
                      </button>
                      <span className="w-8 text-center font-semibold">
                        {item.quantity}
                      </span>
                      <button className="quantity-btn bg-gray-200 text-gray-800 font-bold py-1 px-3 rounded-lg">
                        +
                      </button>
                    </div>

                    <div className="mt-4 pt-4 border-t border-gray-200">
                      <p className="text-gray-600 text-sm">
                        Subtotal:{" "}
                        <span className="font-bold text-[#007E6E]">
                          Rp{" "}
                          {new Intl.NumberFormat("id-ID").format(
                            item.price * item.quantity
                          )}
                        </span>
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div className="lg:col-span-1 bg-gradient-to-br from-[#007E6E] to-[#005d52] rounded-2xl p-8 text-white sticky top-24">
              <h2 className="text-2xl font-bold mb-6">Order Summary</h2>
              <div className="flex justify-between mb-4 pb-4 border-b border-white/20">
                <span>Subtotal ({getTotalItems()} items)</span>
                <span className="font-semibold">
                  Rp {new Intl.NumberFormat("id-ID").format(getTotalPrice())}
                </span>
              </div>
              <div className="flex justify-between mb-4 pb-4 border-b border-white/20">
                <span>Shipping</span>
                <span className="font-semibold text-green-300">FREE</span>
              </div>
              <div className="flex justify-between mb-6 pb-6 border-b border-white/20">
                <span>Tax (10%)</span>
                <span className="font-semibold">
                  Rp{" "}
                  {new Intl.NumberFormat("id-ID").format(getTotalPrice() * 0.1)}
                </span>
              </div>
              <div className="flex justify-between items-center mb-8">
                <span className="text-xl font-bold">Total</span>
                <span className="text-3xl font-bold">
                  Rp{" "}
                  {new Intl.NumberFormat("id-ID").format(getTotalPrice() * 1.1)}
                </span>
              </div>
              <button className="w-full bg-white text-[#007E6E] hover:bg-gray-100 font-bold py-4 px-6 rounded-xl flex items-center justify-center gap-2">
                <FaShoppingCart /> Proceed to Checkout
              </button>
              <p className="text-sm text-gray-200 text-center mt-6">
                ✓ Free shipping on orders over Rp 100,000
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Cart;

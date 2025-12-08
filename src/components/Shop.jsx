import { useEffect, useState } from "react";
import supabase from "../utils/supabase";
import { useAuth } from "../hooks/useAuthHook";
import { FaShoppingCart, FaTimes } from "react-icons/fa";

const shopStyles = `
// ... tetap pakai semua CSS yang sama
`;

function Shop() {
  const { user } = useAuth();
  const [fruits, setFruits] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedFruit, setSelectedFruit] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const [hoveredId, setHoveredId] = useState(null);
  const [notification, setNotification] = useState(null);
  const [visibleCards, setVisibleCards] = useState({});

  useEffect(() => {
    async function fetchFruits() {
      const { data, error } = await supabase.from("fruits").select("*");

      if (error) {
        console.error(error);
        return;
      }

      setFruits(data);
      setLoading(false);
    }

    fetchFruits();
  }, []);

  // Setup scroll animation observer
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setVisibleCards((prev) => ({ ...prev, [entry.target.id]: true }));
          }
        });
      },
      { threshold: 0.1 }
    );

    const cards = document.querySelectorAll("[data-fruit-id]");
    cards.forEach((card) => observer.observe(card));

    return () => {
      cards.forEach((card) => observer.unobserve(card));
    };
  }, [fruits]);

  const showNotification = (fruitName) => {
    setNotification(fruitName);
    setTimeout(() => setNotification(null), 3000);
  };

  // Dummy functions pengganti addToCart
  const handleAddToCart = (fruit) => {
    if (!user) {
      alert("Please login first");
      return;
    }
    showNotification(fruit.name);
    setSelectedFruit(null);
    setQuantity(1);
  };

  const handleQuickAddToCart = (fruit) => {
    if (!user) {
      alert("Please login first");
      return;
    }
    showNotification(fruit.name);
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-[#007E6E]"></div>
          <p className="text-gray-600 mt-4">Loading products...</p>
        </div>
      </div>
    );
  }

  return (
    <>
      <style>{shopStyles}</style>

      <div className="w-full px-10 sm:px-10 mx-auto">
        {/* Notification Toast */}
        {notification && (
          <div className="notification fixed inset-0 z-40 flex items-center justify-center pointer-events-none">
            <div className="bg-green-500 text-white px-8 py-5 rounded-lg shadow-2xl flex items-center gap-3">
              <div className="text-3xl">✓</div>
              <div>
                <p className="font-semibold text-lg">
                  {notification} added to cart!
                </p>
              </div>
            </div>
          </div>
        )}

        <div
          className={`shop-container min-h-screen bg-white py-12 ${
            selectedFruit ? "modal-open" : ""
          }`}
        >
          <div className="container mx-auto px-4">
            {/* Header */}
            <div className="shop-header text-center mb-12">
              <h1 className="text-4xl lg:text-5xl font-bold text-black mb-4">
                Our Shop
              </h1>
              <p className="text-gray-600 text-lg max-w-2xl mx-auto">
                Browse our finest selection of fresh, premium quality fruits
                sourced directly from trusted growers.
              </p>
            </div>

            {/* Product Grid */}
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
              {fruits.map((fruit, index) => (
                <div
                  key={fruit.id}
                  id={`fruit-${fruit.id}`}
                  data-fruit-id={fruit.id}
                  className={`product-card product-card-scroll product-card-hover bg-white rounded-2xl overflow-hidden shadow-lg cursor-pointer group loaded-${
                    (index % 12) + 1
                  } ${visibleCards[`fruit-${fruit.id}`] ? "visible" : ""}`}
                  onMouseEnter={() => setHoveredId(fruit.id)}
                  onMouseLeave={() => setHoveredId(null)}
                >
                  <div className="relative w-full h-48 bg-gray-100 overflow-hidden">
                    <img
                      src={fruit.image_url}
                      alt={fruit.name}
                      className="w-full h-full scale-120 object-contain group-hover:scale-110 transition-transform duration-300"
                    />
                    {hoveredId === fruit.id && (
                      <div className="absolute inset-0 bg-[#007E6E] bg-opacity-70 flex flex-col items-center justify-center gap-3 transition-all duration-300">
                        <button
                          onClick={() => setSelectedFruit(fruit)}
                          className="bg-white text-[#007E6E] font-semibold py-3 px-6 rounded-lg hover:bg-gray-100 transition-all duration-200 flex items-center gap-2"
                        >
                          <FaShoppingCart size={18} /> View Details
                        </button>
                      </div>
                    )}
                  </div>

                  <div className="p-4">
                    <h3 className="text-lg font-bold text-gray-900 mb-2 line-clamp-2">
                      {fruit.name}
                    </h3>
                    <p className="text-sm text-gray-600 mb-3 line-clamp-2">
                      {fruit.description}
                    </p>
                    <div className="flex justify-between items-center">
                      <span className="text-xl font-bold text-[#007E6E]">
                        Rp {new Intl.NumberFormat("id-ID").format(fruit.price)}
                      </span>
                      <button
                        onClick={() => handleQuickAddToCart(fruit)}
                        className="bg-[#007E6E] text-white p-2 rounded-lg hover:bg-[#005d52] transition-colors duration-200"
                        title="Add to cart"
                      >
                        <FaShoppingCart size={16} />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Modal */}
      {selectedFruit && (
        <div className="modal-overlay fixed inset-0 z-50 flex items-center justify-center p-4 backdrop-blur-md bg-white/40">
          <div className="modal-content bg-white rounded-2xl shadow-2xl max-w-md w-full overflow-hidden">
            <div className="bg-linear-to-r from-[#007E6E] to-[#005d52] p-6 text-white flex items-center justify-between">
              <h2 className="text-2xl font-bold">{selectedFruit.name}</h2>
              <button
                onClick={() => {
                  setSelectedFruit(null);
                  setQuantity(1);
                }}
                className="text-white hover:text-gray-200 transition-colors duration-200 text-2xl font-bold"
              >
                ✕
              </button>
            </div>

            <div className="p-6">
              <img
                src={selectedFruit.image_url}
                alt={selectedFruit.name}
                className="w-full h-56 object-contain scale-120 rounded-xl mb-4"
              />
              <p className="text-gray-700 text-sm mb-4">
                {selectedFruit.description}
              </p>
              <div className="mb-6">
                <p className="text-gray-600 text-sm mb-2">Price</p>
                <p className="text-3xl font-bold text-[#007E6E]">
                  Rp{" "}
                  {new Intl.NumberFormat("id-ID").format(selectedFruit.price)}
                </p>
              </div>
              <div className="mb-6">
                <p className="text-gray-600 text-sm mb-3">Quantity</p>
                <div className="flex items-center gap-3">
                  <button
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    className="bg-gray-200 hover:bg-gray-300 text-gray-800 font-bold py-2 px-4 rounded-lg transition-colors"
                  >
                    −
                  </button>
                  <input
                    type="number"
                    value={quantity}
                    onChange={(e) =>
                      setQuantity(Math.max(1, parseInt(e.target.value) || 1))
                    }
                    className="w-16 text-center border border-gray-300 rounded-lg py-2 font-semibold focus:outline-none focus:border-[#007E6E]"
                  />
                  <button
                    onClick={() => setQuantity(quantity + 1)}
                    className="bg-gray-200 hover:bg-gray-300 text-gray-800 font-bold py-2 px-4 rounded-lg transition-colors"
                  >
                    +
                  </button>
                </div>
              </div>

              <div className="flex gap-3">
                <button
                  onClick={() => {
                    setSelectedFruit(null);
                    setQuantity(1);
                  }}
                  className="flex-1 bg-gray-200 hover:bg-gray-300 text-gray-800 font-bold py-3 rounded-lg transition-colors duration-200"
                >
                  Cancel
                </button>
                <button
                  onClick={() => handleAddToCart(selectedFruit)}
                  className="flex-1 bg-[#007E6E] hover:bg-[#005d52] text-white font-bold py-3 rounded-lg transition-colors duration-200 flex items-center justify-center gap-2"
                >
                  <FaShoppingCart size={18} /> Add to Cart
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default Shop;

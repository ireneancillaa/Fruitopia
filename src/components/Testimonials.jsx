import React, { useState, useEffect } from "react";
import supabase from "../utils/supabase";
import { useAuth } from "../hooks/useAuthHook";

const Testimonials = () => {
  const { user, isAuthenticated } = useAuth();
  const [testimonials, setTestimonials] = useState([]);
  const [message, setMessage] = useState("");
  const [rating, setRating] = useState(5);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [deleteId, setDeleteId] = useState(null);

  // Fetch testimonials dari view
  const fetchTestimonials = async () => {
    setLoading(true);
    const { data, error } = await supabase
      .from("testimonials_with_user")
      .select("*")
      .order("created_at", { ascending: false });

    if (error) {
      console.error(error);
      setError("Failed to fetch testimonials");
    } else {
      setTestimonials(data);
    }
    setLoading(false);
  };

  useEffect(() => {
    const fetchData = async () => {
      await fetchTestimonials();
    };
    fetchData();
  }, []);

  // Submit testimonial
  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    if (!isAuthenticated) {
      setError("You must be logged in to submit a testimonial");
      return;
    }
    if (!message.trim()) {
      setError("Please write a message");
      return;
    }

    setLoading(true);
    const { error } = await supabase.from("testimonials").insert([
      {
        message: message.trim(),
        rating: parseInt(rating),
      },
    ]);

    if (error) {
      console.error(error);
      setError("Failed to submit testimonial");
      setLoading(false);
    } else {
      setMessage("");
      setRating(5);
      fetchTestimonials(); // refresh list
    }
  };

  // Delete testimonial
  const handleDeleteClick = (id, userId) => {
    if (user?.id !== userId) {
      alert("You can only delete your own testimonial");
      return;
    }
    setDeleteId(id);
    setShowDeleteModal(true);
  };

  const confirmDelete = async () => {
    setLoading(true);
    const { error } = await supabase
      .from("testimonials")
      .delete()
      .eq("id", deleteId)
      .eq("user_id", user.id);

    if (error) {
      console.error(error);
      setError("Failed to delete testimonial");
    } else {
      setTestimonials(testimonials.filter((t) => t.id !== deleteId));
    }
    setShowDeleteModal(false);
    setDeleteId(null);
    setLoading(false);
  };

  const cancelDelete = () => {
    setShowDeleteModal(false);
    setDeleteId(null);
  };

  return (
    <div className="container mx-auto px-4 py-20">
      <div className="text-center mb-10">
        <h1 className="text-4xl font-bold text-black mb-2">
          Customer Testimonials
        </h1>
        <p className="text-gray-500">
          Hear what our satisfied customers have to say about Fruitopia
        </p>
      </div>

      {/* Form Submit Testimonial */}
      {isAuthenticated ? (
        <div className="max-w-2xl mx-auto bg-white border border-gray-200 rounded-lg p-6 mb-10 shadow">
          <h3 className="text-xl font-semibold mb-4 text-[#007E6E]">
            Share Your Experience
          </h3>

          {error && (
            <div className="mb-4 p-3 bg-red-100 border border-red-400 text-red-700 rounded-md text-sm">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Rating
              </label>
              <select
                value={rating}
                onChange={(e) => setRating(e.target.value)}
                className="w-full px-4 py-2 pl-3 pr-10 border border-gray-300 rounded-md focus:outline-none focus:border-[#007E6E]"
              >
                {[1, 2, 3, 4, 5].map((r) => (
                  <option key={r} value={r}>
                    {r} ⭐
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Your Message
              </label>
              <textarea
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder="Share your experience with us..."
                rows="4"
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-[#007E6E]"
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-[#007E6E] text-white font-semibold py-2 rounded-md hover:bg-[#006456] transition disabled:opacity-50"
            >
              {loading ? "Submitting..." : "Submit Testimonial"}
            </button>
          </form>
        </div>
      ) : (
        <div className="max-w-2xl mx-auto bg-blue-50 border border-blue-200 rounded-lg p-6 mb-10 text-center">
          <p className="text-blue-800">Please log in to submit a testimonial</p>
        </div>
      )}

      {/* Display Testimonials */}
      {loading ? (
        <div className="text-center py-10">Loading testimonials...</div>
      ) : (
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {testimonials.length > 0 ? (
            testimonials.map((testi) => (
              <div
                key={testi.id}
                className="bg-gray-100 p-6 rounded-lg shadow relative"
              >
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center flex-1">
                    <div className="w-12 h-12 bg-[#007E6E] rounded-full mr-4 flex items-center justify-center text-white font-bold">
                      {testi.display_name?.charAt(0).toUpperCase()}
                    </div>
                    <div>
                      <h3 className="font-semibold">{testi.display_name}</h3>
                      <p className="text-sm text-gray-500">
                        {new Date(testi.created_at).toLocaleDateString()}
                      </p>
                    </div>
                  </div>

                  {user?.id === testi.user_id && (
                    <button
                      onClick={() => handleDeleteClick(testi.id, testi.user_id)}
                      className="text-red-600 hover:text-red-800 text-lg"
                      title="Delete"
                    >
                      ✕
                    </button>
                  )}
                </div>

                <div className="text-yellow-400 mb-2">
                  {"★".repeat(testi.rating)}
                  {"☆".repeat(5 - testi.rating)}
                </div>

                <p className="text-gray-600 text-sm">{testi.message}</p>
              </div>
            ))
          ) : (
            <div className="col-span-full text-center py-10">
              <p className="text-gray-500">
                No testimonials yet. Be the first to share your experience!
              </p>
            </div>
          )}
        </div>
      )}

      {/* Delete Confirmation Modal */}
      {showDeleteModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 w-full max-w-md shadow-lg">
            <h3 className="text-lg font-semibold text-gray-900 mb-2">
              Delete Testimonial
            </h3>
            <p className="text-gray-600 mb-6">
              Are you sure you want to delete this testimonial? This action
              cannot be undone.
            </p>

            <div className="flex gap-3 justify-end">
              <button
                onClick={cancelDelete}
                className="px-4 py-2 bg-gray-200 text-gray-800 rounded-md hover:bg-gray-300 transition"
              >
                Cancel
              </button>
              <button
                onClick={confirmDelete}
                className="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 transition"
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Testimonials;

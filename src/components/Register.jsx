import React, { useState } from "react";
import supabase from "../utils/supabase";
import { useAuth } from "../hooks/useAuthHook";

const Register = ({ onClose, switchToLogin }) => {
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const { setUser } = useAuth();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    if (password !== confirmPassword) {
      setError("Passwords do not match");
      return;
    }

    if (password.length < 6) {
      setError("Password must be at least 6 characters");
      return;
    }

    setLoading(true);

    try {
      // Supabase Signup
      const { data, error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          data: { fullName },
        },
      });

      if (error) throw error;

      const sessionUser = data.user;

      // Save profile to Supabase table
      await supabase.from("users").insert({
        uid: sessionUser.id,
        email: sessionUser.email,
        name: fullName,
        cart: [],
        createdAt: new Date().toISOString(),
      });

      setUser({
        uid: sessionUser.id,
        email: sessionUser.email,
        name: fullName,
        cart: [],
      });

      onClose();
    } catch (err) {
      setError(err.message || "Failed to register");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50">
      <div className="bg-white rounded-xl p-8 w-full max-w-md shadow-2xl">
        <h2 className="text-2xl font-bold text-[#007E6E] text-center mb-2">
          Create Account
        </h2>
        <p className="text-center text-sm text-gray-500 mb-6">
          Join us today and start shopping
        </p>

        {error && (
          <div className="mb-4 p-3 bg-red-100 border border-red-400 text-red-700 rounded-md text-sm">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium">Full Name</label>
            <input
              type="text"
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
              required
              disabled={loading}
              className="w-full px-3 py-2 border border-gray-200 rounded-md"
            />
          </div>

          <div>
            <label className="block text-sm font-medium">Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              disabled={loading}
              className="w-full px-3 py-2 border border-gray-200 rounded-md"
            />
          </div>

          <div>
            <label className="block text-sm font-medium">Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              disabled={loading}
              className="w-full px-3 py-2 border border-gray-200 rounded-md"
            />
          </div>

          <div>
            <label className="block text-sm font-medium">
              Confirm Password
            </label>
            <input
              type="password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
              disabled={loading}
              className="w-full px-3 py-2 border border-gray-200 rounded-md"
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full py-3 bg-[#007E6E] text-white rounded-md"
          >
            {loading ? "Creating Account..." : "Sign Up"}
          </button>
        </form>

        <p className="text-center text-sm text-gray-500 mt-4">
          Already have an account?{" "}
          <button
            onClick={switchToLogin}
            className="text-[#007E6E] font-medium underline"
            disabled={loading}
          >
            Log in here
          </button>
        </p>

        <button
          onClick={onClose}
          disabled={loading}
          className="mt-4 w-full py-2 bg-gray-100 text-gray-700 rounded-md"
        >
          Close
        </button>
      </div>
    </div>
  );
};

export default Register;

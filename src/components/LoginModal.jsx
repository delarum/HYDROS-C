import React, { useState } from "react";
import { useUser } from "../context/UserProvider";
import { loginUser } from "../services/authService";

function LoginModal({ closeModal }) {
  const { setUser } = useUser();
  const [email, setEmail] = useState("");

  async function handleSubmit(e) {
    e.preventDefault();

    try {
      const userData = await loginUser(email);
      setUser(userData);
      closeModal();
    } catch (error) {
      console.error("Login failed", error);
    }
  }

  return (
    <div className="fixed inset-0 z-[100]">
      <div className="absolute inset-0 bg-black/80 backdrop-blur-sm" onClick={closeModal}></div>

      <div className="relative min-h-screen flex items-center justify-center p-4">
        <div className="glass-panel w-full max-w-md rounded-2xl p-8">
          <h3 className="text-2xl font-semibold text-white mb-8">Sign In</h3>

          <form onSubmit={handleSubmit} className="space-y-6">
            <input
              type="email"
              required
              placeholder="Email Address"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="input-clean w-full px-4 py-3.5 rounded-lg text-gray-800"
            />

            <button
              type="submit"
              className="w-full bg-brand-500 hover:bg-brand-400 text-white font-semibold py-3.5 rounded-lg"
            >
              Sign In
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default LoginModal;
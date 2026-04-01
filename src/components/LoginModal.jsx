import React, { useState, useEffect } from "react";
import { useUser } from "../context/UserProvider";
import { loginUser } from "../services/authService";

function LoginModal({ closeModal }) {
  const { setUser } = useUser();
  const [email, setEmail] = useState("");
  const modalRef = React.useRef();

  useEffect(() => {
    setTimeout(() => {
      if (modalRef.current) {
        modalRef.current.classList.remove("scale-95", "opacity-0");
        modalRef.current.classList.add("scale-100", "opacity-100");
      }
    }, 10);
  }, []);

  

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
    <div className="fixed inset-0 z-100">
      <div 
        className="absolute inset-0 bg-black/80 backdrop-blur-sm" 
        onClick={closeModal}
      ></div>
      <div className="relative min-h-screen flex items-center justify-center p-4">
        <div 
          ref={modalRef}
          className="glass-panel w-full max-w-md rounded-2xl p-8 transform scale-95 opacity-0 transition-all duration-300"
        >
          <div className="flex justify-between items-center mb-8">
            <h3 className="text-2xl font-semibold text-white">Sign In</h3>
            <button onClick={closeModal} className="text-slate-400 hover:text-white transition-colors">
              <i className="fas fa-times"></i>
            </button>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-2">
              <label className="text-sm font-medium text-slate-300">Email Address</label>
              <input 
                type="email" 
                required
                className="input-clean w-full px-4 py-3.5 rounded-lg text-white placeholder-slate-500"
                placeholder="Enter your email"
              />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium text-slate-300">Password</label>
              <input 
                type="password" 
                required
                className="input-clean w-full px-4 py-3.5 rounded-lg text-white placeholder-slate-500"
                placeholder="Enter your password"
              />
            </div>

            <div className="flex items-center justify-between text-sm">
              <label className="flex items-center gap-2 text-slate-400 cursor-pointer">
                <input type="checkbox" className="rounded border-slate-600 bg-slate-800 w-4 h-4" />
                <span>Remember me</span>
              </label>
              <a href="#" className="text-brand-400 hover:text-brand-300">Forgot password?</a>
            </div>

            <button 
              type="submit"
              className="w-full bg-brand-500 hover:bg-brand-400 text-white font-semibold py-3.5 rounded-lg transition-colors"
            >
              Sign In
            </button>

            <div className="relative my-6">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-slate-700"></div>
              </div>
              <div className="relative flex justify-center text-xs">
                <span className="px-2 bg-slate-900 text-slate-400">Or continue with</span>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <button 
                type="button"
                className="flex items-center justify-center gap-2 py-3 border border-slate-600 rounded-lg hover:bg-slate-800 transition-colors text-sm text-slate-300"
              >
                <i className="fab fa-google text-red-500"></i>
                Google
              </button>
              <button 
                type="button"
                className="flex items-center justify-center gap-2 py-3 border border-slate-600 rounded-lg hover:bg-slate-800 transition-colors text-sm text-slate-300"
              >
                <i className="fas fa-mobile-alt text-brand-400"></i>
                Phone
              </button>
            </div>

            <p className="text-center text-sm text-slate-400">
              Don't have an account?{' '}
              <button type="button" className="text-brand-400 hover:text-brand-300 font-medium">
                Create account
              </button>
            </p>
          </form>
        </div>
      </div>
    </div>
  );
}


export default LoginModal;
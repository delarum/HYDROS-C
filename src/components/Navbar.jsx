import { useState } from "react";
import { Menu, X, LogOut } from "lucide-react";

function Navbar({ user, onLogout, onOpenLogin }) {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <header className="fixed top-0 left-0 w-full z-50 bg-ocean-900/85 backdrop-blur-md border-b border-white/10">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <nav className="h-20 flex items-center justify-between">
          
          {/* Logo */}
          <div className="flex items-center flex-shrink-0">
            <h1 className="text-2xl font-bold tracking-tight text-white">
              🌊 <span className="text-brand-400">HYDROS-C</span>
            </h1>
          </div>

          {/* Desktop Nav */}
          <ul className="hidden lg:flex items-center gap-10 text-sm font-medium text-slate-200">
            <li>
              <a href="/" className="hover:text-brand-400 transition-colors">
                Home
              </a>
            </li>
            <li>
              <a href="/about" className="hover:text-brand-400 transition-colors">
                About Us
              </a>
            </li>
            <li>
              <a href="/projects" className="hover:text-brand-400 transition-colors">
                Projects
              </a>
            </li>
            <li>
              <a href="/weather" className="hover:text-brand-400 transition-colors">
                Weather
              </a>
            </li>
            <li>
              <a href="/contact" className="hover:text-brand-400 transition-colors">
                Contact
              </a>
            </li>
          </ul>

          {/* Right Side */}
          <div className="hidden lg:flex items-center gap-5">
            {user ? (
              <div className="flex items-center gap-4">
                <div className="text-right leading-tight">
                  <p className="text-sm font-medium text-white">{user.name}</p>
                  <p className="text-xs text-brand-400">
                    {user.points} Impact Points
                  </p>
                </div>

                <div className="w-10 h-10 rounded-full bg-slate-700 flex items-center justify-center text-white text-sm font-semibold">
                  {user.name?.charAt(0).toUpperCase()}
                </div>

                <button
                  onClick={onLogout}
                  className="text-slate-400 hover:text-white transition-colors"
                  title="Logout"
                >
                  <LogOut size={18} />
                </button>
              </div>
            ) : (
              <>
                <button
                  onClick={onOpenLogin}
                  className="px-5 py-2.5 text-sm font-medium text-white border border-white/10 rounded-lg hover:bg-white/5 transition-colors"
                >
                  Sign In
                </button>

                <a
                  href="/involve"
                  className="px-5 py-2.5 bg-brand-500 hover:bg-brand-400 text-white text-sm font-medium rounded-lg transition-colors shadow-lg shadow-brand-500/20"
                >
                  Become Involved
                </a>
              </>
            )}
          </div>

          {/* Mobile Toggle */}
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="lg:hidden text-white p-2 rounded-md hover:bg-white/10 transition"
          >
            {menuOpen ? <X size={26} /> : <Menu size={26} />}
          </button>
        </nav>

        {/* Mobile Menu */}
        {menuOpen && (
          <div className="lg:hidden pb-6 pt-2 space-y-4 border-t border-white/10">
            <ul className="flex flex-col gap-4 text-sm font-medium text-slate-200 pt-4">
              <li><a href="/" className="block hover:text-brand-400">Home</a></li>
              <li><a href="/about" className="block hover:text-brand-400">About Us</a></li>
              <li><a href="/projects" className="block hover:text-brand-400">Projects</a></li>
              <li><a href="/weather" className="block hover:text-brand-400">Weather</a></li>
              <li><a href="/contact" className="block hover:text-brand-400">Contact</a></li>
              <li><a href="/involve" className="block hover:text-brand-400">Become Involved</a></li>
            </ul>

            <div className="pt-4 border-t border-white/10">
              {user ? (
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-white">{user.name}</p>
                    <p className="text-xs text-brand-400">
                      {user.points} Impact Points
                    </p>
                  </div>
                  <button
                    onClick={onLogout}
                    className="text-slate-400 hover:text-white transition-colors"
                  >
                    <LogOut size={18} />
                  </button>
                </div>
              ) : (
                <button
                  onClick={onOpenLogin}
                  className="w-full px-5 py-3 bg-brand-500 hover:bg-brand-400 text-white text-sm font-medium rounded-lg transition-colors"
                >
                  Sign In
                </button>
              )}
            </div>
          </div>
        )}
      </div>
    </header>
  );
}

export default Navbar;
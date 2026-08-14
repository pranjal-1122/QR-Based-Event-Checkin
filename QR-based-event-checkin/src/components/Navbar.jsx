import { QrCode } from 'lucide-react';
import { Link, NavLink, useLocation } from "react-router-dom";

const Navbar = () => {
  const location = useLocation();

  // Active state logic for home/ticket routes
  const isRegisterActive =
    location.pathname === "/" || location.pathname.startsWith("/ticket/");

  return (
    <header className="fixed top-0 left-0 right-0 z-50 flex justify-center px-3 sm:px-8 pt-3 sm:pt-6 pointer-events-none">
      <nav className="pointer-events-auto w-full max-w-7xl bg-zinc-950/30 backdrop-blur-2xl border border-zinc-800/80 rounded-2xl lg:rounded-full px-3.5 sm:px-6 py-2.5 sm:py-3.5 shadow-2xl shadow-black/80 flex justify-between items-center transition-all">
        
        {/* Brand / Logo */}
        <Link to="/" className="flex items-center gap-2 sm:gap-3 group shrink-0">
          <div className="w-8 h-8 sm:w-9 sm:h-9 rounded-xl bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center text-emerald-400 font-bold group-hover:bg-emerald-500 group-hover:text-zinc-950 transition-all shadow-sm shadow-emerald-500/10">
            <QrCode className="w-4 h-4 sm:w-5 sm:h-5" />
          </div>
          <div>
            <span className="font-bold text-zinc-100 tracking-wide text-base sm:text-xl">
              Tech<span className="text-emerald-400">Pass</span>
            </span>
          </div>
        </Link>

        {/* Navigation Tabs */}
        <div className="flex items-center gap-1 sm:gap-2 bg-zinc-900/80 p-1 sm:p-1.5 rounded-3xl border border-zinc-800/60">
          <NavLink
            to="/"
            className={`px-2.5 sm:px-4 py-1.5 sm:py-2 rounded-3xl text-xs sm:text-sm font-medium transition-all duration-200 ${
              isRegisterActive
                ? 'bg-emerald-500/15 text-emerald-400 border border-emerald-500/30 shadow-sm shadow-emerald-500/10'
                : 'text-zinc-400 hover:text-zinc-100 hover:bg-zinc-800/50'
            }`}
          >
            Register
          </NavLink>

          <NavLink
            to="/admin"
            className={({ isActive }) =>
              `px-2.5 sm:px-4 py-1.5 sm:py-2 rounded-3xl text-xs sm:text-sm font-medium transition-all duration-200 ${
                isActive
                  ? 'bg-emerald-500/15 text-emerald-400 border border-emerald-500/30 shadow-sm shadow-emerald-500/10'
                  : 'text-zinc-400 hover:text-zinc-100 hover:bg-zinc-800/50'
              }`
            }
          >
            
            {/* Shows "Admin" on Mobile, "Admin Portal" on larger screens */}
            <span>Admin<span className="hidden sm:inline"> Portal</span></span>
          </NavLink>
        </div>

      </nav>
    </header>
  );
};

export default Navbar;
import { QrCode } from 'lucide-react';
import { Link, NavLink } from "react-router-dom";

const Navbar = () => {
    return <>
        <nav className="bg-zinc-900 border-b border-zinc-800 sticky top-0 z-50 px-6 py-4">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
            
            {/* Brand / Logo */}
            <Link to="/" className="flex items-center gap-3 group">
            <div className="w-8 h-8 rounded-lg bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center text-emerald-400 font-bold group-hover:bg-emerald-500 group-hover:text-zinc-950 transition-all">
                <QrCode/>
            </div>
            <div>
                <span className="font-bold text-zinc-100 tracking-wide text-lg">
                Tech<span className="text-emerald-400">Pass</span>
                </span>
                
            </div>
            </Link>

            {/* Navigation Links */}
            <div className="flex items-center gap-2 sm:gap-4">
            <NavLink
                to="/"
                end
                className={({ isActive }) =>
                `px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                    isActive
                    ? 'bg-zinc-800 text-emerald-400 border border-zinc-700'
                    : 'text-zinc-400 hover:text-zinc-100 hover:bg-zinc-800/50'
                }`
                }
            >
                Register
            </NavLink>

            <NavLink
                to="/admin"
                className={({ isActive }) =>
                `px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                    isActive
                    ? 'bg-emerald-500 text-zinc-950 font-semibold shadow-lg shadow-emerald-500/20'
                    : 'bg-zinc-800 text-zinc-200 border border-zinc-700 hover:border-emerald-500/50 hover:text-emerald-400'
                }`
                }
            >
                Admin Portal
            </NavLink>
            </div>

        </div>
        </nav>
    </>
}

export default Navbar;
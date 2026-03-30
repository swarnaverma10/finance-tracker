import { FaBars, FaBell, FaSearch } from "react-icons/fa";

export default function Navbar({ onMenuClick }) {
  const user = { name: "Swarna", initials: "S" };
  const hour = new Date().getHours();
  const greeting = hour < 12 ? 'Good Morning' : hour < 18 ? 'Good Afternoon' : 'Good Evening';

  return (
    <nav className="flex items-center justify-between p-4 md:p-5 glass border border-indigo-500/10 rounded-[24px] shadow-xl">
      
      {/* LEFT: MOBILE MENU & SEARCH */}
      <div className="flex items-center gap-4">
        <button 
          onClick={onMenuClick}
          className="lg:hidden w-10 h-10 flex items-center justify-center rounded-xl bg-indigo-600/10 border border-indigo-500/20 text-indigo-400"
        >
          <FaBars />
        </button>

        <div className="hidden md:flex items-center gap-3 px-4 py-2.5 rounded-xl bg-slate-900/40 border border-indigo-500/10 w-64 lg:w-80 group transition-all focus-within:border-indigo-500/40">
          <FaSearch className="text-slate-500 group-focus-within:text-indigo-400" />
          <input 
            type="text" 
            placeholder="Search transactions..."
            className="bg-transparent border-none outline-none text-sm text-slate-300 placeholder:text-slate-600 w-full"
          />
        </div>
      </div>

      {/* RIGHT: NOTIFICATIONS & PROFILE */}
      <div className="flex items-center gap-3 md:gap-6">
        <div className="hidden sm:block text-right">
          <p className="text-[11px] font-bold text-slate-500 uppercase tracking-widest">{greeting}</p>
          <h2 className="text-sm font-semibold text-slate-100">{user.name}</h2>
        </div>

        <div className="flex items-center gap-3">
          <button className="relative w-10 h-10 flex items-center justify-center rounded-xl bg-slate-800/50 border border-slate-700/50 text-slate-400 hover:text-indigo-400 hover:border-indigo-500/30 transition-all">
            <FaBell />
            <span className="absolute top-2.5 right-2.5 w-2 h-2 rounded-full bg-rose-500 border-2 border-[#0f172a]" />
          </button>

          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center text-white font-bold text-sm shadow-lg shadow-indigo-500/20 ring-2 ring-indigo-500/20">
            {user.initials}
          </div>
        </div>
      </div>

    </nav>
  );
}
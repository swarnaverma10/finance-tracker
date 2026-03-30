import { Link, useLocation } from "react-router-dom";
import { motion } from "framer-motion";
import {
  FaHome,
  FaWallet,
  FaChartBar,
  FaFileAlt,
  FaSignOutAlt,
  FaTimes,
  FaChartPie,
  FaBrain
} from "react-icons/fa";

export default function Sidebar({ closeSidebar }) {
  const location = useLocation();

  const menu = [
    { name: "Dashboard", path: "/", icon: <FaHome /> },
    { name: "Transactions", path: "/expenses", icon: <FaWallet /> },
    { name: "Budget", path: "/budget", icon: <FaChartPie /> },
    { name: "Charts", path: "/charts", icon: <FaChartBar /> },
    { name: "Reports", path: "/reports", icon: <FaFileAlt /> },
    { name: "AI Insights", path: "/ai", icon: <FaBrain /> },
  ];

  const logout = () => {
    localStorage.removeItem("token");
    window.location.href = "/login";
  };

  return (
    <aside className="h-full w-72 glass flex flex-col border-r border-indigo-500/10 p-6 relative">
      {/* MOBILE CLOSE BUTTON */}
      <button 
        onClick={closeSidebar}
        className="lg:hidden absolute top-6 right-6 p-2 rounded-xl bg-slate-800/50 border border-slate-700 text-slate-400 hover:text-white transition-colors"
      >
        <FaTimes />
      </button>

      {/* LOGO */}
      <div className="mb-10 px-2 mt-2">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center text-white font-black text-xl shadow-lg shadow-indigo-500/20">
            F
          </div>
          <div>
            <h1 className="text-xl font-bold tracking-tight text-white leading-tight">
              Finlytics
            </h1>
            <p className="text-[10px] text-indigo-400/80 font-bold uppercase tracking-[0.2em]">
              Smart Finance
            </p>
          </div>
        </div>
      </div>

      {/* NAVIGATION */}
      <nav className="flex-1 flex flex-col gap-1.5 overflow-y-auto pr-2 custom-scrollbar">
        {menu.map((item, i) => {
          const isActive = location.pathname === item.path;
          return (
            <Link
              key={i}
              to={item.path}
              onClick={() => { if (window.innerWidth < 1024) closeSidebar(); }}
              className="relative group"
            >
              <div
                className={`
                  flex items-center gap-3.5 px-4 py-3.5 rounded-2xl transition-all duration-300
                  ${isActive 
                    ? 'bg-indigo-600/20 border border-indigo-500/30 text-white' 
                    : 'text-slate-400 hover:bg-white/5 hover:text-slate-100 border border-transparent'}
                `}
              >
                <span className={`text-lg transition-transform duration-300 group-hover:scale-110 ${isActive ? 'text-indigo-400' : 'text-slate-500'}`}>
                  {item.icon}
                </span>
                <span className="text-sm font-semibold tracking-wide">
                  {item.name}
                </span>
                
                {isActive && (
                  <motion.div 
                    layoutId="active-pill"
                    className="ml-auto w-1.5 h-1.5 rounded-full bg-indigo-500 shadow-[0_0_12px_#6366f1]" 
                  />
                )}
              </div>
            </Link>
          );
        })}
      </nav>

      {/* PRO WIDGET / QUICK STAT (Aesthetic addition) */}
      <div className="mt-6 mb-8 p-4 rounded-2xl bg-gradient-to-br from-indigo-600/10 to-purple-600/10 border border-indigo-500/20">
        <p className="text-[10px] font-bold text-indigo-400 uppercase tracking-widest mb-1">Weekly Plan</p>
        <p className="text-sm font-bold text-white mb-3">Upgrade to Pro</p>
        <button className="w-full py-2 bg-indigo-600 hover:bg-indigo-500 text-white text-[11px] font-bold rounded-xl transition-all shadow-lg shadow-indigo-600/20">
          Unlock AI Power
        </button>
      </div>

      {/* USER & LOGOUT */}
      <div className="pt-6 border-t border-slate-800/50">
        <button
          onClick={logout}
          className="w-full flex items-center justify-center gap-3 px-4 py-3.5 rounded-2xl bg-rose-500/10 border border-rose-500/20 text-rose-400 font-bold text-sm transition-all hover:bg-rose-500 hover:text-white hover:shadow-[0_0_20px_rgba(244,63,94,0.3)]"
        >
          <FaSignOutAlt />
          <span>Sign Out</span>
        </button>
      </div>
    </aside>
  );
}
import { FaUser, FaEnvelope, FaCrown, FaShieldAlt, FaHistory, FaEdit } from "react-icons/fa";

export default function Profile() {
  const user = {
    name: "Swarna",
    email: "example@gmail.com",
    plan: "Free",
    initials: "S",
    joined: "March 2024"
  };

  return (
    <div className="space-y-8 animate-fade-in-up">

      {/* HEADER */}
      <div>
        <h1 className="text-3xl font-black text-gradient-silver tracking-tight">
          User Settings
        </h1>
        <p className="text-slate-500 text-sm mt-1">
          Manage your account preferences and security
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* LEFT COLUMN: BASIC PROFILE */}
        <div className="lg:col-span-2 space-y-6">
          <div className="card">
            <div className="flex flex-col md:flex-row md:items-center gap-8 pb-8 border-b border-slate-800/50">
              <div className="relative group">
                <div className="w-24 h-24 rounded-3xl bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center text-3xl text-white font-black shadow-2xl shadow-indigo-500/20 ring-4 ring-indigo-500/10 transition-transform group-hover:scale-105">
                  {user.initials}
                </div>
                <button className="absolute -bottom-2 -right-2 w-8 h-8 rounded-xl bg-slate-800 border border-slate-700 text-slate-400 flex items-center justify-center text-xs hover:text-white hover:bg-indigo-600 transition-all">
                  <FaEdit />
                </button>
              </div>
              
              <div className="flex-1">
                <div className="flex items-center justify-between">
                  <div>
                    <h2 className="text-2xl font-bold text-slate-100">{user.name}</h2>
                    <p className="text-slate-500 text-sm font-medium mt-1">Verified Member • {user.joined}</p>
                  </div>
                  <button className="hidden sm:block btn px-6 py-2.5 text-xs">
                    Edit Profile
                  </button>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-8">
              {[
                { icon: <FaUser />, label: 'Display Name', value: user.name },
                { icon: <FaEnvelope />, label: 'Email Address', value: user.email },
                { icon: <FaShieldAlt />, label: 'Account Status', value: 'Active' },
                { icon: <FaHistory />, label: 'Login Activity', value: '2 hours ago' },
              ].map((item, i) => (
                <div key={i} className="p-4 rounded-2xl bg-slate-900/40 border border-slate-800/50 group hover:border-indigo-500/20 transition-all">
                  <div className="flex items-center gap-4">
                    <div className="w-10 h-10 rounded-xl bg-indigo-500/10 border border-indigo-500/20 flex items-center justify-center text-indigo-400 group-hover:scale-110 transition-transform">
                      {item.icon}
                    </div>
                    <div>
                      <p className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">{item.label}</p>
                      <p className="text-sm font-semibold text-slate-200 mt-0.5">{item.value}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="card border-rose-500/10 bg-rose-500/5">
            <h3 className="text-rose-400 font-bold mb-2">Danger Zone</h3>
            <p className="text-slate-500 text-xs mb-4">Once you delete your account, there is no going back. Please be certain.</p>
            <button className="px-5 py-2.5 rounded-xl border border-rose-500/30 text-rose-500 text-xs font-bold hover:bg-rose-500 hover:text-white transition-all uppercase tracking-widest">
              Delete Account
            </button>
          </div>
        </div>

        {/* RIGHT COLUMN: PLAN & STATS */}
        <div className="space-y-6">
          <div className="card bg-gradient-to-br from-indigo-600/20 to-purple-600/20 border-indigo-500/30">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 rounded-xl bg-amber-500/20 border border-amber-500/30 flex items-center justify-center text-amber-500 shadow-lg shadow-amber-500/20">
                <FaCrown />
              </div>
              <div>
                <h3 className="font-bold text-slate-100">Membership</h3>
                <p className="text-[10px] text-amber-500 font-bold uppercase tracking-widest">Current Plan</p>
              </div>
            </div>

            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-sm text-slate-400">Current Plan</span>
                <span className="px-3 py-1 rounded-full bg-slate-800 text-[10px] font-black text-slate-200 uppercase tracking-widest border border-slate-700">{user.plan}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-slate-400">Next Billing</span>
                <span className="text-sm font-bold text-slate-200">N/A</span>
              </div>
            </div>

            <button className="mt-8 w-full btn">
              Upgrade to Pro
            </button>
          </div>

          <div className="card">
            <h3 className="font-bold text-slate-200 mb-4 flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-indigo-500" />
              Usage Statistics
            </h3>
            <div className="space-y-5">
              {[
                { label: 'Transactions tracked', value: '142', progress: 70 },
                { label: 'Budgets created', value: '5 / 10', progress: 50 },
                { label: 'AI Insights generated', value: '12', progress: 30 },
              ].map((stat, i) => (
                <div key={i} className="space-y-2">
                  <div className="flex justify-between text-xs">
                    <span className="text-slate-500 font-medium">{stat.label}</span>
                    <span className="text-slate-200 font-bold">{stat.value}</span>
                  </div>
                  <div className="h-1.5 w-full bg-slate-800 rounded-full overflow-hidden">
                    <div 
                      className="h-full bg-indigo-500 rounded-full shadow-[0_0_8px_rgba(99,102,241,0.5)]" 
                      style={{ width: `${stat.progress}%` }} 
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}
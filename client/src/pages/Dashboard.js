import { useEffect, useState } from "react";
import {
  PieChart, Pie, Cell,
  LineChart, Line,
  BarChart, Bar,
  XAxis, YAxis, Tooltip,
  ResponsiveContainer, CartesianGrid
} from "recharts";
import { FaArrowUp, FaArrowDown, FaWallet, FaRobot, FaChartLine, FaHistory } from "react-icons/fa";

const CHART_COLORS = [
  '#6366f1', '#8b5cf6', '#06b6d4', '#10b981',
  '#f59e0b', '#f43f5e', '#ec4899', '#14b8a6'
];

export default function Dashboard() {
  const [data, setData] = useState([]);

  useEffect(() => {
    const stored = JSON.parse(localStorage.getItem("transactions")) || [];
    setData(stored);
  }, []);

  // 💰 CALCULATIONS
  const income = data
    .filter(d => d.type === "income")
    .reduce((a, b) => a + Number(b.amount), 0);

  const expense = data
    .filter(d => d.type === "expense")
    .reduce((a, b) => a + Number(b.amount), 0);

  const balance = income - expense;

  // 🥧 CATEGORY DATA
  const categoryData = Object.values(
    data.reduce((acc, item) => {
      if (item.type === "expense") {
        acc[item.category] = acc[item.category] || {
          name: item.category,
          value: 0
        };
        acc[item.category].value += Number(item.amount);
      }
      return acc;
    }, {})
  ).sort((a, b) => b.value - a.value);

  // 📈 TREND
  const trendData = data.slice(-10).map(d => ({
    name: new Date(d.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric' }),
    amount: Number(d.amount)
  }));

  // 📊 PAYMENT
  const paymentData = Object.values(
    data.reduce((acc, item) => {
      acc[item.payment] = acc[item.payment] || {
        name: item.payment || "Other",
        value: 0
      };
      acc[item.payment].value += Number(item.amount);
      return acc;
    }, {})
  );

  const summaryCards = [
    {
      label: 'Total Income',
      value: income,
      icon: <FaArrowUp />,
      color: 'text-emerald-400',
      bg: 'bg-emerald-500/10',
      border: 'border-emerald-500/20',
    },
    {
      label: 'Total Expense',
      value: expense,
      icon: <FaArrowDown />,
      color: 'text-rose-400',
      bg: 'bg-rose-500/10',
      border: 'border-rose-500/20',
    },
    {
      label: 'Net Balance',
      value: balance,
      icon: <FaWallet />,
      color: 'text-indigo-400',
      bg: 'bg-indigo-500/10',
      border: 'border-indigo-500/20',
    },
  ];

  return (
    <div className="space-y-8 animate-fade-in-up">

      {/* 🔥 HEADER SECTION */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl md:text-4xl font-black text-gradient-silver tracking-tight">
            Financial Dashboard
          </h1>
          <p className="text-slate-500 text-sm mt-1 flex items-center gap-2">
            <FaHistory className="text-indigo-500/50" />
            Real-time overview of your spending and savings
          </p>
        </div>
        <div className="flex items-center gap-3">
          <div className="px-4 py-2 rounded-xl bg-slate-800/40 border border-slate-700/50 text-[11px] font-bold text-slate-400 uppercase tracking-widest">
            Last updated: Just now
          </div>
        </div>
      </div>

      {/* 🔥 SUMMARY GRID */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
        {summaryCards.map((card, i) => (
          <div
            key={i}
            className={`card group hover:scale-[1.02] ${card.border}`}
          >
            <div className="flex items-center gap-5">
              <div className={`w-14 h-14 rounded-2xl ${card.bg} border ${card.border} flex items-center justify-center ${card.color} text-xl transition-all duration-500 group-hover:rotate-12`}>
                {card.icon}
              </div>
              <div>
                <p className="text-[10px] font-bold text-slate-500 uppercase tracking-[0.15em]">
                  {card.label}
                </p>
                <h2 className={`text-2xl font-black ${card.color} mt-0.5 tracking-tight`}>
                  ₹{card.value.toLocaleString()}
                </h2>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* 🔥 MAIN CHARTS GRID */}
      <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">

        {/* PIE CHART - CATEGORIES */}
        <div className="card h-full flex flex-col min-h-[400px]">
          <div className="flex items-center justify-between mb-8">
            <h3 className="font-bold text-slate-200 flex items-center gap-2">
              <FaChartLine className="text-indigo-500" />
              Expense Distribution
            </h3>
          </div>

          <div className="flex-1 flex flex-col justify-center">
            {categoryData.length === 0 ? (
              <div className="h-64 flex items-center justify-center text-slate-600 text-sm italic">
                No active expenses tracked
              </div>
            ) : (
              <>
                <ResponsiveContainer width="100%" height={240}>
                  <PieChart>
                    <Pie
                      data={categoryData}
                      dataKey="value"
                      innerRadius={65}
                      outerRadius={90}
                      paddingAngle={5}
                      strokeWidth={0}
                    >
                      {categoryData.map((_, i) => (
                        <Cell key={i} fill={CHART_COLORS[i % CHART_COLORS.length]} className="focus:outline-none" />
                      ))}
                    </Pie>
                    <Tooltip 
                      contentStyle={{ background: '#0f172a', border: '1px solid #1e293b', borderRadius: '12px' }}
                      itemStyle={{ color: '#f1f5f9', fontSize: '12px' }}
                    />
                  </PieChart>
                </ResponsiveContainer>
                
                {/* Custom Legend */}
                <div className="grid grid-cols-2 gap-2 mt-4">
                  {categoryData.slice(0, 4).map((item, i) => (
                    <div key={i} className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-slate-900/40 border border-slate-800/50">
                      <div className="w-2 h-2 rounded-full" style={{ backgroundColor: CHART_COLORS[i % CHART_COLORS.length] }} />
                      <span className="text-[10px] font-medium text-slate-400 truncate">{item.name}</span>
                      <span className="ml-auto text-[10px] font-bold text-slate-200">₹{item.value}</span>
                    </div>
                  ))}
                </div>
              </>
            )}
          </div>
        </div>

        {/* LINE CHART - TREND */}
        <div className="card h-full flex flex-col min-h-[400px]">
          <div className="flex items-center justify-between mb-8">
            <h3 className="font-bold text-slate-200 flex items-center gap-2">
              <FaChartLine className="text-purple-500" />
              Spending velocity
            </h3>
          </div>

          <div className="flex-1">
            {trendData.length === 0 ? (
              <div className="h-64 flex items-center justify-center text-slate-600 text-sm italic">
                Insufficient data for trends
              </div>
            ) : (
              <ResponsiveContainer width="100%" height={300}>
                <LineChart data={trendData}>
                  <defs>
                    <linearGradient id="lineGradient" x1="0" y1="0" x2="1" y2="0">
                      <stop offset="0%" stopColor="#6366f1" />
                      <stop offset="100%" stopColor="#8b5cf6" />
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} />
                  <Line
                    type="monotone"
                    dataKey="amount"
                    stroke="url(#lineGradient)"
                    strokeWidth={4}
                    dot={{ fill: '#6366f1', strokeWidth: 2, r: 4, stroke: '#0f172a' }}
                    activeDot={{ r: 6, fill: '#818cf8', strokeWidth: 0 }}
                  />
                  <XAxis dataKey="name" axisLine={false} tickLine={false} />
                  <YAxis axisLine={false} tickLine={false} hide />
                  <Tooltip 
                    contentStyle={{ background: '#0f172a', border: '1px solid #1e293b', borderRadius: '12px' }}
                  />
                </LineChart>
              </ResponsiveContainer>
            )}
          </div>
        </div>

        {/* AI INSIGHTS PANEL */}
        <div className="card h-full bg-gradient-to-br from-indigo-900/20 via-slate-900/60 to-slate-900/80 border-indigo-500/20 min-h-[400px] flex flex-col">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-indigo-500 to-purple-600 flex items-center justify-center text-white shadow-lg animate-pulse-glow">
              <FaRobot />
            </div>
            <div>
              <h3 className="font-bold text-indigo-100">AI Financial Pilot</h3>
              <p className="text-[10px] text-indigo-400 font-bold uppercase tracking-widest">Active Analysis</p>
            </div>
          </div>

          <div className="space-y-4 flex-1">
            {data.length === 0 ? (
              <p className="text-slate-500 text-sm italic px-2">
                Predictive insights will populate once transaction history is established.
              </p>
            ) : (
              <>
                {[
                  { title: "Spending Anomaly", desc: "Your food expenses are 15% higher this week.", color: "text-rose-400", border: "border-rose-500/10" },
                  { title: "Savings Potential", desc: "You could save ₹2,400 by optimizing subscriptions.", color: "text-emerald-400", border: "border-emerald-500/10" },
                  { title: "Forecast", desc: "Stable month expected based on current patterns.", color: "text-indigo-400", border: "border-indigo-500/10" },
                ].map((insight, i) => (
                  <div
                    key={i}
                    className={`p-4 rounded-2xl bg-slate-900/60 border ${insight.border} hover:bg-slate-900/80 transition-all cursor-default group`}
                  >
                    <h4 className={`text-xs font-bold uppercase tracking-wider ${insight.color} mb-1`}>{insight.title}</h4>
                    <p className="text-slate-400 text-sm leading-relaxed group-hover:text-slate-200 transition-colors">
                      {insight.desc}
                    </p>
                  </div>
                ))}
              </>
            )}
          </div>
          
          <button className="mt-6 w-full py-3 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-bold uppercase tracking-widest transition-all shadow-lg shadow-indigo-600/20">
            View Deep Analysis
          </button>
        </div>

      </div>

    </div>
  );
}
import { useEffect, useState } from "react";
import {
  PieChart, Pie, Cell, LineChart, Line,
  BarChart, Bar, XAxis, YAxis,
  Tooltip, CartesianGrid, ResponsiveContainer, Legend
} from "recharts";

const COLORS = ['#6366f1', '#8b5cf6', '#06b6d4', '#10b981', '#f59e0b', '#f43f5e'];

export default function Charts() {
  const [data, setData] = useState([]);

  useEffect(() => {
    const stored = JSON.parse(localStorage.getItem("transactions")) || [];
    setData(stored);
  }, []);

  const categoryData = Object.values(
    data.reduce((acc, item) => {
      if (item.type === "expense") {
        acc[item.category] = acc[item.category] || { name: item.category, value: 0 };
        acc[item.category].value += Number(item.amount);
      }
      return acc;
    }, {})
  );

  const trendData = data.map(d => ({
    name: d.date || "N/A",
    amount: Number(d.amount)
  }));

  const paymentData = Object.values(
    data.reduce((acc, item) => {
      acc[item.payment] = acc[item.payment] || { name: item.payment || "Other", value: 0 };
      acc[item.payment].value += Number(item.amount);
      return acc;
    }, {})
  );

  const hasData = data.length > 0;

  const EmptyState = () => (
    <div style={{
      height: '250px',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      color: '#475569',
      fontSize: '0.85rem',
    }}>
      No data available
    </div>
  );

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '28px' }}>

      <div>
        <h1 style={{
          fontSize: '2rem',
          fontWeight: 800,
          background: 'linear-gradient(135deg, #e0e7ff, #c7d2fe, #a5b4fc)',
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent',
          backgroundClip: 'text',
          letterSpacing: '-0.025em',
        }}>
          Analytics
        </h1>
        <p style={{ color: '#64748b', fontSize: '0.9rem', marginTop: '4px' }}>
          Visual breakdown of your finances
        </p>
      </div>

      <div className="grid lg:grid-cols-3 gap-6">

        <div className="card">
          <h3 style={{ fontWeight: 600, color: '#cbd5e1', marginBottom: '20px', fontSize: '0.9rem' }}>
            Category Distribution
          </h3>
          {!hasData || categoryData.length === 0 ? <EmptyState /> : (
            <ResponsiveContainer width="100%" height={250}>
              <PieChart>
                <Pie
                  data={categoryData}
                  dataKey="value"
                  innerRadius={50}
                  outerRadius={85}
                  paddingAngle={4}
                  strokeWidth={0}
                >
                  {categoryData.map((_, i) => (
                    <Cell key={i} fill={COLORS[i % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip />
                <Legend />
              </PieChart>
            </ResponsiveContainer>
          )}
        </div>

        <div className="card">
          <h3 style={{ fontWeight: 600, color: '#cbd5e1', marginBottom: '20px', fontSize: '0.9rem' }}>
            Spending Trend
          </h3>
          {!hasData ? <EmptyState /> : (
            <ResponsiveContainer width="100%" height={250}>
              <LineChart data={trendData}>
                <defs>
                  <linearGradient id="lineGrad2" x1="0" y1="0" x2="1" y2="0">
                    <stop offset="0%" stopColor="#6366f1" />
                    <stop offset="100%" stopColor="#8b5cf6" />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="rgba(99,102,241,0.06)" />
                <Line dataKey="amount" stroke="url(#lineGrad2)" strokeWidth={2.5} dot={{ fill: '#6366f1', r: 3, strokeWidth: 0 }} />
                <XAxis dataKey="name" tick={{ fontSize: 11 }} />
                <YAxis tick={{ fontSize: 11 }} />
                <Tooltip />
              </LineChart>
            </ResponsiveContainer>
          )}
        </div>

        <div className="card">
          <h3 style={{ fontWeight: 600, color: '#cbd5e1', marginBottom: '20px', fontSize: '0.9rem' }}>
            Payment Methods
          </h3>
          {!hasData ? <EmptyState /> : (
            <ResponsiveContainer width="100%" height={250}>
              <BarChart data={paymentData}>
                <defs>
                  <linearGradient id="barGrad2" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#10b981" />
                    <stop offset="100%" stopColor="#059669" />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="rgba(99,102,241,0.06)" />
                <Bar dataKey="value" fill="url(#barGrad2)" radius={[6, 6, 0, 0]} />
                <XAxis dataKey="name" tick={{ fontSize: 11 }} />
                <YAxis tick={{ fontSize: 11 }} />
                <Tooltip />
              </BarChart>
            </ResponsiveContainer>
          )}
        </div>

      </div>
    </div>
  );
}
import { useEffect, useState } from "react";
import {
  BarChart, Bar, XAxis, YAxis,
  Tooltip, ResponsiveContainer, CartesianGrid
} from "recharts";
import { FaArrowUp, FaArrowDown, FaPiggyBank, FaHistory } from "react-icons/fa";

export default function Reports() {
  const [data, setData] = useState([]);

  useEffect(() => {
    const stored = JSON.parse(localStorage.getItem("transactions")) || [];
    setData(stored);
  }, []);

  const totalIncome = data
    .filter(t => t.type === "income")
    .reduce((a, b) => a + Number(b.amount), 0);

  const totalExpense = data
    .filter(t => t.type === "expense")
    .reduce((a, b) => a + Number(b.amount), 0);

  const savings = totalIncome - totalExpense;

  const categoryData = Object.values(
    data.reduce((acc, t) => {
      if (t.type === "expense") {
        acc[t.category] = acc[t.category] || { name: t.category || "Other", value: 0 };
        acc[t.category].value += Number(t.amount);
      }
      return acc;
    }, {})
  );

  const summaryCards = [
    {
      label: 'Total Income',
      value: totalIncome,
      icon: <FaArrowUp />,
      color: '#10b981',
      bg: 'rgba(16, 185, 129, 0.08)',
      border: 'rgba(16, 185, 129, 0.18)',
    },
    {
      label: 'Total Expenses',
      value: totalExpense,
      icon: <FaArrowDown />,
      color: '#f43f5e',
      bg: 'rgba(244, 63, 94, 0.08)',
      border: 'rgba(244, 63, 94, 0.18)',
    },
    {
      label: 'Savings',
      value: savings,
      icon: <FaPiggyBank />,
      color: '#6366f1',
      bg: 'rgba(99, 102, 241, 0.08)',
      border: 'rgba(99, 102, 241, 0.18)',
    },
  ];

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
          Financial Reports
        </h1>
        <p style={{ color: '#64748b', fontSize: '0.9rem', marginTop: '4px' }}>
          Detailed analysis and transaction history
        </p>
      </div>

      {/* SUMMARY CARDS */}
      <div className="grid md:grid-cols-3 gap-6">
        {summaryCards.map((card, i) => (
          <div
            key={i}
            className="card"
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '16px',
              background: card.bg,
              borderColor: card.border,
            }}
          >
            <div style={{
              width: '44px',
              height: '44px',
              borderRadius: '12px',
              background: card.bg,
              border: `1px solid ${card.border}`,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: card.color,
              fontSize: '1rem',
              flexShrink: 0,
            }}>
              {card.icon}
            </div>
            <div>
              <p style={{
                color: '#64748b',
                fontSize: '0.75rem',
                fontWeight: 500,
                textTransform: 'uppercase',
                letterSpacing: '0.05em',
              }}>
                {card.label}
              </p>
              <h2 style={{
                fontSize: '1.4rem',
                fontWeight: 700,
                color: card.color,
                marginTop: '2px',
              }}>
                ₹{card.value.toLocaleString()}
              </h2>
            </div>
          </div>
        ))}
      </div>

      <div className="grid md:grid-cols-1 gap-8">
        {/* BAR CHART */}
        <div className="card">
          <h3 style={{
            fontWeight: 600,
            color: '#cbd5e1',
            marginBottom: '20px',
            fontSize: '0.9rem',
          }}>
            Expense Breakdown by Category
          </h3>

          {categoryData.length === 0 ? (
            <div style={{
              height: '250px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: '#475569',
              fontSize: '0.85rem',
            }}>
              No statistics available
            </div>
          ) : (
            <ResponsiveContainer width="100%" height={280}>
              <BarChart data={categoryData}>
                <defs>
                  <linearGradient id="reportBarGrad" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#818cf8" />
                    <stop offset="100%" stopColor="#6366f1" />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="rgba(99,102,241,0.06)" />
                <Bar dataKey="value" fill="url(#reportBarGrad)" radius={[6, 6, 0, 0]} />
                <XAxis dataKey="name" tick={{ fontSize: 11, fill: '#64748b' }} axisLine={false} tickLine={false} />
                <YAxis tick={{ fontSize: 11, fill: '#64748b' }} axisLine={false} tickLine={false} />
                <Tooltip 
                  contentStyle={{ 
                    background: '#0f172a', 
                    border: '1px solid #1e293b',
                    borderRadius: '8px',
                    color: '#f8fafc' 
                  }}
                />
              </BarChart>
            </ResponsiveContainer>
          )}
        </div>

        {/* MONTHLY SUMMARY TABLE */}
        <div className="card" style={{ padding: '0px', overflow: 'hidden' }}>
          <div style={{ padding: '24px', borderBottom: '1px solid #1e293b', display: 'flex', alignItems: 'center', gap: '10px' }}>
            <FaHistory style={{ color: '#10b981' }} />
            <h3 style={{ fontWeight: 600, color: '#f8fafc', fontSize: '1rem' }}>Monthly Summary Reports</h3>
          </div>

          <div style={{ overflowX: 'auto' }}>
            <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left' }}>
              <thead>
                <tr style={{ borderBottom: '1px solid #1e293b', background: 'rgba(15, 23, 42, 0.5)' }}>
                  <th style={{ padding: '16px 24px', fontSize: '0.75rem', color: '#64748b', fontWeight: 600, textTransform: 'uppercase' }}>Month</th>
                  <th style={{ padding: '16px 24px', fontSize: '0.75rem', color: '#64748b', fontWeight: 600, textTransform: 'uppercase' }}>Total Income</th>
                  <th style={{ padding: '16px 24px', fontSize: '0.75rem', color: '#64748b', fontWeight: 600, textTransform: 'uppercase' }}>Total Expense</th>
                  <th style={{ padding: '16px 24px', fontSize: '0.75rem', color: '#64748b', fontWeight: 600, textTransform: 'uppercase' }}>Savings</th>
                  <th style={{ padding: '16px 24px', fontSize: '0.75rem', color: '#64748b', fontWeight: 600, textTransform: 'uppercase', textAlign: 'right' }}>Status</th>
                </tr>
              </thead>
              <tbody>
                {Object.keys(data.reduce((acc, t) => {
                  const date = new Date(t.date);
                  const monthYear = date.toLocaleString('default', { month: 'long', year: 'numeric' });
                  if (!acc[monthYear]) acc[monthYear] = { income: 0, expense: 0 };
                  if (t.type === 'income') acc[monthYear].income += Number(t.amount);
                  else acc[monthYear].expense += Number(t.amount);
                  return acc;
                }, {})).length === 0 ? (
                  <tr>
                    <td colSpan="5" style={{ padding: '40px', textAlign: 'center', color: '#64748b', fontSize: '0.9rem' }}>No monthly data available.</td>
                  </tr>
                ) : (
                  Object.entries(data.reduce((acc, t) => {
                    const date = new Date(t.date);
                    const monthYear = date.toLocaleString('default', { month: 'long', year: 'numeric' });
                    if (!acc[monthYear]) acc[monthYear] = { income: 0, expense: 0 };
                    if (t.type === 'income') acc[monthYear].income += Number(t.amount);
                    else acc[monthYear].expense += Number(t.amount);
                    return acc;
                  }, {})).map(([month, totals], i) => {
                    const savings = totals.income - totals.expense;
                    return (
                      <tr key={i} style={{ borderBottom: '1px solid #1e293b', transition: 'background 0.2s' }}>
                        <td style={{ padding: '16px 24px', fontSize: '0.85rem', color: '#f8fafc', fontWeight: 600 }}>{month}</td>
                        <td style={{ padding: '16px 24px', fontSize: '0.85rem', color: '#10b981' }}>₹{totals.income.toLocaleString()}</td>
                        <td style={{ padding: '16px 24px', fontSize: '0.85rem', color: '#f43f5e' }}>₹{totals.expense.toLocaleString()}</td>
                        <td style={{ padding: '16px 24px', fontSize: '0.85rem', color: savings >= 0 ? '#6366f1' : '#f43f5e', fontWeight: 700 }}>
                          ₹{savings.toLocaleString()}
                        </td>
                        <td style={{ padding: '16px 24px', textAlign: 'right' }}>
                          <span style={{ 
                            fontSize: '0.65rem', 
                            padding: '4px 8px', 
                            borderRadius: '4px', 
                            background: savings >= 0 ? 'rgba(16, 185, 129, 0.1)' : 'rgba(244, 63, 94, 0.1)',
                            color: savings >= 0 ? '#10b981' : '#f43f5e',
                            border: `1px solid ${savings >= 0 ? 'rgba(16, 185, 129, 0.2)' : 'rgba(244, 63, 94, 0.2)'}`,
                            fontWeight: 700,
                            textTransform: 'uppercase'
                          }}>
                            {savings >= 0 ? 'Positive' : 'Deficit'}
                          </span>
                        </td>
                      </tr>
                    );
                  })
                )}
              </tbody>
            </table>
          </div>
        </div>

        {/* DETAILED TRANSACTION LIST */}
        <div className="card" style={{ padding: '0px', overflow: 'hidden' }}>
          <div style={{ padding: '24px', borderBottom: '1px solid #1e293b', display: 'flex', alignItems: 'center', gap: '10px' }}>
            <FaHistory style={{ color: '#6366f1' }} />
            <h3 style={{ fontWeight: 600, color: '#f8fafc', fontSize: '1rem' }}>Detailed Transaction History</h3>
          </div>

          <div style={{ overflowX: 'auto' }}>
            <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left' }}>
              <thead>
                <tr style={{ borderBottom: '1px solid #1e293b', background: 'rgba(15, 23, 42, 0.5)' }}>
                  <th style={{ padding: '16px 24px', fontSize: '0.75rem', color: '#64748b', fontWeight: 600, textTransform: 'uppercase' }}>Date</th>
                  <th style={{ padding: '16px 24px', fontSize: '0.75rem', color: '#64748b', fontWeight: 600, textTransform: 'uppercase' }}>Description</th>
                  <th style={{ padding: '16px 24px', fontSize: '0.75rem', color: '#64748b', fontWeight: 600, textTransform: 'uppercase' }}>Category</th>
                  <th style={{ padding: '16px 24px', fontSize: '0.75rem', color: '#64748b', fontWeight: 600, textTransform: 'uppercase' }}>Type</th>
                  <th style={{ padding: '16px 24px', fontSize: '0.75rem', color: '#64748b', fontWeight: 600, textTransform: 'uppercase', textAlign: 'right' }}>Amount</th>
                </tr>
              </thead>
              <tbody>
                {data.length === 0 ? (
                  <tr>
                    <td colSpan="5" style={{ padding: '40px', textAlign: 'center', color: '#64748b', fontSize: '0.9rem' }}>No records found. Start adding transactions to see them here!</td>
                  </tr>
                ) : (
                  [...data].reverse().map((t, i) => (
                    <tr key={i} style={{ borderBottom: '1px solid #1e293b', transition: 'background 0.2s' }} onMouseEnter={(e) => e.currentTarget.style.background = 'rgba(30, 41, 59, 0.4)'} onMouseLeave={(e) => e.currentTarget.style.background = 'transparent'}>
                      <td style={{ padding: '16px 24px', fontSize: '0.85rem', color: '#cbd5e1' }}>{new Date(t.date).toLocaleDateString()}</td>
                      <td style={{ padding: '16px 24px', fontSize: '0.85rem', color: '#f8fafc', fontWeight: 500 }}>{t.description || "N/A"}</td>
                      <td style={{ padding: '16px 24px' }}>
                        <span style={{ fontSize: '0.75rem', background: 'rgba(30, 41, 59, 0.8)', padding: '4px 10px', borderRadius: '6px', color: '#94a3b8', border: '1px solid rgba(148, 163, 184, 0.1)' }}>
                          {t.category || "General"}
                        </span>
                      </td>
                      <td style={{ padding: '16px 24px' }}>
                        <span style={{ 
                          fontSize: '0.7rem', 
                          fontWeight: 700,
                          color: t.type === 'income' ? '#10b981' : '#f43f5e',
                          textTransform: 'uppercase'
                        }}>
                          {t.type}
                        </span>
                      </td>
                      <td style={{ padding: '16px 24px', fontSize: '0.9rem', color: t.type === 'income' ? '#10b981' : '#f8fafc', fontWeight: 700, textAlign: 'right' }}>
                        {t.type === 'income' ? '+' : '-'} ₹{Number(t.amount).toLocaleString()}
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>

    </div>
  );
}
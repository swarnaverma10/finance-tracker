import { useEffect, useState } from "react";

export default function AIInsights() {

  const [insights, setInsights] = useState([]);

  useEffect(() => {
    const data = JSON.parse(localStorage.getItem("transactions")) || [];

    if (data.length === 0) return;

    const total = data.reduce((a, b) => a + Number(b.amount), 0);

    const highest = Object.values(
      data.reduce((acc, t) => {
        if (t.type === "expense") {
          acc[t.category] = acc[t.category] || { category: t.category, total: 0 };
          acc[t.category].total += Number(t.amount);
        }
        return acc;
      }, {})
    ).sort((a, b) => b.total - a.total)[0];

    setInsights([
      {
        text: `Total spending: ₹${total.toLocaleString()}`,
        type: 'info',
      },
      {
        text: `Highest category: ${highest?.category || 'N/A'}`,
        type: 'warning',
      },
      {
        text: `Consider reducing ${highest?.category || 'top category'} expenses`,
        type: 'tip',
      },
      {
        text: 'Track weekly trends for better savings',
        type: 'info',
      },
    ]);

  }, []);

  const typeColors = {
    info: {
      bg: 'rgba(99, 102, 241, 0.06)',
      border: 'rgba(99, 102, 241, 0.15)',
      accent: '#818cf8',
    },
    warning: {
      bg: 'rgba(245, 158, 11, 0.06)',
      border: 'rgba(245, 158, 11, 0.15)',
      accent: '#fbbf24',
    },
    tip: {
      bg: 'rgba(16, 185, 129, 0.06)',
      border: 'rgba(16, 185, 129, 0.15)',
      accent: '#34d399',
    },
  };

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
          AI Insights
        </h1>
        <p style={{ color: '#64748b', fontSize: '0.9rem', marginTop: '4px' }}>
          Smart analysis of your spending patterns
        </p>
      </div>

      {insights.length === 0 ? (
        <div className="card" style={{
          textAlign: 'center',
          padding: '48px 24px',
          color: '#475569',
        }}>
          <p style={{ fontWeight: 500 }}>No insights available</p>
          <p style={{ fontSize: '0.8rem', marginTop: '6px' }}>
            Add transactions to generate AI-powered analysis
          </p>
        </div>
      ) : (
        <div className="grid md:grid-cols-2 gap-5">
          {insights.map((item, index) => {
            const colors = typeColors[item.type] || typeColors.info;
            return (
              <div
                key={index}
                className="card"
                style={{
                  background: colors.bg,
                  borderColor: colors.border,
                  display: 'flex',
                  alignItems: 'flex-start',
                  gap: '14px',
                }}
              >
                <div style={{
                  width: '4px',
                  height: '100%',
                  minHeight: '40px',
                  borderRadius: '4px',
                  background: colors.accent,
                  flexShrink: 0,
                }} />
                <p style={{
                  color: '#cbd5e1',
                  fontSize: '0.9rem',
                  fontWeight: 500,
                  lineHeight: 1.6,
                }}>
                  {item.text}
                </p>
              </div>
            );
          })}
        </div>
      )}

    </div>
  );
}
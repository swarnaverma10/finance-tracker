import { useEffect, useState } from "react";
import {
  BarChart, Bar, XAxis, YAxis,
  Tooltip, ResponsiveContainer, CartesianGrid
} from "recharts";
import { FaArrowUp, FaArrowDown, FaPiggyBank, FaDownload } from "react-icons/fa";
import jsPDF from "jspdf";
import "jspdf-autotable";

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

  const downloadReport = () => {
    const doc = new jsPDF();
    const date = new Date().toLocaleDateString();

    // Title
    doc.setFontSize(20);
    doc.setTextColor(99, 102, 241);
    doc.text("Finlytics - Financial Report", 15, 20);
    
    doc.setFontSize(10);
    doc.setTextColor(100, 116, 139);
    doc.text(`Generated on: ${date}`, 15, 28);

    // Summary Section
    doc.setFontSize(14);
    doc.setTextColor(30, 41, 59);
    doc.text("Summary", 15, 45);

    const summaryData = [
      ["Total Income", `Rs.${totalIncome.toLocaleString()}`],
      ["Total Expenses", `Rs.${totalExpense.toLocaleString()}`],
      ["Total Savings", `Rs.${savings.toLocaleString()}`]
    ];

    doc.autoTable({
      startY: 50,
      head: [["Category", "Amount"]],
      body: summaryData,
      theme: 'striped',
      headStyles: { fillStyle: [99, 102, 241] }
    });

    // Transactions Table
    doc.text("Recent Transactions", 15, doc.lastAutoTable.finalY + 15);
    
    const tableHeaders = [["Date", "Description", "Category", "Type", "Amount"]];
    const tableData = data.map(t => [
      new Date(t.date).toLocaleDateString(),
      t.description || "-",
      t.category || "-",
      t.type.toUpperCase(),
      `Rs.${t.amount.toLocaleString()}`
    ]);

    doc.autoTable({
      startY: doc.lastAutoTable.finalY + 20,
      head: tableHeaders,
      body: tableData,
      theme: 'grid',
      headStyles: { fillColor: [79, 70, 229] }
    });

    doc.save(`Financial_Report_${date}.pdf`);
  };

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

      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
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
            Monthly Report
          </h1>
          <p style={{ color: '#64748b', fontSize: '0.9rem', marginTop: '4px' }}>
            Summary of your financial activity
          </p>
        </div>

        <button 
          onClick={downloadReport}
          className="btn-primary" 
          style={{ 
            display: 'flex', 
            alignItems: 'center', 
            gap: '8px',
            padding: '10px 18px',
            borderRadius: '10px',
            background: 'linear-gradient(135deg, #6366f1, #4f46e5)',
            color: 'white',
            fontWeight: 600,
            fontSize: '0.85rem',
            cursor: 'pointer',
            border: 'none',
            boxShadow: '0 4px 15px rgba(99, 102, 241, 0.2)'
          }}
        >
          <FaDownload /> Download PDF
        </button>
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

      {/* BAR CHART */}
      <div className="card">
        <h3 style={{
          fontWeight: 600,
          color: '#cbd5e1',
          marginBottom: '20px',
          fontSize: '0.9rem',
        }}>
          Category Breakdown
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
            No expense data available
          </div>
        ) : (
          <ResponsiveContainer width="100%" height={280}>
            <BarChart data={categoryData}>
              <defs>
                <linearGradient id="reportBarGrad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#6366f1" />
                  <stop offset="100%" stopColor="#4f46e5" />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="rgba(99,102,241,0.06)" />
              <Bar dataKey="value" fill="url(#reportBarGrad)" radius={[6, 6, 0, 0]} />
              <XAxis dataKey="name" tick={{ fontSize: 11 }} />
              <YAxis tick={{ fontSize: 11 }} />
              <Tooltip />
            </BarChart>
          </ResponsiveContainer>
        )}
      </div>

    </div>
  );
}
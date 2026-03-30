import { useState, useEffect } from "react";
import { FaTrash, FaEdit, FaPlus, FaSave, FaExclamationTriangle, FaCheckCircle, FaChartBar, FaWallet } from "react-icons/fa";

export default function Budget() {
  const [transactions, setTransactions] = useState([]);
  const [budgetLimits, setBudgetLimits] = useState({});
  const [editCategory, setEditCategory] = useState("");
  const [limitInput, setLimitInput] = useState("");

  const categories = [
    "Food", "Transport", "Shopping", "Entertainment", "Health", "Education", "Bills", "Others"
  ];

  useEffect(() => {
    const storedTransactions = JSON.parse(localStorage.getItem("transactions")) || [];
    const storedLimits = JSON.parse(localStorage.getItem("budgetLimits")) || {};
    setTransactions(storedTransactions);
    setBudgetLimits(storedLimits);
  }, []);

  const saveLimits = (newLimits) => {
    localStorage.setItem("budgetLimits", JSON.stringify(newLimits));
    setBudgetLimits(newLimits);
  };

  const handleSetLimit = () => {
    if (!editCategory || !limitInput) return;
    const newLimits = { ...budgetLimits, [editCategory]: Number(limitInput) };
    saveLimits(newLimits);
    setEditCategory("");
    setLimitInput("");
  };

  const handleDeleteLimit = (cat) => {
    const newLimits = { ...budgetLimits };
    delete newLimits[cat];
    saveLimits(newLimits);
  };

  const getActualSpending = (category) => {
    return transactions
      .filter(t => t.type === "expense" && t.category.toLowerCase() === category.toLowerCase())
      .reduce((acc, t) => acc + Number(t.amount), 0);
  };

  const totalBudget = Object.values(budgetLimits).reduce((a, b) => a + b, 0);
  const totalSpent = categories.reduce((acc, cat) => acc + getActualSpending(cat), 0);
  const budgetUtilization = totalBudget > 0 ? (totalSpent / totalBudget) * 100 : 0;

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '32px', animation: 'fadeIn 0.5s ease-out' }}>
      
      {/* HEADER */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', flexWrap: 'wrap', gap: '20px' }}>
        <div>
          <h1 style={{
            fontSize: '2.5rem',
            fontWeight: 800,
            background: 'linear-gradient(135deg, #f8fafc 0%, #cbd5e1 100%)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            letterSpacing: '-0.025em',
            margin: 0
          }}>
            Budget Limits
          </h1>
          <p style={{ color: '#64748b', fontSize: '1rem', marginTop: '6px' }}>
            Set monthly spending caps and stay within your financial goals
          </p>
        </div>
        
        <div style={{ padding: '20px 24px', background: 'rgba(30, 41, 59, 0.4)', borderRadius: '24px', border: '1px solid rgba(148, 163, 184, 0.1)', backdropFilter: 'blur(10px)', display: 'flex', gap: '32px' }}>
          <div>
            <p style={{ fontSize: '0.7rem', color: '#64748b', textTransform: 'uppercase', fontWeight: 700, letterSpacing: '0.05em' }}>Total Budget</p>
            <p style={{ fontSize: '1.25rem', fontWeight: 800, color: '#f8fafc', marginTop: '4px' }}>₹{totalBudget.toLocaleString()}</p>
          </div>
          <div style={{ width: '1px', background: 'rgba(148, 163, 184, 0.1)' }} />
          <div>
            <p style={{ fontSize: '0.7rem', color: '#64748b', textTransform: 'uppercase', fontWeight: 700, letterSpacing: '0.05em' }}>Utilization</p>
            <p style={{ fontSize: '1.25rem', fontWeight: 800, color: budgetUtilization > 100 ? '#f43f5e' : '#10b981', marginTop: '4px' }}>{budgetUtilization.toFixed(1)}%</p>
          </div>
        </div>
      </div>

      <div className="grid md:grid-cols-3 gap-8">
        
        {/* SET LIMIT FORM */}
        <div className="card" style={{ height: 'fit-content', position: 'sticky', top: '24px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '24px' }}>
            <div style={{ width: '40px', height: '40px', borderRadius: '12px', background: 'rgba(99, 102, 241, 0.1)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#818cf8' }}>
              <FaWallet />
            </div>
            <h3 style={{ fontWeight: 700, color: '#f1f5f9', margin: 0 }}>Set category limit</h3>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
              <label style={{ fontSize: '0.75rem', fontWeight: 600, color: '#64748b', marginLeft: '4px' }}>Category</label>
              <select 
                value={editCategory} 
                onChange={(e) => setEditCategory(e.target.value)}
                className="input"
                style={{ width: '100%', background: '#0f172a' }}
              >
                <option value="">Select Category</option>
                {categories.map(cat => (
                  <option key={cat} value={cat}>{cat}</option>
                ))}
              </select>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
              <label style={{ fontSize: '0.75rem', fontWeight: 600, color: '#64748b', marginLeft: '4px' }}>Monthly Limit (₹)</label>
              <input 
                type="number" 
                value={limitInput} 
                onChange={(e) => setLimitInput(e.target.value)}
                placeholder="0.00"
                className="input"
                style={{ width: '100%', background: '#0f172a' }}
              />
            </div>

            <button 
              onClick={handleSetLimit}
              className="btn"
              style={{ padding: '14px', marginTop: '8px', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '10px' }}
            >
              <FaSave /> Save Budget Limit
            </button>
          </div>
        </div>

        {/* BUDGET PROGRESS */}
        <div className="md:col-span-2" style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          {categories.filter(cat => budgetLimits[cat]).length === 0 ? (
            <div className="card" style={{ textAlign: 'center', padding: '64px' }}>
              <FaChartBar style={{ fontSize: '3rem', color: '#1e293b', marginBottom: '20px' }} />
              <h3 style={{ color: '#94a3b8', fontWeight: 600 }}>No budget limits set yet</h3>
              <p style={{ color: '#475569', fontSize: '0.9rem', marginTop: '8px' }}>Start managing your money by setting monthly targets for your expenses.</p>
            </div>
          ) : (
            categories.filter(cat => budgetLimits[cat]).map(cat => {
              const spent = getActualSpending(cat);
              const limit = budgetLimits[cat];
              const percent = Math.min((spent / limit) * 100, 100);
              const isOver = spent > limit;

              return (
                <div key={cat} className="card" style={{ padding: '24px', borderLeft: `4px solid ${isOver ? '#f43f5e' : '#10b981'}` }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '16px' }}>
                    <div>
                      <h4 style={{ fontSize: '1.1rem', fontWeight: 700, color: '#f1f5f9', margin: 0 }}>{cat}</h4>
                      <p style={{ fontSize: '0.8rem', color: '#64748b', marginTop: '4px' }}>
                        {isOver ? (
                          <span style={{ color: '#fb7185', display: 'flex', alignItems: 'center', gap: '4px', fontWeight: 500 }}>
                            <FaExclamationTriangle /> Over budget by ₹{(spent - limit).toLocaleString()}
                          </span>
                        ) : (
                          <span style={{ color: '#34d399', display: 'flex', alignItems: 'center', gap: '4px', fontWeight: 500 }}>
                            <FaCheckCircle /> ₹{(limit - spent).toLocaleString()} remaining
                          </span>
                        )}
                      </p>
                    </div>
                    <div style={{ textAlign: 'right', display: 'flex', gap: '12px', alignItems: 'center' }}>
                      <div>
                        <p style={{ fontSize: '1rem', fontWeight: 800, color: '#f8fafc', margin: 0 }}>₹{spent.toLocaleString()}</p>
                        <p style={{ fontSize: '0.7rem', color: '#64748b', fontWeight: 600 }}>of ₹{limit.toLocaleString()}</p>
                      </div>
                      <button 
                        onClick={() => { setEditCategory(cat); setLimitInput(limit.toString()); }}
                        style={{ background: 'rgba(99, 102, 241, 0.1)', border: 'none', color: '#818cf8', width: '32px', height: '32px', borderRadius: '8px', cursor: 'pointer' }}
                      >
                        <FaEdit size={12} />
                      </button>
                      <button 
                        onClick={() => handleDeleteLimit(cat)}
                        style={{ background: 'rgba(244, 63, 94, 0.1)', border: 'none', color: '#fb7185', width: '32px', height: '32px', borderRadius: '8px', cursor: 'pointer' }}
                      >
                        <FaTrash size={12} />
                      </button>
                    </div>
                  </div>

                  {/* Progress Bar Container */}
                  <div style={{ width: '100%', height: '10px', background: '#1e293b', borderRadius: '10px', overflow: 'hidden' }}>
                    <div style={{ 
                      width: `${percent}%`, 
                      height: '100%', 
                      background: isOver ? 'linear-gradient(90deg, #f43f5e, #fb7185)' : 'linear-gradient(90deg, #10b981, #34d399)',
                      borderRadius: '10px',
                      transition: 'width 0.6s cubic-bezier(0.22, 1, 0.36, 1)' 
                    }} />
                  </div>
                </div>
              );
            })
          )}
        </div>

      </div>

      <style>{`
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(10px); }
          to { opacity: 1; transform: translateY(0); }
        }
      `}</style>
    </div>
  );
}
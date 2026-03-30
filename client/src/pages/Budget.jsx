import { useState, useEffect } from "react";
import { FaTrash, FaEdit, FaPlus, FaSave, FaArrowUp, FaArrowDown } from "react-icons/fa";

export default function Transactions() {

  const [transactions, setTransactions] = useState([]);
  const [editId, setEditId] = useState(null);

  const [form, setForm] = useState({
    title: "",
    amount: "",
    category: "",
    date: "",
    payment: "",
    type: "expense"
  });

  useEffect(() => {
    const stored = JSON.parse(localStorage.getItem("transactions")) || [];
    setTransactions(stored);
  }, []);

  const saveToStorage = (data) => {
    localStorage.setItem("transactions", JSON.stringify(data));
    setTransactions(data);
  };

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = () => {
    if (!form.title || !form.amount) return;

    if (editId) {
      const updated = transactions.map(t =>
        t.id === editId ? { ...form, id: editId } : t
      );
      saveToStorage(updated);
      setEditId(null);
    } else {
      const newData = [...transactions, { ...form, id: Date.now() }];
      saveToStorage(newData);
    }

    setForm({
      title: "",
      amount: "",
      category: "",
      date: "",
      payment: "",
      type: "expense"
    });
  };

  const deleteTransaction = (id) => {
    const updated = transactions.filter(t => t.id !== id);
    saveToStorage(updated);
  };

  const editTransaction = (t) => {
    setForm(t);
    setEditId(t.id);
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
          Budget & Transactions
        </h1>
        <p style={{ color: '#64748b', fontSize: '0.9rem', marginTop: '4px' }}>
          Track and manage your budget
        </p>
      </div>

      <div className="grid md:grid-cols-2 gap-6">

        {/* FORM */}
        <div className="card" style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
          <h3 style={{
            fontWeight: 600,
            color: '#cbd5e1',
            fontSize: '0.95rem',
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
            marginBottom: '4px',
          }}>
            {editId ? <><FaSave style={{ color: '#f59e0b' }} /> Edit Transaction</> : <><FaPlus style={{ color: '#6366f1' }} /> Add Transaction</>}
          </h3>

          <input name="title" value={form.title} onChange={handleChange} placeholder="Title" className="input" />
          <input name="amount" value={form.amount} onChange={handleChange} placeholder="Amount (₹)" className="input" type="number" />

          <select name="type" value={form.type} onChange={handleChange} className="input">
            <option value="expense">Expense</option>
            <option value="income">Income</option>
          </select>

          <input name="category" value={form.category} onChange={handleChange} placeholder="Category" className="input" />
          <input type="date" name="date" value={form.date} onChange={handleChange} className="input" />

          <select name="payment" value={form.payment} onChange={handleChange} className="input">
            <option>UPI</option>
            <option>Cash</option>
            <option>Card</option>
          </select>

          <button onClick={handleSubmit} className="btn" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px', marginTop: '4px' }}>
            {editId ? <><FaSave /> Update</> : <><FaPlus /> Add Transaction</>}
          </button>
        </div>

        {/* LIST */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>

          {transactions.length === 0 ? (
            <div className="card" style={{
              textAlign: 'center',
              padding: '48px 24px',
              color: '#475569',
            }}>
              <div style={{ fontSize: '1.5rem', marginBottom: '12px', color: '#475569' }}>
                <FaPlus style={{ opacity: 0.4 }} />
              </div>
              <p style={{ fontWeight: 500 }}>No transactions yet</p>
              <p style={{ fontSize: '0.8rem', marginTop: '4px' }}>Add your first transaction</p>
            </div>
          ) : (
            transactions.map((t) => (
              <div key={t.id} className="card" style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                padding: '16px 20px',
              }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
                  <div style={{
                    width: '36px',
                    height: '36px',
                    borderRadius: '10px',
                    background: t.type === 'income' ? 'rgba(16, 185, 129, 0.1)' : 'rgba(244, 63, 94, 0.1)',
                    border: `1px solid ${t.type === 'income' ? 'rgba(16, 185, 129, 0.2)' : 'rgba(244, 63, 94, 0.2)'}`,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontSize: '0.9rem',
                    flexShrink: 0,
                  }}>
                    {t.type === 'income' ? <FaArrowUp style={{fontSize:'0.75rem'}} /> : <FaArrowDown style={{fontSize:'0.75rem'}} />}
                  </div>
                  <div>
                    <h3 style={{ fontWeight: 600, color: '#e2e8f0', fontSize: '0.9rem' }}>{t.title}</h3>
                    <p style={{ fontSize: '0.7rem', color: '#64748b', marginTop: '2px' }}>
                      {t.category} • {t.payment} • {t.date}
                    </p>
                  </div>
                </div>

                <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
                  <p style={{
                    fontWeight: 700,
                    color: t.type === "income" ? "#10b981" : "#f43f5e",
                    fontSize: '0.95rem',
                  }}>
                    {t.type === "income" ? "+" : "-"}₹{Number(t.amount).toLocaleString()}
                  </p>

                  <div style={{ display: 'flex', gap: '6px' }}>
                    <button
                      onClick={() => editTransaction(t)}
                      style={{
                        width: '32px', height: '32px', borderRadius: '8px',
                        background: 'rgba(99, 102, 241, 0.1)', border: '1px solid rgba(99, 102, 241, 0.15)',
                        color: '#818cf8', cursor: 'pointer', display: 'flex', alignItems: 'center',
                        justifyContent: 'center', fontSize: '0.75rem', transition: 'all 0.2s',
                      }}
                    >
                      <FaEdit />
                    </button>
                    <button
                      onClick={() => deleteTransaction(t.id)}
                      style={{
                        width: '32px', height: '32px', borderRadius: '8px',
                        background: 'rgba(244, 63, 94, 0.1)', border: '1px solid rgba(244, 63, 94, 0.15)',
                        color: '#fb7185', cursor: 'pointer', display: 'flex', alignItems: 'center',
                        justifyContent: 'center', fontSize: '0.75rem', transition: 'all 0.2s',
                      }}
                    >
                      <FaTrash />
                    </button>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>

      </div>
    </div>
  );
}
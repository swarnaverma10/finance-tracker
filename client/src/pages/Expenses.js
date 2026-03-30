import { useState, useEffect } from "react";
import { FaTrash, FaEdit, FaPlus, FaSave, FaArrowUp, FaArrowDown, FaHistory, FaFilter, FaReceipt } from "react-icons/fa";

export default function Expenses() {
  const [expenses, setExpenses] = useState([]);
  const [editId, setEditId] = useState(null);

  const [form, setForm] = useState({
    title: "",
    amount: "",
    category: "",
    date: new Date().toISOString().split('T')[0],
    payment: "",
    type: "expense",
  });

  useEffect(() => {
    const saved = JSON.parse(localStorage.getItem("transactions")) || [];
    setExpenses(saved);
  }, []);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = () => {
    if (!form.title || !form.amount) return;

    let updated;
    if (editId) {
      updated = expenses.map((e) =>
        e.id === editId ? { ...form, id: editId } : e
      );
      setEditId(null);
    } else {
      updated = [{ ...form, id: Date.now() }, ...expenses];
    }

    setExpenses(updated);
    localStorage.setItem("transactions", JSON.stringify(updated));

    setForm({
      title: "",
      amount: "",
      category: "",
      date: new Date().toISOString().split('T')[0],
      payment: "",
      type: "expense",
    });
  };

  const handleEdit = (item) => {
    setForm(item);
    setEditId(item.id);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleDelete = (id) => {
    const updated = expenses.filter((e) => e.id !== id);
    setExpenses(updated);
    localStorage.setItem("transactions", JSON.stringify(updated));
  };

  return (
    <div className="space-y-8 animate-fade-in-up">

      {/* 🔥 HEADER SECTION */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-black text-gradient-silver tracking-tight">
            Transaction Manager
          </h1>
          <p className="text-slate-500 text-sm mt-1 flex items-center gap-2">
            <FaHistory className="text-indigo-500/50" />
            Track and categorize your financial activities
          </p>
        </div>
        <div className="flex items-center gap-2">
          <button className="flex items-center gap-2 px-4 py-2 rounded-xl bg-slate-800/40 border border-slate-700/50 text-[11px] font-bold text-slate-400 uppercase tracking-widest hover:text-white hover:border-indigo-500/30 transition-all">
            <FaFilter className="text-[10px]" /> Filter
          </button>
          <button className="flex items-center gap-2 px-4 py-2 rounded-xl bg-slate-800/40 border border-slate-700/50 text-[11px] font-bold text-slate-400 uppercase tracking-widest hover:text-white hover:border-indigo-500/30 transition-all">
            <FaReceipt className="text-[10px]" /> Export
          </button>
        </div>
      </div>

      {/* 🔥 FORM CARD */}
      <div className="card border-indigo-500/10">
        <div className="flex items-center gap-3 mb-6">
          <div className={`w-10 h-10 rounded-xl flex items-center justify-center text-white shadow-lg ${editId ? 'bg-amber-500 shadow-amber-500/20' : 'bg-indigo-600 shadow-indigo-600/20'}`}>
            {editId ? <FaEdit /> : <FaPlus />}
          </div>
          <h3 className="font-bold text-slate-200">
            {editId ? 'Modify Transaction' : 'Record New Entry'}
          </h3>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
          <div className="space-y-1.5">
            <label className="text-[10px] font-bold text-slate-500 uppercase tracking-wider ml-1">Title</label>
            <input name="title" value={form.title} onChange={handleChange} placeholder="e.g. Monthly Rent" className="input" />
          </div>
          <div className="space-y-1.5">
            <label className="text-[10px] font-bold text-slate-500 uppercase tracking-wider ml-1">Amount (₹)</label>
            <input name="amount" value={form.amount} onChange={handleChange} placeholder="0.00" className="input" type="number" />
          </div>
          <div className="space-y-1.5">
            <label className="text-[10px] font-bold text-slate-500 uppercase tracking-wider ml-1">Category</label>
            <input name="category" value={form.category} onChange={handleChange} placeholder="e.g. Housing" className="input" />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="space-y-1.5">
            <label className="text-[10px] font-bold text-slate-500 uppercase tracking-wider ml-1">Date</label>
            <input type="date" name="date" value={form.date} onChange={handleChange} className="input" />
          </div>
          <div className="space-y-1.5">
            <label className="text-[10px] font-bold text-slate-500 uppercase tracking-wider ml-1">Payment Method</label>
            <input name="payment" value={form.payment} onChange={handleChange} placeholder="e.g. Credit Card" className="input" />
          </div>
          <div className="space-y-1.5">
            <label className="text-[10px] font-bold text-slate-500 uppercase tracking-wider ml-1">Transaction Type</label>
            <select name="type" value={form.type} onChange={handleChange} className="input">
              <option value="expense">Expense</option>
              <option value="income">Income</option>
            </select>
          </div>
        </div>

        <div className="flex justify-end gap-3">
          {editId && (
            <button 
              onClick={() => { setEditId(null); setForm({ title: "", amount: "", category: "", date: new Date().toISOString().split('T')[0], payment: "", type: "expense" }); }}
              className="px-6 py-3 rounded-xl bg-slate-800 text-slate-300 text-xs font-bold uppercase tracking-widest hover:bg-slate-700 transition-all font-sans"
            >
              Cancel
            </button>
          )}
          <button onClick={handleSubmit} className={`btn px-10 flex items-center gap-2 ${editId ? 'from-amber-500 to-orange-600 shadow-amber-500/30' : ''}`}>
            {editId ? <><FaSave /> Update Entry</> : <><FaPlus /> Record Entry</>}
          </button>
        </div>
      </div>

      {/* 🔥 TRANSACTION LIST */}
      <div className="space-y-4">
        <div className="flex items-center justify-between px-2">
          <h3 className="font-bold text-slate-400 text-sm uppercase tracking-[0.15em]">
            History <span className="text-slate-600 ml-1 font-medium">({expenses.length})</span>
          </h3>
          <div className="h-[1px] flex-1 bg-slate-800/50 mx-6 hidden sm:block"></div>
          <div className="text-[10px] font-bold text-slate-600 uppercase tracking-widest">Ordered by Date</div>
        </div>

        {expenses.length === 0 ? (
          <div className="card py-20 text-center space-y-4 border-dashed border-slate-800 bg-transparent">
            <div className="w-16 h-16 rounded-full bg-slate-900 flex items-center justify-center mx-auto border border-slate-800 shadow-inner">
              <FaReceipt className="text-slate-700 text-2xl" />
            </div>
            <div>
              <p className="font-bold text-slate-400">No transactions recorded</p>
              <p className="text-xs text-slate-600 mt-1">Start by adding your first income or expense above.</p>
            </div>
          </div>
        ) : (
          <div className="space-y-3">
            {expenses.map((e) => (
              <div
                key={e.id}
                className="card p-3 md:p-4 hover:border-indigo-500/20 group transition-all duration-300"
              >
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                  <div className="flex items-center gap-4">
                    {/* Icon Container */}
                    <div className={`w-12 h-12 rounded-2xl flex items-center justify-center text-lg flex-shrink-0 transition-transform group-hover:scale-110 shadow-lg ${
                      e.type === 'income' 
                      ? 'bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 shadow-emerald-500/5' 
                      : 'bg-rose-500/10 border border-rose-500/20 text-rose-400 shadow-rose-500/5'
                    }`}>
                      {e.type === 'income' ? <FaArrowUp className="text-sm" /> : <FaArrowDown className="text-sm" />}
                    </div>
                    
                    <div className="space-y-1">
                      <h3 className="font-bold text-slate-100 group-hover:text-indigo-300 transition-colors text-sm sm:text-base capitalize">
                        {e.title}
                      </h3>
                      <div className="flex flex-wrap items-center gap-2 sm:gap-3">
                        <span className="px-2 py-0.5 rounded-lg bg-indigo-500/10 border border-indigo-500/20 text-[10px] font-bold text-indigo-400 uppercase tracking-wider">
                          {e.category || 'Uncategorized'}
                        </span>
                        <span className="text-[11px] text-slate-500 font-medium flex items-center gap-1.5">
                          <span className="w-1 h-1 rounded-full bg-slate-700" />
                          {e.payment || 'N/A'}
                        </span>
                        <span className="text-[11px] text-slate-500 font-medium flex items-center gap-1.5">
                          <span className="w-1 h-1 rounded-full bg-slate-700" />
                          {e.date}
                        </span>
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center justify-between sm:justify-end gap-6 sm:gap-10 pl-16 sm:pl-0 border-t border-slate-800/30 sm:border-t-0 pt-3 sm:pt-0">
                    <div className="text-right">
                      <p className={`text-lg font-black tracking-tight ${e.type === 'income' ? 'text-emerald-400' : 'text-rose-400'}`}>
                        {e.type === "income" ? "+" : "-"}₹{Number(e.amount).toLocaleString()}
                      </p>
                    </div>

                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => handleEdit(e)}
                        className="w-10 h-10 rounded-xl bg-slate-800/50 border border-slate-700 text-slate-400 flex items-center justify-center hover:bg-amber-500/10 hover:border-amber-500/30 hover:text-amber-500 transition-all shadow-sm"
                      >
                        <FaEdit className="text-xs" />
                      </button>
                      <button
                        onClick={() => handleDelete(e.id)}
                        className="w-10 h-10 rounded-xl bg-slate-800/50 border border-slate-700 text-slate-400 flex items-center justify-center hover:bg-rose-500/10 hover:border-rose-500/30 hover:text-rose-500 transition-all shadow-sm"
                      >
                        <FaTrash className="text-xs" />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
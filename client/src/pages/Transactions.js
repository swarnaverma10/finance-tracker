import { useState, useEffect } from "react";
import { FaTrash, FaEdit } from "react-icons/fa";

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
    <div className="p-6 space-y-6">

      <h1 className="text-2xl font-bold">Transactions</h1>

      <div className="grid md:grid-cols-2 gap-6">

        {/* FORM */}
        <div className="card space-y-3">

          <input name="title" value={form.title} onChange={handleChange} placeholder="Title" className="input" />
          <input name="amount" value={form.amount} onChange={handleChange} placeholder="Amount" className="input" />

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

          <button onClick={handleSubmit} className="btn">
            {editId ? "Update Transaction" : "+ Add Transaction"}
          </button>

        </div>

        {/* LIST */}
        <div className="space-y-3">

          {transactions.length === 0 && (
            <p className="text-gray-400">No transactions yet</p>
          )}

          {transactions.map((t) => (
            <div key={t.id} className="card flex justify-between items-center">

              <div>
                <h3>{t.title}</h3>
                <p className="text-sm text-gray-500">
                  {t.category} • {t.payment} • {t.date}
                </p>
              </div>

              <div className="flex items-center gap-4">
                <p className={`font-bold ${t.type === "income" ? "text-green-500" : "text-red-500"}`}>
                  ₹{t.amount}
                </p>

                <FaEdit className="cursor-pointer" onClick={() => editTransaction(t)} />
                <FaTrash className="cursor-pointer text-red-500" onClick={() => deleteTransaction(t.id)} />
              </div>

            </div>
          ))}

        </div>

      </div>

    </div>
  );
}
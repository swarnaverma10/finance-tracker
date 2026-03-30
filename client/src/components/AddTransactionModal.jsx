import React, { useState } from "react";
import axios from "axios";

const AddTransactionModal = ({ close, refresh }) => {
  const [form, setForm] = useState({
    title: "",
    amount: "",
    type: "expense",
    category: ""
  });

  const handleSubmit = async () => {
    const token = localStorage.getItem("token");
    const API_URL = process.env.REACT_APP_API_URL || "http://localhost:5000/api";

    await axios.post(`${API_URL}/transactions`, form, {
      headers: { Authorization: `Bearer ${token}` }
    });

    refresh();
    close();
  };

  return (
    <div style={{
      position: "fixed",
      top: 0,
      left: 0,
      width: "100%",
      height: "100%",
      background: "rgba(0,0,0,0.5)"
    }}>
      <div style={{
        background: "white",
        padding: "20px",
        width: "300px",
        margin: "100px auto",
        borderRadius: "10px"
      }}>
        <h3>Add Transaction</h3>

        <input placeholder="Title" onChange={e => setForm({...form, title: e.target.value})} />
        <input placeholder="Amount" onChange={e => setForm({...form, amount: e.target.value})} />

        <button onClick={handleSubmit}>Add</button>
        <button onClick={close}>Cancel</button>
      </div>
    </div>
  );
};

export default AddTransactionModal;
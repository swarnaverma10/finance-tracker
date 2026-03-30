import React, { useEffect, useState } from "react";
import MainLayout from "../components/layout/MainLayout";
import API from "../services/api";

const MonthlyReport = () => {
  const [transactions, setTransactions] = useState([]);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const res = await API.get("/transactions");
      setTransactions(res.data);
    } catch (err) {
      console.log(err.message);
    }
  };

  const monthlyData = {};

  transactions.forEach((t) => {
    const date = new Date(t.date);
    const month = date.toLocaleString("default", {
      month: "long",
      year: "numeric",
    });

    if (!monthlyData[month]) {
      monthlyData[month] = { income: 0, expense: 0 };
    }

    if (t.type === "income") {
      monthlyData[month].income += Number(t.amount);
    } else {
      monthlyData[month].expense += Number(t.amount);
    }
  });

  return (
    <MainLayout>

      <h1 className="text-2xl font-bold mb-6 text-purple-400">
        📅 Monthly Report
      </h1>

      {Object.keys(monthlyData).length === 0 ? (
        <p className="text-gray-400">No data available</p>
      ) : (
        Object.keys(monthlyData).map((month) => {
          const data = monthlyData[month];
          const balance = data.income - data.expense;

          return (
            <div
              key={month}
              className="bg-[#1e293b] p-6 mb-4 rounded-2xl"
            >
              <h2 className="font-bold mb-2">{month}</h2>

              <div className="flex justify-between">
                <span className="text-green-400">
                  Income: ₹{data.income}
                </span>

                <span className="text-red-400">
                  Expense: ₹{data.expense}
                </span>

                <span className="text-purple-400">
                  Balance: ₹{balance}
                </span>
              </div>
            </div>
          );
        })
      )}

    </MainLayout>
  );
};

export default MonthlyReport;
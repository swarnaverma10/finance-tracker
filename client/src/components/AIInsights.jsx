import React from "react";

const AIInsights = ({ transactions }) => {
  if (!transactions || transactions.length === 0) {
    return <p className="text-gray-400">No insights yet</p>;
  }

  const totalExpense = transactions
    .filter((t) => t.type === "expense")
    .reduce((acc, t) => acc + t.amount, 0);

  const foodExpense = transactions
    .filter((t) => t.category === "Food")
    .reduce((acc, t) => acc + t.amount, 0);

  return (
    <div className="space-y-4">

      <div className="bg-purple-600/20 border border-purple-500 p-4 rounded-xl">
        💡 Total spending this month: ₹{totalExpense}
      </div>

      {foodExpense > totalExpense * 0.4 && (
        <div className="bg-red-600/20 border border-red-500 p-4 rounded-xl">
          ⚠️ High food expenses detected! Try reducing by 10%
        </div>
      )}

      <div className="bg-indigo-600/20 border border-indigo-500 p-4 rounded-xl">
        📊 Track your daily spending to improve savings
      </div>

    </div>
  );
};

export default AIInsights;
"use client";

import Sidebar from "@/components/layout/Sidebar";
import Navbar from "@/components/layout/Navbar";
import Card from "@/components/ui/Card";

const expenses = [
  { id: 1, category: "Food", amount: 500, date: "Today" },
  { id: 2, category: "Travel", amount: 1200, date: "Yesterday" },
];

export default function Expenses() {
  return (
    <div className="flex">
      <Sidebar />

      <div className="flex-1 p-6 space-y-6">
        <Navbar />

        <div className="flex justify-between">
          <h1 className="text-xl font-bold">Expenses</h1>
          <button className="bg-indigo-500 px-4 py-2 rounded-xl">
            + Add Expense
          </button>
        </div>

        <div className="space-y-4">
          {expenses.map((e) => (
            <Card key={e.id} className="flex justify-between">
              <div>
                <p>{e.category}</p>
                <p className="text-gray-400">{e.date}</p>
              </div>

              <p className="text-red-400 font-bold">₹{e.amount}</p>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
}
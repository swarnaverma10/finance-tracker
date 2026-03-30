"use client";

import {
  PieChart, Pie, Tooltip,
  LineChart, Line, XAxis, YAxis, CartesianGrid,
  BarChart, Bar
} from "recharts";

const data = [
  { name: "Food", value: 8000 },
  { name: "Travel", value: 5000 },
  { name: "Shopping", value: 7000 },
];

export default function Charts() {
  return (
    <div className="grid md:grid-cols-2 gap-6">

      <div className="glass p-4 rounded-xl">
        <h3 className="mb-2">Category Distribution</h3>
        <PieChart width={300} height={250}>
          <Pie data={data} dataKey="value" />
          <Tooltip />
        </PieChart>
      </div>

      <div className="glass p-4 rounded-xl">
        <h3 className="mb-2">Spending Trend</h3>
        <LineChart width={400} height={250} data={data}>
          <Line dataKey="value" />
          <XAxis dataKey="name" />
          <YAxis />
          <CartesianGrid stroke="#ccc" />
        </LineChart>
      </div>

      <div className="glass p-4 rounded-xl md:col-span-2">
        <h3 className="mb-2">Category Comparison</h3>
        <BarChart width={600} height={250} data={data}>
          <Bar dataKey="value" />
          <XAxis dataKey="name" />
          <YAxis />
        </BarChart>
      </div>

    </div>
  );
}
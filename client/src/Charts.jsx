import {
  PieChart,
  Pie,
  Tooltip,
  Cell,
  ResponsiveContainer,
  Legend,
} from "recharts";

const data = [
  { name: "Food", value: 400 },
  { name: "Shopping", value: 300 },
  { name: "Travel", value: 200 },
];

const COLORS = ["#6366f1", "#8b5cf6", "#a78bfa"];

const Charts = () => {
  return (
    <div className="flex flex-col items-center justify-center">

      {/* TITLE */}
      <h3 className="text-lg font-semibold mb-4 text-gray-700">
        Expense Distribution
      </h3>

      {/* CHART */}
      <ResponsiveContainer width="100%" height={250}>
        <PieChart>
          <Pie
            data={data}
            dataKey="value"
            outerRadius={90}
            innerRadius={50}
            paddingAngle={5}
          >
            {data.map((entry, index) => (
              <Cell key={index} fill={COLORS[index]} />
            ))}
          </Pie>

          <Tooltip />
          <Legend verticalAlign="bottom" height={36} />
        </PieChart>
      </ResponsiveContainer>

    </div>
  );
};

export default Charts;
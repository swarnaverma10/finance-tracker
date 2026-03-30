import Card from "../ui/Card";

export default function SummaryCards() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
      <Card>
        <p className="text-gray-400">Total Spent</p>
        <h2 className="text-2xl font-bold">₹25,000</h2>
      </Card>

      <Card>
        <p className="text-gray-400">Top Category</p>
        <h2 className="text-xl">Food 🍔</h2>
      </Card>

      <Card>
        <p className="text-gray-400">Payment Method</p>
        <h2 className="text-xl">UPI</h2>
      </Card>

      <Card>
        <p className="text-gray-400">Budget Alert</p>
        <h2 className="text-red-400 font-bold">80% Used</h2>
      </Card>
    </div>
  );
}
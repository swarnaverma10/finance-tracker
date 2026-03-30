"use client";

import Sidebar from "@/components/layout/Sidebar";
import Navbar from "@/components/layout/Navbar";
import Card from "@/components/ui/Card";

export default function Budget() {
  return (
    <div className="flex">
      <Sidebar />

      <div className="flex-1 p-6 space-y-6">
        <Navbar />

        <h1 className="text-xl font-bold">Budget</h1>

        <Card>
          <p>Food Budget</p>

          <div className="w-full bg-gray-700 h-2 rounded mt-2">
            <div className="bg-red-500 h-2 w-[80%] rounded"></div>
          </div>
        </Card>
      </div>
    </div>
  );
}
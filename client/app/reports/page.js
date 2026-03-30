"use client";

import Sidebar from "@/components/layout/Sidebar";
import Navbar from "@/components/layout/Navbar";

export default function Reports() {
  return (
    <div className="flex">
      <Sidebar />

      <div className="flex-1 p-6 space-y-6">
        <Navbar />

        <h1 className="text-xl font-bold">Reports</h1>

        <button className="bg-green-500 px-4 py-2 rounded-xl">
          Download PDF
        </button>
      </div>
    </div>
  );
}
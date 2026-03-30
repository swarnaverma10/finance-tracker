"use client";

import Sidebar from "@/components/layout/Sidebar";
import Navbar from "@/components/layout/Navbar";
import SummaryCards from "@/components/dashboard/SummaryCards";
import Charts from "@/components/dashboard/Charts";
import AIInsights from "@/components/dashboard/AIInsights";
import { motion } from "framer-motion";

export default function Dashboard() {
  return (
    <div className="flex">
      <Sidebar />

      <div className="flex-1 p-6 space-y-6">
        <Navbar />

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <SummaryCards />
        </motion.div>

        <Charts />
        <AIInsights />
      </div>
    </div>
  );
}
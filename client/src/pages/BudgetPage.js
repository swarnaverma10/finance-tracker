import React from "react";
import MainLayout from "../components/layout/MainLayout";
import Budget from "./Budget";

const BudgetPage = () => {
  return (
    <MainLayout>
      <h1 className="text-2xl font-bold mb-6 text-purple-400">
        Budget Overview
      </h1>

      <div className="bg-[#1e293b] p-6 rounded-2xl shadow">
        <Budget />
      </div>
    </MainLayout>
  );
};

export default BudgetPage;
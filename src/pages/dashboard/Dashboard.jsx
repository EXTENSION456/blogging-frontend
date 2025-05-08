import React from "react";
import { Outlet } from "react-router-dom";
import Header from "./Header";
import Sidebar from "./Sidebar";

const Dashboard = () => {
  return (
    <div className="flex flex-col min-h-screen">
      {/* Fixed Header */}
      <div className="z-50">
        <Header />
      </div>

      {/* Main Content Below Header */}
      <div className="flex flex-1">
        {/* Sidebar */}
        <aside className="bg-gray-200 overflow-y-auto">
          <Sidebar />
        </aside>

        {/* Page Content */}
        <main className="flex-1 bg-gray-100 overflow-y-auto">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default Dashboard;

"use client";

import { useState } from "react";
import { DashboardSidebar } from "@/components/dashboard/sidebar";
import { MainContent } from "@/components/dashboard/main-content";

export default function DashboardPage() {
  const [collapsed, setCollapsed] = useState(false);

  return (
    <div className="flex flex-1 overflow-hidden relative">
      <DashboardSidebar
        collapsed={collapsed}
        onToggle={() => setCollapsed((c) => !c)}
      />
      <MainContent />
    </div>
  );
}

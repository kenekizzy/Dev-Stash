"use client";

import { useState } from "react";
import { DashboardSidebar } from "@/components/dashboard/sidebar";

export default function DashboardPage() {
  const [collapsed, setCollapsed] = useState(false);

  return (
    <div className="flex flex-1 overflow-hidden relative">
      <DashboardSidebar
        collapsed={collapsed}
        onToggle={() => setCollapsed((c) => !c)}
      />

      <main className="flex-1 overflow-auto p-6">
        <h2 className="text-sm font-semibold text-foreground">Main</h2>
      </main>
    </div>
  );
}

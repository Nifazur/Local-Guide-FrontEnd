"use client";

import { useState } from "react";
import { ProtectedRoute } from "@/components/auth/ProtectedRoute";
import { DashboardSidebar } from "@/components/layout/DashboardSidebar";
import { DashboardHeader } from "@/components/layout/DashboardHeader";
import { cn } from "@/lib/utils";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <ProtectedRoute>
      <div className="flex min-h-screen">
        {/* Desktop Sidebar */}
        <div className="hidden md:block">
          <DashboardSidebar
            collapsed={sidebarCollapsed}
            onToggle={() => setSidebarCollapsed(!sidebarCollapsed)}
          />
        </div>

        {/* Mobile Sidebar Overlay */}
        {mobileOpen && (
          <div
            className="fixed inset-0 z-30 bg-black/50 md:hidden"
            onClick={() => setMobileOpen(false)}
          />
        )}

        {/* Mobile Sidebar */}
        <div
          className={cn(
            "fixed left-0 top-0 z-40 h-screen w-64 transform transition-transform md:hidden",
            mobileOpen ? "translate-x-0" : "-translate-x-full"
          )}
        >
          <DashboardSidebar onToggle={() => setMobileOpen(false)} />
        </div>

        {/* Main Content */}
        <div
          className={cn(
            "flex-1 transition-all duration-300",
            sidebarCollapsed ? "md:ml-16" : "md:ml-64"
          )}
        >
          <DashboardHeader onMenuClick={() => setMobileOpen(true)} />
          <main className="p-4 md:p-6">{children}</main>
        </div>
      </div>
    </ProtectedRoute>
  );
}
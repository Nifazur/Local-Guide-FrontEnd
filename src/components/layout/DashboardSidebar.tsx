"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useAuth } from "@/hooks/useAuth";
import { Logo } from "@/components/shared/Logo";
import { cn } from "@/lib/utils";
import {
  LayoutDashboard,
  Map,
  CalendarDays,
  Star,
  CreditCard,
  Users,
  Settings,
  ChevronLeft,
} from "lucide-react";
import { Button } from "@/components/ui/button";

interface DashboardSidebarProps {
  collapsed?: boolean;
  onToggle?: () => void;
}

export function DashboardSidebar({ collapsed = false, onToggle }: DashboardSidebarProps) {
  const pathname = usePathname();
  const { user } = useAuth();

  const touristLinks = [
    { icon: LayoutDashboard, label: "Dashboard", href: "/dashboard" },
    { icon: CalendarDays, label: "My Bookings", href: "/dashboard/bookings" },
    { icon: Star, label: "My Reviews", href: "/dashboard/reviews" },
    { icon: CreditCard, label: "Payments", href: "/dashboard/payments" },
    { icon: Settings, label: "Settings", href: "/dashboard/settings" },
  ];

  const guideLinks = [
    { icon: LayoutDashboard, label: "Dashboard", href: "/dashboard" },
    { icon: Map, label: "My Listings", href: "/dashboard/listings" },
    { icon: CalendarDays, label: "Bookings", href: "/dashboard/bookings" },
    { icon: Star, label: "Reviews", href: "/dashboard/reviews" },
    { icon: CreditCard, label: "Earnings", href: "/dashboard/payments" },
    { icon: Settings, label: "Settings", href: "/dashboard/settings" },
  ];

  const adminLinks = [
    { icon: LayoutDashboard, label: "Dashboard", href: "/dashboard" },
    { icon: Users, label: "Users", href: "/dashboard/users" },
    { icon: Map, label: "Listings", href: "/dashboard/listings" },
    { icon: CalendarDays, label: "Bookings", href: "/dashboard/bookings" },
    { icon: Star, label: "Reviews", href: "/dashboard/reviews" },
    { icon: CreditCard, label: "Payments", href: "/dashboard/payments" },
    { icon: Settings, label: "Settings", href: "/dashboard/settings" },
  ];

  const links = user?.role === "ADMIN" 
    ? adminLinks 
    : user?.role === "GUIDE" 
    ? guideLinks 
    : touristLinks;

  return (
    <aside
      className={cn(
        "fixed left-0 top-0 z-40 flex h-screen flex-col border-r bg-card transition-all duration-300",
        collapsed ? "w-16" : "w-64"
      )}
    >
      {/* Header */}
      <div className="flex h-16 items-center justify-between border-b px-4">
        {!collapsed && <Logo />}
        {onToggle && (
          <Button variant="ghost" size="icon" onClick={onToggle}>
            <ChevronLeft
              className={cn("h-5 w-5 transition-transform", collapsed && "rotate-180")}
            />
          </Button>
        )}
      </div>

      {/* Navigation */}
      <nav className="flex-1 space-y-1 p-2">
        {links.map((link) => {
          const isActive = pathname === link.href;
          return (
            <Link
              key={link.href}
              href={link.href}
              className={cn(
                "flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium transition-colors",
                isActive
                  ? "bg-primary text-primary-foreground"
                  : "text-muted-foreground hover:bg-muted hover:text-foreground"
              )}
            >
              <link.icon className="h-5 w-5 shrink-0" />
              {!collapsed && <span>{link.label}</span>}
            </Link>
          );
        })}
      </nav>

      {/* Footer */}
      <div className="border-t p-4">
        {!collapsed && (
          <p className="text-xs text-muted-foreground">
            © {new Date().getFullYear()} Local Guide
          </p>
        )}
      </div>
    </aside>
  );
}
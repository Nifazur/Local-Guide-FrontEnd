"use client";

import { useEffect, useState } from "react";
import { useAuth } from "@/hooks/useAuth";
import { StatsCard } from "@/components/dashboard/StatsCard";
import { RecentBookings } from "@/components/dashboard/RecentBookings";
import { RecentReviews } from "@/components/dashboard/RecentReviews";
import { dashboardService } from "@/services/dashboardService";
import { AdminDashboard, GuideDashboard, TouristDashboard } from "@/types";
import { formatCurrency } from "@/lib/utils";
import { Skeleton } from "@/components/ui/skeleton";
import {
  Users,
  Map,
  Calendar,
  DollarSign,
  Star,
  Clock,
  CheckCircle,
} from "lucide-react";

export default function DashboardPage() {
  const { user } = useAuth();
  const [data, setData] = useState<AdminDashboard | GuideDashboard | TouristDashboard | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchDashboard = async () => {
      try {
        const response = await dashboardService.getDashboard();
        if (response.success && response.data) {
          setData(response.data);
        }
      } catch (error) {
        console.error("Failed to fetch dashboard:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchDashboard();
  }, []);

  if (isLoading) {
    return (
      <div className="space-y-6">
        <Skeleton className="h-8 w-48" />
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          {[...Array(4)].map((_, i) => (
            <Skeleton key={i} className="h-32" />
          ))}
        </div>
        <Skeleton className="h-96" />
      </div>
    );
  }

  if (!data) {
    return <div>Failed to load dashboard</div>;
  }

  // Admin Dashboard
  if (user?.role === "ADMIN") {
    const adminData = data as AdminDashboard;
    return (
      <div className="space-y-6">
        <h1 className="text-3xl font-bold">Admin Dashboard</h1>

        {/* Stats Grid */}
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          <StatsCard
            title="Total Users"
            value={adminData.stats.totalUsers}
            icon={Users}
          />
          <StatsCard
            title="Total Guides"
            value={adminData.stats.totalGuides}
            icon={Map}
          />
          <StatsCard
            title="Total Bookings"
            value={adminData.stats.totalBookings}
            icon={Calendar}
          />
          <StatsCard
            title="Total Revenue"
            value={formatCurrency(adminData.stats.totalRevenue)}
            icon={DollarSign}
          />
        </div>

        {/* Recent Activity */}
        <div className="grid gap-6 lg:grid-cols-2">
          <RecentBookings
            bookings={adminData.recentBookings}
            title="Recent Bookings"
            showTourist
          />
        </div>
      </div>
    );
  }

  // Guide Dashboard
  if (user?.role === "GUIDE") {
    const guideData = data as GuideDashboard;
    return (
      <div className="space-y-6">
        <h1 className="text-3xl font-bold">Guide Dashboard</h1>

        {/* Stats Grid */}
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          <StatsCard
            title="Active Listings"
            value={guideData.stats.activeListings}
            icon={Map}
            description={`${guideData.stats.totalListings} total`}
          />
          <StatsCard
            title="Pending Bookings"
            value={guideData.stats.pendingBookings}
            icon={Clock}
          />
          <StatsCard
            title="Total Earnings"
            value={formatCurrency(guideData.stats.totalEarnings)}
            icon={DollarSign}
          />
          <StatsCard
            title="Average Rating"
            value={guideData.stats.averageRating.toFixed(1)}
            icon={Star}
            description={`${guideData.stats.totalReviews} reviews`}
          />
        </div>

        {/* Recent Activity */}
        <div className="grid gap-6 lg:grid-cols-2">
          <RecentBookings
            bookings={guideData.upcomingBookings}
            title="Upcoming Bookings"
            showTourist
          />
          <RecentReviews
            reviews={guideData.recentReviews}
            title="Recent Reviews"
          />
        </div>
      </div>
    );
  }

  // Tourist Dashboard
  const touristData = data as TouristDashboard;
  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold">My Dashboard</h1>

      {/* Stats Grid */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <StatsCard
          title="Upcoming Trips"
          value={touristData.stats.upcomingBookings}
          icon={Calendar}
        />
        <StatsCard
          title="Completed Tours"
          value={touristData.stats.completedBookings}
          icon={CheckCircle}
        />
        <StatsCard
          title="Total Spent"
          value={formatCurrency(touristData.stats.totalSpent)}
          icon={DollarSign}
        />
        <StatsCard
          title="Reviews Given"
          value={touristData.stats.reviewsGiven}
          icon={Star}
        />
      </div>

      {/* Recent Activity */}
      <div className="grid gap-6 lg:grid-cols-2">
        <RecentBookings
          bookings={touristData.upcomingTrips}
          title="Upcoming Trips"
          showGuide
        />
        <RecentBookings
          bookings={touristData.pastTrips}
          title="Past Trips"
          showGuide
        />
      </div>
    </div>
  );
}
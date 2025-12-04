"use client";

import { useEffect, useState } from "react";
import { useAuth } from "@/hooks/useAuth";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { StatusBadge } from "@/components/shared/StatusBadge";
import { Pagination } from "@/components/shared/Pagination";
import { StatsCard } from "@/components/dashboard/StatsCard";
import { paymentService } from "@/services/paymentService";
import { Payment, PaginationMeta } from "@/types";
import { formatCurrency, formatDate } from "@/lib/utils";
import { Skeleton } from "@/components/ui/skeleton";
import { DollarSign, CreditCard, RefreshCw, XCircle } from "lucide-react";
import Link from "next/link";

export default function PaymentsPage() {
  const { user } = useAuth();
  const [payments, setPayments] = useState<Payment[]>([]);
  const [pagination, setPagination] = useState<PaginationMeta | null>(null);
  const [stats, setStats] = useState<{
    totalRevenue: number;
    paid: number;
    pending: number;
    refunded: number;
  } | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [page, setPage] = useState(1);

  const isGuide = user?.role === "GUIDE";

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      try {
        const [paymentsRes, statsRes] = await Promise.all([
          paymentService.getPayments({ page, limit: 10 }),
          paymentService.getPaymentStats ? paymentService.getPaymentStats() : null,
        ]);

        if (paymentsRes.success && paymentsRes.data) {
          setPayments(paymentsRes.data);
          if (paymentsRes.meta?.pagination) {
            setPagination(paymentsRes.meta.pagination);
          }
        }

        if (statsRes?.success && statsRes?.data) {
          setStats({
            totalRevenue: statsRes.data.totalRevenue,
            paid: statsRes.data.paid,
            pending: statsRes.data.pending,
            refunded: statsRes.data.refunded,
          });
        }
      } catch (error) {
        console.error("Failed to fetch payments:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, [page]);

  if (isLoading) {
    return (
      <div className="space-y-6">
        <Skeleton className="h-8 w-48" />
        <div className="grid gap-4 md:grid-cols-4">
          {[...Array(4)].map((_, i) => (
            <Skeleton key={i} className="h-32" />
          ))}
        </div>
        <Skeleton className="h-96" />
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold">
        {isGuide ? "Earnings" : "Payment History"}
      </h1>

      {/* Stats */}
      {stats && (
        <div className="grid gap-4 md:grid-cols-4">
          <StatsCard
            title={isGuide ? "Total Earnings" : "Total Spent"}
            value={formatCurrency(stats.totalRevenue)}
            icon={DollarSign}
          />
          <StatsCard title="Completed" value={stats.paid} icon={CreditCard} />
          <StatsCard title="Pending" value={stats.pending} icon={RefreshCw} />
          <StatsCard title="Refunded" value={stats.refunded} icon={XCircle} />
        </div>
      )}

      {/* Payments Table */}
      <Card>
        <CardHeader>
          <CardTitle>Transactions</CardTitle>
        </CardHeader>
        <CardContent>
          {payments.length === 0 ? (
            <p className="text-center text-muted-foreground">No transactions yet.</p>
          ) : (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Date</TableHead>
                  <TableHead>Tour</TableHead>
                  <TableHead>Amount</TableHead>
                  <TableHead>Status</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {payments.map((payment) => (
                  <TableRow key={payment.id}>
                    <TableCell>{formatDate(payment.createdAt)}</TableCell>
                    <TableCell>
                      <Link
                        href={`/dashboard/bookings/${payment.bookingId}`}
                        className="hover:text-primary"
                      >
                        {payment.booking?.listing?.title || "Tour"}
                      </Link>
                    </TableCell>
                    <TableCell className="font-medium">
                      {formatCurrency(payment.amount)}
                    </TableCell>
                    <TableCell>
                      <StatusBadge status={payment.status} />
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          )}
        </CardContent>
      </Card>

      {pagination && pagination.totalPages > 1 && (
        <Pagination
          currentPage={pagination.page}
          totalPages={pagination.totalPages}
          onPageChange={setPage}
        />
      )}
    </div>
  );
}
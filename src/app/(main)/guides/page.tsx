/* eslint-disable @typescript-eslint/no-unused-vars */
"use client";

import { useState, useEffect, useCallback } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { GuideGrid } from "@/components/guides/GuideGrid";
import { Pagination } from "@/components/shared/Pagination";
import { userService } from "@/services/userService";
import { GuideProfile, PaginationMeta } from "@/types";
import { LANGUAGES, EXPERTISE_AREAS } from "@/lib/constants";
import { Skeleton } from "@/components/ui/skeleton";
import { Search } from "lucide-react";

export default function GuidesPage() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const [guides, setGuides] = useState<GuideProfile[]>([]);
  const [pagination, setPagination] = useState<PaginationMeta | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  const [filters, setFilters] = useState({
    page: parseInt(searchParams.get("page") || "1"),
    limit: 12,
    search: searchParams.get("search") || "",
    city: searchParams.get("city") || "",
    language: searchParams.get("language") || "",
    expertise: searchParams.get("expertise") || "",
  });

  const fetchGuides = useCallback(async () => {
    setIsLoading(true);
    try {
      const cleanFilters = Object.fromEntries(
        Object.entries(filters).filter(([_, v]) => v !== "")
      );
      const response = await userService.getGuides(cleanFilters);
      if (response.success && response.data) {
        setGuides(response.data);
        if (response.meta?.pagination) {
          setPagination(response.meta.pagination);
        }
      }
    } catch (error) {
      console.error("Failed to fetch guides:", error);
    } finally {
      setIsLoading(false);
    }
  }, [filters]);

  useEffect(() => {
    fetchGuides();
  }, [fetchGuides]);

  const updateFilters = (key: string, value: string) => {
    const newFilters = { ...filters, [key]: value, page: 1 };
    setFilters(newFilters);

    const params = new URLSearchParams();
    Object.entries(newFilters).forEach(([k, v]) => {
      if (v && v !== "") params.set(k, String(v));
    });
    router.push(`/guides?${params.toString()}`);
  };

  return (
    <div className="container py-8">
      {/* Header */}
      <div className="mb-8 text-center">
        <h1 className="mb-4 text-3xl font-bold">Find Your Perfect Guide</h1>
        <p className="mx-auto max-w-2xl text-muted-foreground">
          Connect with passionate local experts ready to show you around
        </p>
      </div>

      {/* Filters */}
      <div className="mb-8 grid gap-4 sm:grid-cols-2 md:grid-cols-4">
        <div className="space-y-2">
          <Label>Search</Label>
          <div className="relative">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <Input
              placeholder="Search guides..."
              value={filters.search}
              onChange={(e) => updateFilters("search", e.target.value)}
              className="pl-9"
            />
          </div>
        </div>

        <div className="space-y-2">
          <Label>City</Label>
          <Input
            placeholder="Enter city..."
            value={filters.city}
            onChange={(e) => updateFilters("city", e.target.value)}
          />
        </div>

        <div className="space-y-2">
          <Label>Language</Label>
          <Select
            value={filters.language}
            onValueChange={(v) => updateFilters("language", v)}
          >
            <SelectTrigger>
              <SelectValue placeholder="All Languages" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="">All Languages</SelectItem>
              {LANGUAGES.map((lang) => (
                <SelectItem key={lang} value={lang}>
                  {lang}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-2">
          <Label>Expertise</Label>
          <Select
            value={filters.expertise}
            onValueChange={(v) => updateFilters("expertise", v)}
          >
            <SelectTrigger>
              <SelectValue placeholder="All Expertise" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="">All Expertise</SelectItem>
              {EXPERTISE_AREAS.map((exp) => (
                <SelectItem key={exp} value={exp}>
                  {exp}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>

      {/* Results */}
      {pagination && (
        <p className="mb-4 text-muted-foreground">
          Found {pagination.total} guides
        </p>
      )}

      {isLoading ? (
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {[...Array(8)].map((_, i) => (
            <div key={i} className="space-y-4 rounded-xl border p-6">
              <Skeleton className="mx-auto h-24 w-24 rounded-full" />
              <Skeleton className="mx-auto h-4 w-3/4" />
              <Skeleton className="mx-auto h-4 w-1/2" />
            </div>
          ))}
        </div>
      ) : (
        <GuideGrid guides={guides} />
      )}

      {/* Pagination */}
      {pagination && pagination.totalPages > 1 && (
        <div className="mt-8">
          <Pagination
            currentPage={pagination.page}
            totalPages={pagination.totalPages}
            onPageChange={(page) => setFilters((prev) => ({ ...prev, page }))}
          />
        </div>
      )}
    </div>
  );
}
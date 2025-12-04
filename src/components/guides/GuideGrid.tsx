import { GuideProfile } from "@/types";
import { GuideCard } from "./GuideCard";
import { EmptyState } from "@/components/shared/EmptyState";
import { Users } from "lucide-react";

interface GuideGridProps {
  guides: GuideProfile[];
  isLoading?: boolean;
}

export function GuideGrid({ guides, isLoading }: GuideGridProps) {
  if (!isLoading && guides.length === 0) {
    return (
      <EmptyState
        icon={Users}
        title="No guides found"
        description="Try adjusting your filters to find more guides."
        actionLabel="Clear Filters"
        actionHref="/guides"
      />
    );
  }

  return (
    <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
      {guides.map((guide) => (
        <GuideCard key={guide.id} guide={guide} />
      ))}
    </div>
  );
}
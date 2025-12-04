import { Badge } from "@/components/ui/badge";
import { cn, getStatusColor } from "@/lib/utils";

interface StatusBadgeProps {
  status: string;
  className?: string;
}

export function StatusBadge({ status, className }: StatusBadgeProps) {
  return (
    <Badge
      variant="outline"
      className={cn(getStatusColor(status), "border", className)}
    >
      {status.charAt(0) + status.slice(1).toLowerCase()}
    </Badge>
  );
}
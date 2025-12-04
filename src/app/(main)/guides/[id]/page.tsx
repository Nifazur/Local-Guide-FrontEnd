import { Suspense } from "react";
import { notFound } from "next/navigation";
import { userService } from "@/services/userService";
import { GuideProfileComponent } from "@/components/guides/GuideProfile";
import { Skeleton } from "@/components/ui/skeleton";

interface GuidePageProps {
  params: { id: string };
}

async function getGuide(id: string) {
  try {
    const response = await userService.getUserById(id);
    if (response.success && response.data) {
      return response.data;
    }
    return null;
  } catch {
    return null;
  }
}

export async function generateMetadata({ params }: GuidePageProps) {
  const guide = await getGuide(params.id);

  if (!guide) {
    return { title: "Guide Not Found | Local Guide" };
  }

  return {
    title: `${guide.name} | Local Guide`,
    description: guide.bio?.slice(0, 160) || `Local guide in ${guide.city}`,
  };
}

function LoadingSkeleton() {
  return (
    <div className="container py-8">
      <div className="flex flex-col items-center gap-6 md:flex-row">
        <Skeleton className="h-40 w-40 rounded-full" />
        <div className="flex-1 space-y-4">
          <Skeleton className="h-8 w-48" />
          <Skeleton className="h-4 w-32" />
          <Skeleton className="h-4 w-64" />
        </div>
      </div>
    </div>
  );
}

export default async function GuidePage({ params }: GuidePageProps) {
  const guide = await getGuide(params.id);

  if (!guide || guide.role !== "GUIDE") {
    notFound();
  }

  return (
    <Suspense fallback={<LoadingSkeleton />}>
      <div className="container py-8">
        <GuideProfileComponent guide={guide} />
      </div>
    </Suspense>
  );
}
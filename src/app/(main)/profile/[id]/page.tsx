import { Suspense } from "react";
import { notFound } from "next/navigation";
import { userService } from "@/services/userService";
import { GuideProfileComponent } from "@/components/guides/GuideProfile";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { getInitials, formatDate } from "@/lib/utils";
import { MapPin, Calendar, Languages, Mail } from "lucide-react";
import { Skeleton } from "@/components/ui/skeleton";

interface ProfilePageProps {
  params: Promise<{ id: string }>;
}

async function getUser(id: string) {
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

export async function generateMetadata({ params }: ProfilePageProps) {
  const { id } = await params;
  const user = await getUser(id);

  if (!user) {
    return { title: "Profile Not Found | Local Guide" };
  }

  return {
    title: `${user.name} | Local Guide`,
    description: user.bio?.slice(0, 160) || `${user.name}'s profile on Local Guide`,
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
        </div>
      </div>
    </div>
  );
}

export default async function ProfilePage({ params }: ProfilePageProps) {
  const { id } = await params;
  const user = await getUser(id);

  if (!user) {
    notFound();
  }

  // If user is a guide, show guide profile
  if (user.role === "GUIDE") {
    return (
      <Suspense fallback={<LoadingSkeleton />}>
        <div className="container py-8">
          <GuideProfileComponent guide={user} />
        </div>
      </Suspense>
    );
  }

  // Tourist/User profile
  return (
    <Suspense fallback={<LoadingSkeleton />}>
      <div className="container py-8">
        <Card>
          <CardContent className="p-8">
            <div className="flex flex-col items-center gap-6 text-center md:flex-row md:text-left">
              <Avatar className="h-32 w-32">
                <AvatarImage src={user.profilePic || undefined} />
                <AvatarFallback className="text-4xl">
                  {getInitials(user.name)}
                </AvatarFallback>
              </Avatar>

              <div className="flex-1">
                <div className="mb-2 flex items-center justify-center gap-2 md:justify-start">
                  <h1 className="text-3xl font-bold">{user.name}</h1>
                  <Badge variant="secondary">{user.role}</Badge>
                </div>

                <div className="mb-4 flex flex-wrap justify-center gap-4 text-muted-foreground md:justify-start">
                  {user.email && (
                    <div className="flex items-center gap-1">
                      <Mail className="h-4 w-4" />
                      <span>{user.email}</span>
                    </div>
                  )}
                  {user.city && (
                    <div className="flex items-center gap-1">
                      <MapPin className="h-4 w-4" />
                      <span>{user.city}, {user.country}</span>
                    </div>
                  )}
                  {user.languages && user.languages.length > 0 && (
                    <div className="flex items-center gap-1">
                      <Languages className="h-4 w-4" />
                      <span>{user.languages.join(", ")}</span>
                    </div>
                  )}
                  <div className="flex items-center gap-1">
                    <Calendar className="h-4 w-4" />
                    <span>Joined {formatDate(user.createdAt)}</span>
                  </div>
                </div>

                {user.bio && (
                  <p className="text-muted-foreground">{user.bio}</p>
                )}

                {user.travelPreferences && user.travelPreferences.length > 0 && (
                  <div className="mt-4">
                    <p className="mb-2 font-medium">Travel Preferences</p>
                    <div className="flex flex-wrap gap-2">
                      {user.travelPreferences.map((pref) => (
                        <Badge key={pref} variant="outline">
                          {pref}
                        </Badge>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </Suspense>
  );
}
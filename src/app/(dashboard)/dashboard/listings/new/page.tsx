import { ListingForm } from "@/components/listings/ListingForm";
import { ProtectedRoute } from "@/components/auth/ProtectedRoute";

export const metadata = {
  title: "Create Listing | Local Guide",
};

export default function NewListingPage() {
  return (
    <ProtectedRoute allowedRoles={["GUIDE"]}>
      <div className="mx-auto max-w-4xl space-y-6">
        <h1 className="text-3xl font-bold">Create New Listing</h1>
        <ListingForm />
      </div>
    </ProtectedRoute>
  );
}
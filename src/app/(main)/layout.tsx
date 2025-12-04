import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";

export default function MainLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex min-h-screen flex-col place-self-center max-w-screen-2xl px-4 md:px-0">
      <Navbar />
      <main className="flex-1">{children}</main>
      <Footer />
    </div>
  );
}
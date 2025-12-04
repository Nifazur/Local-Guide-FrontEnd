"use client";

import { useState } from "react";
import Link from "next/link";
import { useAuth } from "@/hooks/useAuth";
import { Logo } from "@/components/shared/Logo";
import { Button } from "@/components/ui/button";
import { UserMenu } from "./UserMenu";
import { MobileMenu } from "./MobileMenu";
import { Menu, Search } from "lucide-react";

export function Navbar() {
  const { isAuthenticated, user } = useAuth();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const publicLinks = [
    { href: "/explore", label: "Explore Tours" },
    { href: "/guides", label: "Find Guides" },
    { href: "/become-guide", label: "Become a Guide" },
  ];

  const touristLinks = [
    { href: "/explore", label: "Explore Tours" },
    { href: "/dashboard/bookings", label: "My Bookings" },
  ];

  const guideLinks = [
    { href: "/explore", label: "Explore Tours" },
    { href: "/dashboard", label: "Dashboard" },
    { href: "/dashboard/listings", label: "My Listings" },
  ];

  const adminLinks = [
    { href: "/dashboard", label: "Dashboard" },
    { href: "/dashboard/users", label: "Manage Users" },
    { href: "/dashboard/listings", label: "Manage Listings" },
  ];

  const getLinks = () => {
    if (!isAuthenticated) return publicLinks;
    switch (user?.role) {
      case "ADMIN":
        return adminLinks;
      case "GUIDE":
        return guideLinks;
      case "TOURIST":
        return touristLinks;
      default:
        return publicLinks;
    }
  };

  const links = getLinks();

  return (
    // Design Change: Changed height, background to pure white, and added subtle border/shadow logic if needed
    <nav className="sticky top-0 z-50 w-full border-b border-gray-100 rounded-2xl px-2 sm:px-5 backdrop-blur-md supports-backdrop-filter:bg-white/60">
      {/* Design Change: Increased height to h-20 for more breathing room like the image */}
      <div className="container relative flex h-20 items-center justify-between">
        
        {/* Logo Section */}
        <div className="flex-shrink-0">
          <Logo />
        </div>

        {/* Desktop Navigation */}
        {/* Design Change: Used absolute positioning to perfectly center the links like the reference image */}
        <div className="hidden md:absolute md:left-1/2 md:top-1/2 md:-translate-x-1/2 md:-translate-y-1/2 md:flex md:items-center md:gap-8">
          {links.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="text-[15px] font-medium text-gray-600 transition-colors hover:text-black"
            >
              {link.label}
            </Link>
          ))}
        </div>

        {/* Right Side */}
        <div className="flex items-center gap-3">
          {/* Search Icon - kept as requested in logic */}
          <Button variant="ghost" size="icon" className="hidden text-gray-500 hover:text-black md:flex" asChild>
            <Link href="/explore">
              <Search className="h-5 w-5" />
            </Link>
          </Button>

          {isAuthenticated ? (
            <UserMenu />
          ) : (
            <div className="hidden items-center gap-3 md:flex">
              {/* Design Change: Added rounded-full to buttons to match the pill shape in the image */}
              <Button 
                variant="ghost" 
                className="rounded-full text-[15px] font-medium text-gray-600 hover:bg-gray-100 hover:text-black" 
                asChild
              >
                <Link href="/login">Log in</Link>
              </Button>
              
              <Button 
                variant="outline" // Changed to outline or secondary to match the 'Become a Guide' button look
                className="rounded-full border-gray-200 bg-white px-6 text-[15px] font-medium text-gray-900 hover:bg-gray-50 hover:text-black shadow-sm"
                asChild
              >
                <Link href="/register">Sign up</Link>
              </Button>
            </div>
          )}

          {/* Mobile Menu Button */}
          <Button
            variant="ghost"
            size="icon"
            className="md:hidden text-gray-600"
            onClick={() => setMobileMenuOpen(true)}
          >
            <Menu className="h-6 w-6" />
          </Button>
        </div>
      </div>

      {/* Mobile Menu */}
      <MobileMenu
        isOpen={mobileMenuOpen}
        onCloseAction={() => setMobileMenuOpen(false)}
        links={links}
      />
    </nav>
  );
}
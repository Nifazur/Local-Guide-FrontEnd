"use client";

import Link from "next/link";
import { useAuth } from "@/hooks/useAuth";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetHeader, SheetTitle } from "@/components/ui/sheet";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Separator } from "@/components/ui/separator";
import { LogOut, User, Settings } from "lucide-react";
import { getInitials } from "@/lib/utils";

interface MobileMenuProps {
  isOpen: boolean;
  onCloseAction: () => void;
  links: { href: string; label: string }[];
}

export function MobileMenu({ isOpen, onCloseAction, links }: MobileMenuProps) {
  const { isAuthenticated, user, logout } = useAuth();

  const handleLogout = async () => {
    await logout();
    onCloseAction();
  };

  return (
    <Sheet open={isOpen} onOpenChange={onCloseAction}>
      <SheetContent side="right" className="w-[300px]">
        <SheetHeader>
          <SheetTitle>Menu</SheetTitle>
        </SheetHeader>

        <div className="mt-6 flex flex-col gap-4">
          {/* User Info */}
          {isAuthenticated && user && (
            <>
              <div className="flex items-center gap-3">
                <Avatar>
                  <AvatarImage src={user.profilePic || undefined} />
                  <AvatarFallback>{getInitials(user.name)}</AvatarFallback>
                </Avatar>
                <div>
                  <p className="font-medium">{user.name}</p>
                  <p className="text-sm text-muted-foreground">{user.email}</p>
                </div>
              </div>
              <Separator />
            </>
          )}

          {/* Navigation Links */}
          <nav className="flex flex-col gap-2">
            {links.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={onCloseAction}
                className="rounded-md px-3 py-2 text-sm font-medium hover:bg-muted"
              >
                {link.label}
              </Link>
            ))}
          </nav>

          <Separator />

          {/* Auth Actions */}
          {isAuthenticated ? (
            <div className="flex flex-col gap-2">
              <Link
                href={`/profile/${user?.id}`}
                onClick={onCloseAction}
                className="flex items-center gap-2 rounded-md px-3 py-2 text-sm font-medium hover:bg-muted"
              >
                <User className="h-4 w-4" />
                Profile
              </Link>
              <Link
                href="/dashboard/settings"
                onClick={onCloseAction}
                className="flex items-center gap-2 rounded-md px-3 py-2 text-sm font-medium hover:bg-muted"
              >
                <Settings className="h-4 w-4" />
                Settings
              </Link>
              <button
                onClick={handleLogout}
                className="flex items-center gap-2 rounded-md px-3 py-2 text-sm font-medium text-destructive hover:bg-muted"
              >
                <LogOut className="h-4 w-4" />
                Log out
              </button>
            </div>
          ) : (
            <div className="flex flex-col gap-2">
              <Button asChild variant="outline" onClick={onCloseAction}>
                <Link href="/login">Log in</Link>
              </Button>
              <Button asChild onClick={onCloseAction}>
                <Link href="/register">Sign up</Link>
              </Button>
            </div>
          )}
        </div>
      </SheetContent>
    </Sheet>
  );
}
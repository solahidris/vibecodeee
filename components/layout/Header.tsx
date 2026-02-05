import Image from "next/image";
import { useRouter } from "next/router";
import { useState } from "react";
import { useAuth } from "@/contexts/AuthContext";
import { Avatar } from "@/components/ui/Avatar";
import { Sheet, SheetContent, SheetHeader, SheetTitle } from "@/components/ui/Sheet";
import { Button } from "@/components/ui/Button";

interface HeaderProps {
  showNavigation?: boolean;
}

export function Header({ showNavigation = true }: HeaderProps) {
  const router = useRouter();
  const { user } = useAuth();
  const currentPath = router.pathname;
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const navigationLinks = [
    { label: "Community", path: "/payment/subscribe" },
    { label: "Resources", path: "/resources" },
  ];

  const handleNavigation = (path: string) => {
    router.push(path);
    setIsMobileMenuOpen(false);
  };

  return (
    <header className="sticky top-0 z-50 border-b border-gray-200 bg-white/80 backdrop-blur-lg">
      <div className="mx-auto max-w-7xl px-4 py-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          {/* Logo/Brand */}
          <button
            onClick={() => router.push("/")}
            className="flex items-center gap-2 transition-opacity hover:opacity-80 cursor-pointer"
          >
            <div className="flex h-10 w-10 items-center justify-center rounded-xl overflow-hidden">
              <Image
                src="/android-chrome-512x512.png"
                alt="VibeCodeee logo"
                width={40}
                height={40}
                className="object-contain"
              />
            </div>
            <span className="text-xl font-bold text-zinc-900">VibeCodeee</span>
          </button>

          {/* Right Side - Navigation Links + Avatar */}
          <div className="flex items-center gap-4 sm:gap-8">
            {/* Desktop Navigation Links */}
            {showNavigation && (
              <nav className="hidden sm:flex items-center gap-8">
                {navigationLinks.map((link) => (
                  <button
                    key={link.path}
                    onClick={() => router.push(link.path)}
                    className={`text-sm font-normal transition-colors cursor-pointer ${
                      currentPath === link.path
                        ? "text-zinc-900"
                        : "text-zinc-600 hover:text-zinc-900"
                    }`}
                  >
                    {link.label}
                  </button>
                ))}
              </nav>
            )}

            {/* Desktop Avatar - Only show if logged in */}
            {user && (
              <button
                onClick={() => router.push("/profile")}
                className="hidden sm:block transition-opacity hover:opacity-80 cursor-pointer"
                aria-label="Go to profile"
              >
                <Avatar
                  src={user.user_metadata?.avatar_url}
                  name={user.user_metadata?.full_name || user.email}
                />
              </button>
            )}

            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsMobileMenuOpen(true)}
              className="sm:hidden p-2 text-zinc-700 hover:text-zinc-900 transition-colors"
              aria-label="Open menu"
            >
              <svg
                className="h-6 w-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 6h16M4 12h16M4 18h16"
                />
              </svg>
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu Sheet */}
      <Sheet open={isMobileMenuOpen} onOpenChange={setIsMobileMenuOpen}>
        <SheetContent side="right">
          <SheetHeader>
            <SheetTitle>Menu</SheetTitle>
          </SheetHeader>

          <div className="flex flex-col gap-6 mt-6">
            {/* Profile Section - Show if logged in */}
            {user && (
              <div className="flex items-center gap-3 pb-6 border-b border-gray-200">
                <Avatar
                  src={user.user_metadata?.avatar_url}
                  name={user.user_metadata?.full_name || user.email}
                />
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-semibold text-zinc-900 truncate">
                    {user.user_metadata?.full_name || "User"}
                  </p>
                  <p className="text-xs text-zinc-500 truncate">
                    {user.email}
                  </p>
                </div>
              </div>
            )}

            {/* Navigation Links */}
            {showNavigation && (
              <nav className="flex flex-col gap-2">
                {navigationLinks.map((link) => (
                  <button
                    key={link.path}
                    onClick={() => handleNavigation(link.path)}
                    className={`text-left px-4 py-3 rounded-lg text-base font-medium transition-colors ${
                      currentPath === link.path
                        ? "bg-zinc-100 text-zinc-900"
                        : "text-zinc-700 hover:bg-zinc-50 hover:text-zinc-900"
                    }`}
                  >
                    {link.label}
                  </button>
                ))}
              </nav>
            )}

            {/* Profile or Login Button */}
            <div className="pt-4 border-t border-gray-200 mt-auto">
              {user ? (
                <Button
                  variant="secondary"
                  className="w-full"
                  onClick={() => handleNavigation("/profile")}
                >
                  View Profile
                </Button>
              ) : (
                <Button
                  variant="primary"
                  className="w-full"
                  onClick={() => handleNavigation("/login")}
                >
                  Sign In
                </Button>
              )}
            </div>
          </div>
        </SheetContent>
      </Sheet>
    </header>
  );
}

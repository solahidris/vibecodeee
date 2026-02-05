import Image from "next/image";
import { useRouter } from "next/router";
import { useAuth } from "@/contexts/AuthContext";
import { Avatar } from "@/components/ui/Avatar";

interface HeaderProps {
  showNavigation?: boolean;
}

export function Header({ showNavigation = true }: HeaderProps) {
  const router = useRouter();
  const { user } = useAuth();
  const currentPath = router.pathname;

  const navigationLinks = [
    { label: "Community", path: "/payment/subscribe" },
    { label: "Resources", path: "/resources" },
  ];

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
          <div className="flex items-center gap-8">
            {/* Navigation Links */}
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

            {/* Avatar - Only show if logged in */}
            {user && (
              <button
                onClick={() => router.push("/profile")}
                className="transition-opacity hover:opacity-80 cursor-pointer"
                aria-label="Go to profile"
              >
                <Avatar
                  src={user.user_metadata?.avatar_url}
                  name={user.user_metadata?.full_name || user.email}
                />
              </button>
            )}
          </div>
        </div>
      </div>
    </header>
  );
}

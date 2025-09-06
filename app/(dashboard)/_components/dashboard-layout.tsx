"use client";

import React, { useCallback, useMemo, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Session } from "next-auth";
import { List, Camera, Tag, Users, Settings, LogOut, Menu } from "lucide-react";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuLabel,
  DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Role } from "@prisma/client";
type UserRole = "ADMIN" | "SELLER" | "BUYER";

type RouteItem = { href: string; label: string; icon?: React.ReactNode };

type RouteGroup = { group: string; items: RouteItem[] };

export default function SimpleDashboardLayout({
  children,
  session,
  onSignOut,
}: {
  children: React.ReactNode;
  session?: Session | null;
  onSignOut?: () => void;
}) {
  const pathname = usePathname();
  const [sheetOpen, setSheetOpen] = useState(false);

  const role = (session?.user as any)?.role as Role | undefined;
  const groups = useMemo(() => getRouteGroups(role), [role]);

  const handleSignOut = useCallback(() => {
    if (onSignOut) return onSignOut();
    try {
      (window as any)?.location && (window.location.href = "/sign-in");
    } catch (e) {}
  }, [onSignOut]);

  return (
    <div className="flex min-h-screen bg-slate-50 text-slate-900">
      {/* Persistent sidebar (desktop) */}
      <aside className="z-20 hidden lg:flex lg:fixed lg:left-0 lg:top-16 lg:bottom-0 lg:w-72 flex-col border-r bg-stone-100 p-4">
        <div className="mb-6 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="rounded-md bg-primary/80 p-2 text-stone-800">
              Vaulted
            </div>
            <div>
              <p className="text-xs text-muted-foreground">Dashboard</p>
            </div>
          </div>
        </div>

        <nav className="flex-1 overflow-y-auto">
          {groups.map((g) => (
            <div key={g.group} className="mb-4">
              <div className="mb-2 px-2 text-xs font-semibold text-muted-foreground">
                {g.group}
              </div>
              <div className="flex flex-col gap-1">
                {g.items.map((it) => (
                  <SidebarLink
                    key={it.href}
                    href={it.href}
                    label={it.label}
                    icon={it.icon}
                    pathname={pathname}
                    onNavigate={() => {}}
                  />
                ))}
              </div>
            </div>
          ))}
        </nav>

        <Separator className="my-4" />

        <div className="flex items-center gap-2">
          <Avatar className="h-9 w-9">
            <AvatarFallback>{session?.user?.name?.[0] ?? "U"}</AvatarFallback>
          </Avatar>
          <div>
            <div className="font-medium">{session?.user?.name ?? "Guest"}</div>
            <div className="text-muted-foreground text-xs">
              {(session?.user as any)?.role ?? "visitor"}
            </div>
          </div>
          <div className="ml-auto">
            <Button size="sm" onClick={handleSignOut}>
              Sign Out
            </Button>
          </div>
        </div>
      </aside>

      {/* Main content area */}
      <main className="flex-1 lg:pl-72">
        <header className="fixed left-0 right-0 top-0 z-10 flex h-16 items-center justify-between border-b border-stone-300 px-4 ">
          <div className="flex items-center gap-3">
            <div className="lg:hidden">
              <Sheet open={sheetOpen} onOpenChange={setSheetOpen}>
                <SheetTrigger asChild>
                  <Button variant="ghost" size="icon" aria-label="Open menu">
                    <Menu />
                  </Button>
                </SheetTrigger>

                <SheetContent side="left" className="w-64 p-4">
                  <SheetHeader>
                    <SheetTitle>Menu</SheetTitle>
                  </SheetHeader>

                  <Separator className="my-3" />

                  <nav>
                    {groups.map((g) => (
                      <div key={g.group} className="mb-4">
                        <div className="mb-2 px-2 text-xs font-semibold text-muted-foreground">
                          {g.group}
                        </div>
                        <div className="flex flex-col gap-1">
                          {g.items.map((it) => (
                            <SidebarLink
                              key={it.href}
                              href={it.href}
                              label={it.label}
                              icon={it.icon}
                              pathname={pathname}
                              onNavigate={() => setSheetOpen(false)}
                            />
                          ))}
                        </div>
                      </div>
                    ))}
                  </nav>

                  <Separator className="my-3" />

                  <div className="mt-2 flex items-center gap-2">
                    <Avatar className="h-9 w-9">
                      <AvatarFallback>
                        {session?.user?.name?.[0] ?? "U"}
                      </AvatarFallback>
                    </Avatar>
                    <div className="flex-1 text-sm">
                      <div className="font-medium">
                        {session?.user?.name ?? "Guest"}
                      </div>
                      <div className="text-muted-foreground text-xs">
                        {(session?.user as any)?.role ?? "visitor"}
                      </div>
                    </div>
                    <Button
                      size="sm"
                      onClick={() => {
                        setSheetOpen(false);
                        handleSignOut();
                      }}
                    >
                      Sign Out
                    </Button>
                  </div>
                </SheetContent>
              </Sheet>
            </div>

            <div className="text-xs text-muted-foreground">
              Welcome back
              {session?.user?.name
                ? `, ${session.user.name.split(" ")[0]}`
                : ""}
              !
            </div>
          </div>

          <div className="flex items-center gap-3">
            <DropdownMenuRoot session={session} onSignOut={handleSignOut} />
          </div>
        </header>

        <div className="pt-16 px-4 pb-8">{children}</div>
      </main>
    </div>
  );
}

function SidebarLink({
  href,
  label,
  icon,
  pathname,
  onNavigate,
}: {
  href: string;
  label: string;
  icon?: React.ReactNode;
  pathname?: string | null;
  onNavigate?: () => void;
}) {
  const active = pathname
    ? pathname === href || pathname.startsWith(href + "/")
    : false;
  return (
    <Link
      href={href}
      onClick={onNavigate}
      className={`group flex items-center gap-3 rounded-md px-3 py-2 text-sm transition-colors ${
        active ? "bg-foreground/10 font-medium" : "hover:bg-slate-50"
      }`}
    >
      <span className="opacity-90">{icon}</span>
      <span>{label}</span>
      {active && (
        <span className="ml-auto text-xs text-muted-foreground">•</span>
      )}
    </Link>
  );
}

// ----- utils -----
function getRouteGroups(role?: Role): RouteGroup[] {
  const common: RouteGroup = {
    group: "Browse",
    items: [
      {
        href: "/auctions",
        label: "Auctions",
        icon: <List className="size-4" />,
      },
      {
        href: "/collections",
        label: "Collections",
        icon: <Camera className="size-4" />,
      },
    ],
  };

  const artist: RouteGroup = {
    group: "Artist",
    items: [
      {
        href: "/artist/listings",
        label: "My Listings",
        icon: <Tag className="size-4" />,
      },
    ],
  };
  const collector: RouteGroup = {
    group: "Collector",
    items: [
      {
        href: "/collector/watchlist",
        label: "Watchlist",
        icon: <Tag className="size-4" />,
      },
    ],
  };
  const admin: RouteGroup = {
    group: "Admin",
    items: [
      {
        href: "/admin/users",
        label: "Users",
        icon: <Users className="size-4" />,
      },
      {
        href: "/admin/settings",
        label: "Settings",
        icon: <Settings className="size-4" />,
      },
    ],
  };

  if (role === "ADMIN") return [common, admin];
  if (role === "SELLER") return [common, artist];
  if (role === "BUYER") return [common, collector];
  return [common];
}

function DropdownMenuRoot({
  session,
  onSignOut,
}: {
  session?: Session | null;
  onSignOut?: () => void;
}) {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" className="flex items-center gap-2">
          <Avatar className="h-8 w-8">
            <AvatarFallback className="text-white">
              {session?.user?.name?.[0] ?? "U"}
            </AvatarFallback>
          </Avatar>
        </Button>
      </DropdownMenuTrigger>

      <DropdownMenuContent align="end" className="w-56">
        <DropdownMenuLabel>Account</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuItem asChild>
          <Link href="/profile" className="flex items-center gap-2">
            {" "}
            <Settings className="size-4" /> Profile
          </Link>
        </DropdownMenuItem>
        <DropdownMenuItem onSelect={onSignOut} className="cursor-pointer">
          {" "}
          <LogOut className="size-4" /> Logout
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

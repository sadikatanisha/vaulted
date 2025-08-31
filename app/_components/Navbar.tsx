"use client";
import { useState } from "react";
import Link from "next/link";
import { Poppins } from "next/font/google";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Menu, X } from "lucide-react";
import { signOut } from "next-auth/react";

const poppins = Poppins({ subsets: ["latin"], weight: ["400", "800"] });

export default function Navbar({ session }: { session: any }) {
  const [open, setOpen] = useState(false);

  const navLinks = [
    { href: "/", label: "Home" },
    { href: "/explore", label: "Explore" },
    { href: "/artists", label: "Artists" },
  ];

  return (
    <header className={`w-full  bg-stone-50  ${poppins.className}`}>
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-20 items-center justify-between gap-4">
          {/* Brand */}
          <div className="flex items-center gap-4">
            <Link href="/" className="flex items-center">
              <h1 className="text-2xl font-extrabold text-espresso">Vaulted</h1>
            </Link>
          </div>

          {/* Desktop nav */}
          <nav className="hidden md:flex md:items-center md:gap-8">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="inline-flex items-center gap-2 text-sm font-medium text-stone-600 hover:text-stone-900"
              >
                {link.label}
              </Link>
            ))}
          </nav>

          {/* Right side */}
          <div className="flex items-center gap-3">
            {/* Desktop auth area */}
            <div className="hidden md:flex md:items-center md:gap-3 select-none">
              {session ? (
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button
                      variant="ghost"
                      className=" bg-transparent p-0 rounded-full "
                    >
                      <Avatar>
                        {session.user?.image ? (
                          <AvatarImage
                            src={session.user.image}
                            alt={session.user?.name ?? "User"}
                            className=""
                          />
                        ) : (
                          <AvatarFallback className="text-white bg-stone-800">
                            {(session.user?.name || "U").slice(0, 2)}
                          </AvatarFallback>
                        )}
                      </Avatar>
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent
                    align="end"
                    className="bg-stone-50 text-stone-800 border"
                  >
                    <DropdownMenuLabel className="font-semibold">
                      {session.user?.name}
                    </DropdownMenuLabel>
                    <DropdownMenuItem asChild>
                      <Link href="/profile">Profile</Link>
                    </DropdownMenuItem>
                    <DropdownMenuItem
                      onClick={() => signOut({ callbackUrl: "/" })}
                    >
                      Log out
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              ) : (
                <Button>Log In</Button>
              )}
            </div>

            {/* Mobile menu button */}
            <div className="md:hidden">
              <Sheet open={open} onOpenChange={setOpen}>
                <SheetTrigger asChild>
                  <Button variant="ghost" className="p-2">
                    {open ? (
                      <X className="h-5 w-5" />
                    ) : (
                      <Menu className="h-5 w-5" />
                    )}
                  </Button>
                </SheetTrigger>
                <SheetContent side="right" className="w-72">
                  <div className="flex items-center justify-between mb-4">
                    <h2 className="text-lg font-bold">Menu</h2>
                    <Button variant="ghost" onClick={() => setOpen(false)}>
                      <X className="h-5 w-5" />
                    </Button>
                  </div>

                  <div className="flex flex-col gap-2">
                    {navLinks.map((link) => (
                      <Link
                        key={link.href}
                        href={link.href}
                        className="flex items-center gap-3 rounded-md px-3 py-2 text-sm font-medium hover:bg-muted"
                        onClick={() => setOpen(false)}
                      >
                        {link.label}
                      </Link>
                    ))}
                  </div>

                  <div className="mt-6 border-t pt-4">
                    {session ? (
                      <div className="flex flex-col gap-3">
                        <div className="flex items-center gap-3">
                          <Avatar>
                            {session.user?.image ? (
                              <AvatarImage
                                src={session.user.image}
                                alt={session.user?.name ?? "User"}
                              />
                            ) : (
                              <AvatarFallback>
                                {(session.user?.name || "U").slice(0, 2)}
                              </AvatarFallback>
                            )}
                          </Avatar>
                          <div>
                            <div className="font-semibold">
                              {session.user?.name}
                            </div>
                            <div className="text-sm text-muted-foreground">
                              {session.user?.email}
                            </div>
                          </div>
                        </div>

                        <Button onClick={() => signOut({ callbackUrl: "/" })}>
                          Log Out
                        </Button>
                      </div>
                    ) : (
                      <div className="flex flex-col gap-2">
                        <Button>
                          <Link href="/login">Log In</Link>
                        </Button>

                        <Button variant="secondary" asChild>
                          <Link href="/register">Create account</Link>
                        </Button>
                      </div>
                    )}
                  </div>
                </SheetContent>
              </Sheet>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}

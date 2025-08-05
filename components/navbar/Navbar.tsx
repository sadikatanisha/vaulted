"use client";
import { Poppins } from "next/font/google";
import Link from "next/link";
import { Button } from "../ui/button";
import {
  LoginLink,
  LogoutLink,
  RegisterLink,
} from "@kinde-oss/kinde-auth-nextjs";

const poppins = Poppins({ subsets: ["latin"], weight: ["400", "800"] });

interface NavbarProps {
  user?: Record<string, any> | null;
}
export function Navbar({ user }: NavbarProps) {
  return (
    <nav className="flex h-[75px] w-[100%] items-center justify-between  px-14 py-3 text-shadow-orange-950">
      <div
        className={`flex h-[100%] items-center text-lg ${poppins.className}`}
      >
        <Link href="/">
          <h1 className="text-espresso text-2xl font-bold ">Vaulted</h1>
        </Link>
      </div>

      <div className={`${poppins.className}`}>
        <ul className="flex gap-x-7">
          <li>
            <Link href="/">Home</Link>
          </li>
          <li>
            <Link href="/">Explore</Link>
          </li>
          <li>
            <Link href="/">Artists</Link>
          </li>
          <li>
            <Link href="/">Book Me</Link>
          </li>
        </ul>
      </div>
      {user ? (
        <LogoutLink>
          <Button>Logout</Button>
        </LogoutLink>
      ) : (
        <div>
          <LoginLink>
            <Button>Login</Button>
          </LoginLink>
          <RegisterLink>
            <Button>Sign Up</Button>
          </RegisterLink>
        </div>
      )}
    </nav>
  );
}

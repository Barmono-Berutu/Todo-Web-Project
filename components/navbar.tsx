"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { LogOutIcon, HomeIcon, UserIcon } from "lucide-react";
import { signOutAction } from "@/lib/action";

export default function Navbar() {
  const [session, setSession] = useState<any>(null);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    fetch("/api/session")
      .then((res) => res.json())
      .then((data) => setSession(data));
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <nav
      className={`w-full z-10 transition-all duration-300
        ${isScrolled ? "fixed top-0 bg-gray-900 shadow-md" : "relative bg-gray-900"}
      `}
    >
      <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
        <Link
          href="/"
          className="flex items-center text-white font-bold text-xl gap-2"
        >
          <HomeIcon className="w-6 h-6" />
          TODO
        </Link>

        <div className="flex items-center space-x-4">
          {session ? (
            <div className="flex items-center gap-3">
              <div className="flex items-center gap-2 text-white">
                <UserIcon className="w-5 h-5" />
                <span className="font-medium">{session.user.name}</span>
              </div>

              <form action={signOutAction}>
                <Button
                  variant="destructive"
                  size="sm"
                  type="submit"
                  className="flex items-center gap-2"
                >
                  <LogOutIcon className="w-5 h-5" />
                  Logout
                </Button>
              </form>
            </div>
          ) : (
            <Link href="/login">
              <Button variant="outline" size="sm">
                Login
              </Button>
            </Link>
          )}
        </div>
      </div>
    </nav>
  );
}

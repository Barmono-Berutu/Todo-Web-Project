"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Button } from "@/components/ui/button";
import { LogOutIcon, HomeIcon } from "lucide-react";
import { useEffect, useState } from "react";
import { signOutAction } from "@/lib/action";

export default function Navbar() {
  const [session, setSession] = useState<any>(null);

  useEffect(() => {
    fetch("/api/session")
      .then((res) => res.json())
      .then((data) => setSession(data));
  }, []);

  return (
    <nav className="bg-gray-900 shadow-md">
      <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
        <Link
          href="/"
          className="flex items-center text-white font-bold text-xl gap-2"
        >
          <HomeIcon className="w-6 h-6 text-white" />
          MyTasks
        </Link>

        <div className="flex items-center space-x-4">
          {session ? (
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

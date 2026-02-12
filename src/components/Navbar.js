"use client";

import Link from "next/link";
import { useSession, signIn, signOut } from "next-auth/react";
import { usePathname } from "next/navigation";
import Image from "next/image";

export default function Navbar() {
  const { data: session, status } = useSession();
  const pathname = usePathname()

  return (
    <header className="bg-color-accent p-4 shadow-md sticky top-0 z-50">
      <div className="sm:flex justify-between items-center max-w-7xl mx-auto text-color-dark">
        <div className="flex items-center gap-4">
          <Link href="/" className="font-bold text-2xl hover:text-rose-700 transition">
            CineVerse 🎬
          </Link>
        </div>
        <div className="flex items-center justify-end gap-6">
          <div className="flex gap-4 font-semibold">
            {pathname !== "/top-rated" && (
              <Link href="/top-rated" className="hover:text-rose-700 transition">
                Top Rated
              </Link>
            )}
            {status === "authenticated" && pathname !== "/users/dashboard" && (
              <Link href="/users/dashboard" className="hover:text-rose-700 transition">
                My Favorites
              </Link>
            )}
          </div>
          <div>
            {status === "loading" ? (
              <span>...</span>
            ) : status === "authenticated" ? (
              <div className="flex items-center gap-4">
                <div className="flex items-center gap-2">
                  <Image
                    src={session.user.image}
                    alt={session.user.name}
                    className="w-8 h-8 rounded-full border border-black"
                    width={100}
                    height={100}
                  />
                </div>
                <button
                  onClick={() => signOut()}
                  className="bg-rose-700 text-white px-3 py-1 rounded text-sm hover:bg-rose-800 transition cursor-pointer"
                >
                  Sign Out
                </button>
              </div>
            ) : (
              <button
                onClick={() => signIn()}
                className="bg-indigo-700 text-white px-4 py-2 rounded text-sm hover:bg-indigo-800 transition cursor-pointer"
              >
                Sign In
              </button>
            )}
          </div>
        </div>
      </div>
    </header>
  );
}

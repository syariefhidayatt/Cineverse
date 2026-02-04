"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function SearchInput() {
  const [keyword, setKeyword] = useState("");
  const router = useRouter();
  const handleSearch = (e) => {
    e.preventDefault();
    if (!keyword.trim()) return;
    router.push(`/search/${keyword}`);
  };

  return (
    <form onSubmit={handleSearch} className="flex gap-2 w-full max-w-md mx-auto mb-8">
      <input
        type="text"
        placeholder="Cari film seru..."
        className="w-full p-3 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-yellow-500"
        value={keyword}
        onChange={(e) => setKeyword(e.target.value)}
      />
      <button
        type="submit"
        className="bg-yellow-500 text-black px-6 py-3 rounded-lg font-bold hover:bg-yellow-400 transition"
      >
        Cari
      </button>
    </form>
  );
}
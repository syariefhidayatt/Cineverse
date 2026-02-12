"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";

export default function AddToFav({ movieId, title, posterPath, isAlreadyFavorited }) {
  const [isFavorited, setIsFavorited] = useState(isAlreadyFavorited);
  const router = useRouter();
  const { data: session } = useSession();

  const handleFavorite = async (e) => {
    e.preventDefault();
    e.stopPropagation();

    if (!session) {
      alert("Silahkan login terlebih dahulu");
      return;
    }

    if (isFavorited) {
      const res = await fetch("/api/favorites", {
        method: "DELETE",
        body: JSON.stringify({ movieId }),
      });

      if (res.ok) {
        setIsFavorited(false);
        alert("Dihapus dari koleksi");
        router.refresh();
      } else {
        alert("Gagal menghapus data.");
      }

    } else {
      const res = await fetch("/api/favorites", {
        method: "POST",
        body: JSON.stringify({ movieId, title, posterPath }),
      });

      if (res.ok) {
        setIsFavorited(true);
        alert("Disimpan ke koleksi");
      } else {
        alert("Gagal menambahkan (Mungkin sudah ada di favoritmu?)");
        setIsFavorited(true);
      }
    }
  };

  return (
    <button
      onClick={handleFavorite}
      className={`w-full py-2 rounded font-bold cursor-pointer transition ${isFavorited
        ? "bg-red-600 hover:bg-red-700 text-white"
        : "bg-blue-600 hover:bg-blue-700 text-white"
        }`}
    >
      {isFavorited ? "Hapus Favorit" : "Tambah Favorit"}
    </button>
  );
}
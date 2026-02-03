"use client"
import Image from "next/image";
import Link from "next/link";
import AddToFav from "@/components/AddToFav"

export default function MovieCard({ movie }) {
  return (
    <Link href={`/movie/${movie.id}`} className="group cursor-pointer block h-full">

      <div className="relative overflow-hidden rounded-lg shadow-lg border border-gray-700 h-full flex flex-col">
        <div className="relative w-full aspect-2/3">
          <Image
            src={`${process.env.NEXT_PUBLIC_IMAGE_URL}${movie.poster_path}`}
            alt={movie.title}
            loading="lazy"
            fill
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            className="group-hover:scale-105 transition-transform duration-300 object-cover"
          />
        </div>

        <div className="p-2 bg-gray-900 text-white text-center flex flex-col justify-between flex-1">
          <h2 className="text-sm font-semibold truncate">{movie.title}</h2>
          <p className="text-xs text-yellow-400 mt-1">⭐ {movie.vote_average.toFixed(1)}</p>
        </div>
        <AddToFav
          movieId={movie.id}
          title={movie.title}
          posterPath={movie.poster_path}
        />
      </div>
    </Link>
  );
}
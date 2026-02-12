"use client"
import Image from "next/image";
import Link from "next/link";
import AddToFav from "@/components/AddToFav"

export default function MovieCard({ movie, isAlreadyFavorited }) {

  return (
    <div className="relative overflow-hidden rounded-lg shadow-lg border border-gray-700 h-full flex flex-col">
      <Link href={`/movie/${movie.id}`} className="group cursor-pointer block h-full">
        <div className="relative w-full aspect-2/3">
          {movie.poster_path ? (
            <Image
              src={`${process.env.NEXT_PUBLIC_IMAGE_URL}${movie.poster_path}`}
              alt={movie.title}
              loading="eager"
              fill
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              className="group-hover:scale-105 transition-transform duration-300 object-cover"
            />
          ) : (
            <div className="bg-gray-400 h-75 w-full flex items-center justify-center rounded">
              <span className="text-sm">No Image</span>
            </div>
          )}
        </div>
        <div className="p-2 bg-gray-900 text-white text-center flex flex-col justify-between flex-1">
          <h2 className="text-sm font-semibold truncate">{movie.title}</h2>
        </div>
      </Link>

      <AddToFav
        movieId={movie.id}
        title={movie.title}
        posterPath={movie.poster_path}
        isAlreadyFavorited={isAlreadyFavorited}
      />
    </div>
  );
}
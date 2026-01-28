import MovieCard from "@/components/MovieCard";
import Image from "next/image";
import Link from "next/link";

async function searchMovies(keyword) {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_BASE_URL}/search/movie?api_key=${process.env.NEXT_PUBLIC_API_KEY}&query=${keyword}&language=en-US&page=1`
  );
  const data = await res.json();
  return data.results;
}

export default async function SearchPage({ params }) {
  const { keyword } = await params
  const decodedKeyword = decodeURIComponent(keyword)
  const movies = await searchMovies(keyword)

  return (
    <div className="container mx-auto p-4">
      <Link href="/" className="text-blue-400 hover:underline mb-4 inline-block">
        &larr; Kembali ke Popular
      </Link>

      <h1 className="text-2xl font-bold mb-6">
        Hasil Pencarian untuk: <span className="text-yellow-500">{decodedKeyword}</span>
      </h1>

      {movies.length === 0 && (
        <p className="text-center text-gray-400 mt-10">Tidak ditemukan film dengan judul tersebut 😔</p>
      )}

      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {movies.map((movie) => (
          movie.poster_path && (
            <MovieCard movie={movie} key={movie.id} />
          )
        ))}
      </div>
    </div>
  );
}
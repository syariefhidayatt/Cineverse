import MovieCard from "@/components/MovieCard";
import Link from "next/link";

async function TopRated() {
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_URL}/movie/top_rated?api_key=${process.env.NEXT_PUBLIC_API_KEY}&language=en-US&page=1`
    );
    if (!res.ok) {
      throw new Error("Gagal mengambil data")
    }
    const data = await res.json()
    return data.results;
  } catch (error) {
    console.error("Terjadi kesalahan: ", error)
  }
}

export default async function TopRatedPage() {
  const movies = await TopRated()

  return (
    <div className="container mx-auto p-4">
      <nav className="flex flex-row gap-4 place-content-between ">
        <h1 className="text-2xl font-bold mb-4">Top Rated Movies</h1>
        <div className="flex gap-4 font-bold">
          <Link href="/" className="mb-4 p-2 hover:bg-rose-700 rounded">Home</Link>
        </div>
      </nav>
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {movies.map((movie) => (
          movie.poster_path && (
            <MovieCard key={movie.id} movie={movie} />
          )
        ))}
      </div>
    </div>
  )
}

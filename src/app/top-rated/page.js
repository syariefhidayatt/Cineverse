import MovieCard from "@/components/MovieCard";
import Pagination from "@/components/Pagination";
import SearchInput from "@/components/SearchInput";
import Link from "next/link";

async function TopRated(page = 1) {
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_URL}/movie/top_rated?api_key=${process.env.NEXT_PUBLIC_API_KEY}&page=${page}`
    );
    if (!res.ok) {
      throw new Error("Gagal mengambil data")
    }
    const data = await res.json()
    return {
      movies: data.results,
      totalPages: data.total_pages
    }
  } catch (error) {
    console.error("Terjadi kesalahan: ", error)
  }
}

export default async function TopRatedPage({ searchParams }) {
  const params = await searchParams
  const page = params?.page ? Number(params.page) : 1
  const { movies, totalPages } = await TopRated(page)

  return (
    <div className="container mx-auto p-4">
      <nav className="flex flex-row gap-4 place-content-between ">
        <h1 className="text-2xl font-bold mb-4">Top Rated Movies</h1>
        <div className="flex gap-4 font-bold">
          <Link href="/" className="mb-4 p-2 hover:bg-rose-700 rounded">Home</Link>
        </div>
      </nav>
      <SearchInput />
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {movies.map((movie) => (
          movie.poster_path && (
            <MovieCard key={movie.id} movie={movie} />
          )
        ))}
      </div>
      <Pagination page={page} baseUrl="" totalPages={totalPages} />
    </div>
  )
}

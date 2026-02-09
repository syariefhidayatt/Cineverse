import SearchInput from "@/components/SearchInput";
import MovieCard from "@/components/MovieCard";
import Link from "next/link";
import Pagination from "@/components/Pagination";

async function getMovies(page = 1) {
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_URL}/movie/popular?api_key=${process.env.NEXT_PUBLIC_API_KEY}&page=${page}`
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
  return []
}
export default async function Home({ searchParams }) {
  const params = await searchParams;
  const page = params?.page ? Number(params.page) : 1;
  const { movies, totalPages } = await getMovies(page)

  return (
    <div className="container mx-auto p-4">
      <nav className="flex flex-row gap-4 place-content-between ">
        <Link href="/">
          <h1 className="text-3xl font-bold mt-1">🎬 CineVerse</h1>
        </Link>
        <div className="flex mb-5 p-2 gap-4 font-bold hover:bg-rose-700 rounded">
          <Link href="/top-rated">Top Rated</Link>
        </div>
      </nav>
      <SearchInput />
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {movies.map((movie) => (
          movie.poster_path && (
            <MovieCard movie={movie} key={movie.id} />
          )
        ))}
      </div>
      <Pagination page={page} baseUrl="" totalPages={totalPages} />
    </div>
  );
}
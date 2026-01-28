import SearchInput from "@/components/SearchInput";
import MovieCard from "@/components/MovieCard";

async function getMovies() {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_BASE_URL}/movie/popular?api_key=${process.env.NEXT_PUBLIC_API_KEY}&language=en-US&page=1`
  );
  const data = await res.json()
  return data.results;
}
export default async function Home() {
  const movies = await getMovies()

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-6 text-center">🎬 CineVerse</h1>

      <SearchInput />

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
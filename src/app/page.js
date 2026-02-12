import MovieCard from "@/components/MovieCard";
import Pagination from "@/components/Pagination";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { getServerSession } from "next-auth";
import prisma from "@/lib/prisma";
import SearchInput from "@/components/SearchInput";

async function getMovies(page = 1) {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_BASE_URL}/movie/popular?api_key=${process.env.NEXT_PUBLIC_API_KEY}&page=${page}`,
    { next: { revalidate: 3600 } }
  );
  const data = await res.json();
  return { movies: data.results, totalPages: data.total_pages };
}

export default async function Home({ searchParams }) {
  const params = await searchParams;
  const page = params?.page ? Number(params.page) : 1;
  const { movies, totalPages } = await getMovies(page);
  let userFavoriteIds = [];
  const session = await getServerSession(authOptions);

  if (session) {
    const favorites = await prisma.favorite.findMany({
      where: {
        user: { email: session.user.email },
      },
      select: {
        movieId: true,
      },
    });
    userFavoriteIds = favorites.map((fav) => fav.movieId);
  }

  return (
    <div className="px-4 py-8 max-w-7xl mx-auto">
      
      <SearchInput />
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {movies.map((movie) => {
          const isFavorited = userFavoriteIds.includes(movie.id);

          return (
            <div key={movie.id}>
              <MovieCard
                movie={movie}
                isAlreadyFavorited={isFavorited}
              />
            </div>
          );
        })}
      </div>
      
      <Pagination page={page} totalPages={totalPages} baseUrl="" />
    </div>
  );
}
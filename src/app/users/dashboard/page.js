import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { getServerSession } from "next-auth";
import { prisma } from "@/lib/prisma";
import MovieCard from "@/components/MovieCard";
import Link from "next/link";
import Image from "next/image";

export const metadata = {
  title: "Dashboard | CineVerse"
}

export default async function DashboardPage() {
  const session = await getServerSession(authOptions)

  if (!session) {
    return (
      <div className="flex justify-center items-center h-screen">
        <h1 className="text-2xl font-bold">Silakan login terlebih dahulu</h1>
      </div>
    )
  }

  const favorites = await prisma.favorite.findMany({
    where: {
      user: {
        email: session.user.email
      }
    }
  })

  return (
    <div className="text-color-primary px-4 py-8 max-w-7xl mx-auto">
      <div className="flex items-center gap-4 mb-8">
        <Image
          src={session.user.image}
          alt={session.user.name}
          width={80}
          height={80}
          className="rounded-full border-2 border-color-accent"
        />
        <div>
          <h1 className="text-2xl font-bold">Dashboard {session.user.name}</h1>
        </div>
      </div>
      <h2 className="text-xl font-bold mb-4 border-b pb-2">My Favorite Movies </h2>
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {favorites.length === 0 ? (
          <div className="col-span-full  text-center py-10 text-gray-400">
            <p className="mb-4">Belum ada film favorit</p>
            <Link
              href="/"
              className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition"
            >
              Cari Film Dulu
            </Link>
          </div>
        ) : (
          favorites.map((fav) => {
            const formattedMovie = {
              id: fav.movieId,
              title: fav.title,
              poster_path: fav.posterPath,
              vote_average: null,
            }

            return (
              <div key={fav.id} className="relative">
                <MovieCard movie={formattedMovie} isAlreadyFavorited={true} />
              </div>
            )
          })
        )}
      </div>
    </div>
  )
}
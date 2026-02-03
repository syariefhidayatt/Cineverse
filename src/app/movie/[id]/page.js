import Image from "next/image";
import Link from "next/link";

async function getMovieDetail(id) {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_BASE_URL}/movie/${id}?api_key=${process.env.NEXT_PUBLIC_API_KEY}`
  );
  return res.json()
}

export default async function MovieDetailPage({ params }) {
  const { id } = await params
  const movie = await getMovieDetail(id)

  return (
    <div className="container mx-auto p-4 text-white">
      <Link href="/" className="text-blue-400 hover:underline mb-4 inline-block">
        &larr; Kembali ke Home
      </Link>

      <div className="flex flex-col md:flex-row gap-8 mt-4">
        <div className="w-full md:w-1/3">
          <Image
            src={`${process.env.NEXT_PUBLIC_IMAGE_URL}${movie.poster_path}`}
            alt={movie.title}
            loading="eager"
            width={500}
            height={750}
            className="rounded-lg shadow-xl"
          />
        </div>

        <div className="w-full md:w-2/3">
          <h1 className="text-4xl font-bold mb-2">{movie.title}</h1>
          <p className="text-gray-400 italic mb-4">{movie.tagline}</p>

          <div className="flex gap-4 mb-6">
            <span className="bg-yellow-500 text-black px-3 py-1 rounded font-bold">
              ⭐ {movie.vote_average.toFixed(1)}
            </span>
            <span className="bg-gray-700 px-3 py-1 rounded">
              📅 {movie.release_date}
            </span>
            <span className="bg-gray-700 px-3 py-1 rounded">
              ⏳ {movie.runtime} menit
            </span>
          </div>

          <h3 className="text-xl font-semibold mb-2">Sinopsis</h3>
          <p className="text-gray-300 leading-relaxed">{movie.overview}</p>
        </div>
      </div>
    </div>
  );
}

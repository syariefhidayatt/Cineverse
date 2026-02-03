"use client";

export default function AddToFav({ movieId, title, posterPath }) {
  const handleSave = async (e) => {
    e.preventDefault()
    e.stopPropagation()
    const apiUrl = "/api/favorites";

    console.log(movieId, title)
    try {
      const response = await fetch(apiUrl, {
        method: "POST",
        headers: {
          "Content-type": "application/json",
        },
        body: JSON.stringify({
          tmdbId: movieId,
          title: title,
          posterPath: posterPath,
        }),
      });

      if (response.ok) {
        alert("Film berhasil disimpan");
      } else {
        alert("Gagal menyimpan");
      }
    } catch (error) {
      console.error("Error server", error);
    }
  };

  return (
    <button
      onClick={handleSave}
      className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 transition"
    >
      Simpan ke favorite
    </button>
  );
}

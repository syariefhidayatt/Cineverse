import Link from "next/link";

export default function Pagination({ page, baseUrl, totalPages }) {
  const currentPage = Number(page)
  const maxPage = Math.min(totalPages, 500)
  const pageNumbers = []
  const offset = 2

  let startPage = currentPage - offset
  let endPage = currentPage + offset

  if (startPage < 1) {
    startPage = 1
  }

  if (endPage >= maxPage) {
    endPage = maxPage
  }

  for (let i = startPage; i <= endPage; i++) {
    pageNumbers.push(i)
  }

  return (
    <div className="flex justify-center items-center gap-4 py-8">
      {currentPage > 1 && (
        <Link
          href={`${baseUrl}?page=${currentPage - 1}`}
          className=" text-white px-4 py-2 rounded hover:bg-rose-700 transition"
        >
          Prev
        </Link>
      )}

      {pageNumbers.map((num) => {
        const isActive = num === currentPage
        return (
          <Link
            key={num}
            href={`${baseUrl}?page=${num}`}
            className={`px-4 py-2 rounded transition font-bold ${isActive
              ? "bg-rose-700 text-white shadow-lg"
              : "text-white  hover:bg-rose-700"
              }`}>
            {num}
          </Link>
        )
      })}

      {currentPage < maxPage && (
        <Link
          href={`${baseUrl}?page=${currentPage + 1}`}
          className="  text-white px-4 py-2 rounded hover:bg-rose-700 transition"
        >
          Next
        </Link>
      )}
    </div>
  )
}
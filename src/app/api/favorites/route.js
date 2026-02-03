import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export async function GET() {
  const favorites = await prisma.favorite.findMany({
    orderBy: {
      createdAt: "desc"
    }
  })
  return NextResponse.json(favorites)
}
export async function POST(request) {
  const body = await request.json()
  const { tmdbId, title, posterPath } = body

  const existingFavorite = await prisma.favorite.findUnique({
    where: { tmdbId: parseInt(tmdbId) }
  })

  if (existingFavorite) {
    return NextResponse.json({ message: "Film ini sudah ada di favorit" }, { status: 400 })
  }

  const newFavorite = await prisma.favorite.create({
    data: {
      tmdbId: parseInt(tmdbId),
      title,
      posterPath,
    },
  });
  return NextResponse.json(newFavorite, { status: 201 })
}
import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { getServerSession } from "next-auth";
import { authOptions } from "../auth/[...nextauth]/route";

export async function POST(request) {
  const session = await getServerSession(authOptions);

  if (!session) {
    return NextResponse.json(
      { message: "Anda harus login untuk menyimpan favorit" },
      { status: 401 }
    );
  }

  const { movieId, title, posterPath } = await request.json();

  try {
    const favorite = await prisma.favorite.create({
      data: {
        movieId,
        title,
        posterPath,
        user: {
          connect: { email: session.user.email }
        }
      }
    });
    return NextResponse.json({ message: "Berhasil disimpan", data: favorite });
  } catch (error) {
    return NextResponse.json({ message: "Gagal menyimpan" }, { status: 500 });
  }
}

export async function DELETE(request) {
  const session = await getServerSession(authOptions);

  if (!session) {
    return NextResponse.json({ message: "Belum login" }, { status: 401 });
  }

  const { movieId } = await request.json();

  try {
    await prisma.favorite.deleteMany({
      where: {
        user: { email: session.user.email },
        movieId: movieId
      }
    });
    return NextResponse.json({ message: "Berhasil dihapus" });
  } catch (error) {
    return NextResponse.json({ message: "Gagal menghapus" }, { status: 500 });
  }
}
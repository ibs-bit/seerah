import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/db";

// GET /api/surahs/[id] - Get a single surah with its verses
export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const surahId = parseInt(id, 10);

    if (isNaN(surahId) || surahId < 1 || surahId > 114) {
      return NextResponse.json(
        { success: false, error: "Invalid surah ID. Must be between 1 and 114." },
        { status: 400 }
      );
    }

    const surah = await prisma.surah.findUnique({
      where: { id: surahId },
      include: {
        verses: {
          orderBy: { verseNumber: "asc" },
          include: {
            translations: true,
            tafsirs: true,
            revelationContext: true,
          },
        },
      },
    });

    if (!surah) {
      return NextResponse.json(
        { success: false, error: "Surah not found" },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
      data: surah,
    });
  } catch (error) {
    console.error("Error fetching surah:", error);
    return NextResponse.json(
      { success: false, error: "Failed to fetch surah" },
      { status: 500 }
    );
  }
}

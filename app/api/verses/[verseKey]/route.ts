import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/db";

// GET /api/verses/[verseKey] - Get a single verse by key (e.g., "1:1", "2:255")
export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ verseKey: string }> }
) {
  try {
    const { verseKey } = await params;

    // Validate verse key format
    const keyPattern = /^\d+:\d+$/;
    if (!keyPattern.test(verseKey)) {
      return NextResponse.json(
        { success: false, error: "Invalid verse key format. Use format like '1:1' or '2:255'" },
        { status: 400 }
      );
    }

    const verse = await prisma.verse.findUnique({
      where: { verseKey },
      include: {
        surah: true,
        translations: true,
        tafsirs: true,
        revelationContext: true,
      },
    });

    if (!verse) {
      return NextResponse.json(
        { success: false, error: "Verse not found" },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
      data: verse,
    });
  } catch (error) {
    console.error("Error fetching verse:", error);
    return NextResponse.json(
      { success: false, error: "Failed to fetch verse" },
      { status: 500 }
    );
  }
}

import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/db";
import { versesQuerySchema, formatZodErrors } from "@/lib/validations";

// GET /api/verses - Get verses with pagination and filters
export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;

    // Validate query parameters with Zod
    const parseResult = versesQuerySchema.safeParse({
      surahId: searchParams.get("surahId") || undefined,
      page: searchParams.get("page") || undefined,
      limit: searchParams.get("limit") || undefined,
      translations: searchParams.get("translations") || undefined,
      tafsir: searchParams.get("tafsir") || undefined,
      context: searchParams.get("context") || undefined,
    });

    if (!parseResult.success) {
      return NextResponse.json(
        {
          success: false,
          error: "Invalid query parameters",
          details: formatZodErrors(parseResult.error),
        },
        { status: 400 }
      );
    }

    const { surahId, page, limit, translations, tafsir, context } =
      parseResult.data;

    const skip = (page - 1) * limit;

    // Build the query
    const where = surahId ? { surahId } : {};

    const [verses, total] = await Promise.all([
      prisma.verse.findMany({
        where,
        skip,
        take: limit,
        orderBy: [{ surahId: "asc" }, { verseNumber: "asc" }],
        include: {
          surah: true,
          translations: translations,
          tafsirs: tafsir,
          revelationContext: context,
        },
      }),
      prisma.verse.count({ where }),
    ]);

    return NextResponse.json({
      success: true,
      data: verses,
      pagination: {
        page,
        limit,
        total,
        totalPages: Math.ceil(total / limit),
      },
    });
  } catch (error) {
    console.error("Error fetching verses:", error);
    return NextResponse.json(
      { success: false, error: "Failed to fetch verses" },
      { status: 500 }
    );
  }
}

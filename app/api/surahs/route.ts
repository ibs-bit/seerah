import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/db";
import { surahsQuerySchema, formatZodErrors } from "@/lib/validations";

// GET /api/surahs - Get all surahs
export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;

    // Validate query parameters with Zod
    const parseResult = surahsQuerySchema.safeParse({
      sortBy: searchParams.get("sortBy") || undefined,
      revelationType: searchParams.get("revelationType") || undefined,
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

    const { sortBy, revelationType } = parseResult.data;

    // Build the query
    const where = revelationType ? { revelationType } : {};

    const orderBy =
      sortBy === "chronological"
        ? { chronologicalOrder: "asc" as const }
        : { id: "asc" as const };

    const surahs = await prisma.surah.findMany({
      where,
      orderBy,
    });

    return NextResponse.json({
      success: true,
      data: surahs,
      count: surahs.length,
    });
  } catch (error) {
    console.error("Error fetching surahs:", error);
    return NextResponse.json(
      { success: false, error: "Failed to fetch surahs" },
      { status: 500 }
    );
  }
}

import { notFound } from "next/navigation";
import { SurahHeader } from "@/components/quran/surah-header";
import { VerseScrollContainer } from "@/components/quran/verse-scroll-container";
import prisma from "@/lib/db";
import type { Surah, VerseWithDetails } from "@/types";

interface SurahPageProps {
  params: Promise<{ id: string }>;
}

export async function generateMetadata({ params }: SurahPageProps) {
  const { id } = await params;
  const surahId = parseInt(id, 10);

  if (isNaN(surahId) || surahId < 1 || surahId > 114) {
    return { title: "Surah Not Found" };
  }

  const surah = await prisma.surah.findUnique({
    where: { id: surahId },
  });

  if (!surah) {
    return { title: "Surah Not Found" };
  }

  return {
    title: `${surah.nameTransliteration} (${surah.name}) - Seerah`,
    description: `Read Surah ${surah.nameTransliteration} (${surah.nameTranslation}) with translation, tafsir, and reasons for revelation.`,
  };
}

async function getSurahWithVerses(
  id: number
): Promise<{ surah: Surah; verses: VerseWithDetails[] } | null> {
  const surahData = await prisma.surah.findUnique({
    where: { id },
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

  if (!surahData) return null;

  const surah: Surah = {
    id: surahData.id,
    name: surahData.name,
    nameTransliteration: surahData.nameTransliteration,
    nameTranslation: surahData.nameTranslation,
    revelationType: surahData.revelationType as "Meccan" | "Medinan",
    chronologicalOrder: surahData.chronologicalOrder,
    versesCount: surahData.versesCount,
    description: surahData.description ?? undefined,
  };

  const verses: VerseWithDetails[] = surahData.verses.map((v) => ({
    id: v.id,
    surahId: v.surahId,
    verseNumber: v.verseNumber,
    verseKey: v.verseKey,
    textArabic: v.textArabic,
    textUthmani: v.textUthmani,
    textSimple: v.textSimple,
    juzNumber: v.juzNumber,
    hizbNumber: v.hizbNumber,
    pageNumber: v.pageNumber,
    surah,
    translations: v.translations.map((t) => ({
      id: t.id,
      verseId: t.verseId,
      language: t.language,
      translator: t.translator,
      text: t.text,
    })),
    tafsirs: v.tafsirs.map((t) => ({
      id: t.id,
      verseId: t.verseId,
      source: t.source,
      language: t.language,
      text: t.text,
    })),
    revelationContext: v.revelationContext
      ? {
          id: v.revelationContext.id,
          verseId: v.revelationContext.verseId,
          occasion: v.revelationContext.occasion,
          historicalDate: v.revelationContext.historicalDate ?? undefined,
          location: v.revelationContext.location ?? undefined,
          relatedEvents: v.revelationContext.relatedEvents ?? undefined,
          sources: v.revelationContext.sources,
        }
      : undefined,
  }));

  return { surah, verses };
}

export default async function SurahPage({ params }: SurahPageProps) {
  const { id } = await params;
  const surahId = parseInt(id, 10);

  if (isNaN(surahId) || surahId < 1 || surahId > 114) {
    notFound();
  }

  const data = await getSurahWithVerses(surahId);

  if (!data) {
    notFound();
  }

  const { surah, verses } = data;

  // If no verses in DB yet, show a placeholder message
  const hasVerses = verses.length > 0;

  return (
    <div className="min-h-screen">
      <SurahHeader surah={surah} />

      {hasVerses ? (
        <VerseScrollContainer verses={verses} />
      ) : (
        <div className="max-w-4xl mx-auto px-4 py-12 text-center">
          <div className="bg-muted/50 rounded-lg p-8">
            <p
              className="arabic-text text-2xl mb-4 text-primary"
              dir="rtl"
              lang="ar"
            >
              {surah.name}
            </p>
            <h2 className="text-xl font-semibold mb-2">
              {surah.nameTransliteration}
            </h2>
            <p className="text-muted-foreground mb-4">
              {surah.nameTranslation}
            </p>
            <p className="text-sm text-muted-foreground">
              This surah has {surah.versesCount} verses. Full verse data is
              being loaded from authentic sources.
            </p>
            <div className="mt-6 flex flex-wrap justify-center gap-2 text-sm">
              <span className="px-3 py-1 bg-background rounded-full">
                {surah.revelationType}
              </span>
              <span className="px-3 py-1 bg-background rounded-full">
                Revelation Order: #{surah.chronologicalOrder}
              </span>
              <span className="px-3 py-1 bg-background rounded-full">
                {surah.versesCount} Verses
              </span>
            </div>
          </div>
        </div>
      )}

      {/* Navigation */}
      <div className="fixed bottom-6 left-1/2 -translate-x-1/2 flex gap-4 bg-background/80 backdrop-blur-md border rounded-full px-6 py-3 shadow-lg z-50">
        {surahId > 1 && (
          <a
            href={`/surah/${surahId - 1}`}
            className="text-sm font-medium hover:text-primary transition-colors"
          >
            ← Previous Surah
          </a>
        )}
        <a
          href="/surah"
          className="text-sm font-medium hover:text-primary transition-colors"
        >
          All Surahs
        </a>
        {surahId < 114 && (
          <a
            href={`/surah/${surahId + 1}`}
            className="text-sm font-medium hover:text-primary transition-colors"
          >
            Next Surah →
          </a>
        )}
      </div>
    </div>
  );
}

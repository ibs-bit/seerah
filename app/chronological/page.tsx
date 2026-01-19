import { ChronologicalTimeline } from "@/components/quran/chronological-timeline";
import prisma from "@/lib/db";
import type { Surah } from "@/types";

export const metadata = {
  title: "Chronological Order - Seerah",
  description:
    "Explore the Quran in the order it was revealed, from the first verses in the Cave of Hira to the final revelation.",
};

async function getSurahs(): Promise<Surah[]> {
  const surahs = await prisma.surah.findMany({
    orderBy: { chronologicalOrder: "asc" },
  });

  return surahs.map((surah) => ({
    id: surah.id,
    name: surah.name,
    nameTransliteration: surah.nameTransliteration,
    nameTranslation: surah.nameTranslation,
    revelationType: surah.revelationType as "Meccan" | "Medinan",
    chronologicalOrder: surah.chronologicalOrder,
    versesCount: surah.versesCount,
    description: surah.description ?? undefined,
  }));
}

export default async function ChronologicalPage() {
  const surahs = await getSurahs();

  return (
    <div className="min-h-screen py-8">
      <div className="container mx-auto px-4">
        {/* Page Header */}
        <div className="text-center mb-12">
          <h1 className="text-3xl md:text-4xl font-bold mb-4">
            Chronological Revelation Order
          </h1>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            The Quran was revealed over 23 years to Prophet Muhammad (peace be
            upon him). This timeline shows the surahs in the order they were
            revealed, from the first revelation in the Cave of Hira to the final
            verses.
          </p>
        </div>

        {/* Timeline */}
        <ChronologicalTimeline surahs={surahs} />
      </div>
    </div>
  );
}

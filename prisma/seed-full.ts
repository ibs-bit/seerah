import { PrismaClient } from "@prisma/client";
import { SURAHS } from "../data/surahs";

const prisma = new PrismaClient();

// API endpoint for Quran data (no auth required)
const QURAN_API_BASE = "https://api.quran.com/api/v4";

interface QuranApiVerse {
  id: number;
  verse_key: string;
  verse_number: number;
  text_uthmani: string;
  text_imlaei: string;
  juz_number: number;
  hizb_number: number;
  page_number: number;
}

interface QuranApiTranslation {
  resource_id: number;
  text: string;
}

interface QuranApiResponse {
  verses: QuranApiVerse[];
  pagination: {
    per_page: number;
    current_page: number;
    total_pages: number;
    total_records: number;
  };
}

interface TranslationResponse {
  translations: QuranApiTranslation[];
}

async function fetchWithRetry(url: string, retries = 3): Promise<Response> {
  for (let i = 0; i < retries; i++) {
    try {
      const response = await fetch(url);
      if (response.ok) return response;
      if (response.status === 429) {
        // Rate limited, wait and retry
        await new Promise((r) => setTimeout(r, 2000 * (i + 1)));
        continue;
      }
      throw new Error(`HTTP ${response.status}`);
    } catch (error) {
      if (i === retries - 1) throw error;
      await new Promise((r) => setTimeout(r, 1000 * (i + 1)));
    }
  }
  throw new Error("Max retries exceeded");
}

async function fetchVersesForSurah(surahId: number): Promise<QuranApiVerse[]> {
  const allVerses: QuranApiVerse[] = [];
  let page = 1;
  let totalPages = 1;

  do {
    const url = `${QURAN_API_BASE}/verses/by_chapter/${surahId}?language=en&words=false&per_page=50&page=${page}&fields=text_uthmani,text_imlaei,verse_key`;
    const response = await fetchWithRetry(url);
    const data: QuranApiResponse = await response.json();

    allVerses.push(...data.verses);
    totalPages = data.pagination.total_pages;
    page++;

    // Small delay to avoid rate limiting
    await new Promise((r) => setTimeout(r, 100));
  } while (page <= totalPages);

  return allVerses;
}

async function fetchTranslationsForSurah(
  surahId: number
): Promise<Map<string, string>> {
  const translations = new Map<string, string>();
  let page = 1;
  let totalPages = 1;

  do {
    // Using Sahih International translation (resource_id: 131)
    const url = `${QURAN_API_BASE}/quran/translations/131?chapter_number=${surahId}&per_page=50&page=${page}`;
    const response = await fetchWithRetry(url);
    const data: TranslationResponse = await response.json();

    // The translations array is indexed by verse position
    data.translations.forEach((t, index) => {
      const verseNum = (page - 1) * 50 + index + 1;
      const verseKey = `${surahId}:${verseNum}`;
      // Clean HTML tags from translation text
      translations.set(verseKey, t.text.replace(/<[^>]*>/g, ""));
    });

    // Estimate total pages based on surah verse count
    const surah = SURAHS.find((s) => s.id === surahId);
    totalPages = Math.ceil((surah?.versesCount || 0) / 50);
    page++;

    await new Promise((r) => setTimeout(r, 100));
  } while (page <= totalPages);

  return translations;
}

async function main() {
  console.log("🌱 Starting FULL database seed...\n");

  // Clear existing data
  console.log("🧹 Clearing existing data...");
  await prisma.revelationContext.deleteMany();
  await prisma.tafsir.deleteMany();
  await prisma.translation.deleteMany();
  await prisma.verse.deleteMany();
  await prisma.surah.deleteMany();

  // Seed Surahs
  console.log("📖 Seeding all 114 surahs...");
  for (const surah of SURAHS) {
    await prisma.surah.create({
      data: {
        id: surah.id,
        name: surah.name,
        nameTransliteration: surah.nameTransliteration,
        nameTranslation: surah.nameTranslation,
        revelationType: surah.revelationType,
        chronologicalOrder: surah.chronologicalOrder,
        versesCount: surah.versesCount,
        description: surah.description,
      },
    });
  }
  console.log(`✅ Seeded ${SURAHS.length} surahs\n`);

  // Seed all verses for each surah
  let totalVerses = 0;
  let totalTranslations = 0;

  for (const surah of SURAHS) {
    console.log(
      `📜 Fetching Surah ${surah.id} (${surah.nameTransliteration})...`
    );

    try {
      // Fetch verses from API
      const verses = await fetchVersesForSurah(surah.id);
      const translations = await fetchTranslationsForSurah(surah.id);

      // Insert verses
      for (const verse of verses) {
        const createdVerse = await prisma.verse.create({
          data: {
            surahId: surah.id,
            verseNumber: verse.verse_number,
            verseKey: verse.verse_key,
            textArabic: verse.text_imlaei || verse.text_uthmani,
            textUthmani: verse.text_uthmani,
            textSimple: verse.text_imlaei || verse.text_uthmani,
            juzNumber: verse.juz_number,
            hizbNumber: verse.hizb_number,
            pageNumber: verse.page_number,
          },
        });

        totalVerses++;

        // Add translation if available
        const translationText = translations.get(verse.verse_key);
        if (translationText) {
          await prisma.translation.create({
            data: {
              verseId: createdVerse.id,
              language: "en",
              translator: "Sahih International",
              text: translationText,
            },
          });
          totalTranslations++;
        }
      }

      console.log(`   ✓ Added ${verses.length} verses`);
    } catch (error) {
      console.error(`   ✗ Error fetching Surah ${surah.id}:`, error);
    }

    // Delay between surahs to avoid rate limiting
    await new Promise((r) => setTimeout(r, 500));
  }

  console.log(`\n🎉 Database seeding completed!`);
  console.log(`   Total Surahs: 114`);
  console.log(`   Total Verses: ${totalVerses}`);
  console.log(`   Total Translations: ${totalTranslations}`);
}

main()
  .catch((e) => {
    console.error("❌ Error seeding database:", e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });

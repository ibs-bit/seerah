import { PrismaClient } from "@prisma/client";
import { SURAHS } from "../data/surahs";

const prisma = new PrismaClient();

// Sample verses with translations and tafsir for demonstration
// In production, you would fetch from Quran.com API or import full dataset

const SAMPLE_VERSES = [
  // Al-Fatihah (Surah 1)
  {
    surahId: 1,
    verseNumber: 1,
    verseKey: "1:1",
    textArabic: "بِسْمِ اللَّهِ الرَّحْمَٰنِ الرَّحِيمِ",
    textUthmani: "بِسۡمِ ٱللَّهِ ٱلرَّحۡمَـٰنِ ٱلرَّحِيمِ",
    textSimple: "بسم الله الرحمن الرحيم",
    juzNumber: 1,
    hizbNumber: 1,
    pageNumber: 1,
    translation: "In the name of Allah, the Entirely Merciful, the Especially Merciful.",
    tafsir: "This verse, known as the Bismillah, opens almost every surah of the Quran. It teaches Muslims to begin every action with the remembrance of Allah, seeking His blessings and mercy.",
    revelationContext: "This was among the first revelations to Prophet Muhammad (peace be upon him) in Mecca, establishing the foundation of all Islamic actions.",
  },
  {
    surahId: 1,
    verseNumber: 2,
    verseKey: "1:2",
    textArabic: "الْحَمْدُ لِلَّهِ رَبِّ الْعَالَمِينَ",
    textUthmani: "ٱلۡحَمۡدُ لِلَّهِ رَبِّ ٱلۡعَـٰلَمِينَ",
    textSimple: "الحمد لله رب العالمين",
    juzNumber: 1,
    hizbNumber: 1,
    pageNumber: 1,
    translation: "All praise is due to Allah, Lord of the worlds.",
    tafsir: "This verse establishes that all praise and gratitude belongs to Allah alone, the Creator and Sustainer of everything that exists. 'Worlds' includes humans, jinn, angels, and all of creation.",
  },
  {
    surahId: 1,
    verseNumber: 3,
    verseKey: "1:3",
    textArabic: "الرَّحْمَٰنِ الرَّحِيمِ",
    textUthmani: "ٱلرَّحۡمَـٰنِ ٱلرَّحِيمِ",
    textSimple: "الرحمن الرحيم",
    juzNumber: 1,
    hizbNumber: 1,
    pageNumber: 1,
    translation: "The Entirely Merciful, the Especially Merciful.",
    tafsir: "These two names of Allah emphasize His mercy. Ar-Rahman refers to His all-encompassing mercy for all creation, while Ar-Rahim refers to His specific mercy for the believers.",
  },
  {
    surahId: 1,
    verseNumber: 4,
    verseKey: "1:4",
    textArabic: "مَالِكِ يَوْمِ الدِّينِ",
    textUthmani: "مَـٰلِكِ يَوۡمِ ٱلدِّينِ",
    textSimple: "مالك يوم الدين",
    juzNumber: 1,
    hizbNumber: 1,
    pageNumber: 1,
    translation: "Sovereign of the Day of Recompense.",
    tafsir: "Allah is the sole Master of the Day of Judgment, when all beings will be held accountable for their deeds. This reminds us of our ultimate return to Him.",
  },
  {
    surahId: 1,
    verseNumber: 5,
    verseKey: "1:5",
    textArabic: "إِيَّاكَ نَعْبُدُ وَإِيَّاكَ نَسْتَعِينُ",
    textUthmani: "إِيَّاكَ نَعۡبُدُ وَإِيَّاكَ نَسۡتَعِينُ",
    textSimple: "إياك نعبد وإياك نستعين",
    juzNumber: 1,
    hizbNumber: 1,
    pageNumber: 1,
    translation: "It is You we worship and You we ask for help.",
    tafsir: "This verse is the essence of Islam - dedicating all worship to Allah alone and seeking help only from Him. It establishes pure monotheism (Tawhid).",
  },
  {
    surahId: 1,
    verseNumber: 6,
    verseKey: "1:6",
    textArabic: "اهْدِنَا الصِّرَاطَ الْمُسْتَقِيمَ",
    textUthmani: "ٱهۡدِنَا ٱلصِّرَٰطَ ٱلۡمُسۡتَقِيمَ",
    textSimple: "اهدنا الصراط المستقيم",
    juzNumber: 1,
    hizbNumber: 1,
    pageNumber: 1,
    translation: "Guide us to the straight path.",
    tafsir: "The greatest supplication a person can make - asking Allah for guidance to the path of truth, the path of Islam, the path that leads to Paradise.",
  },
  {
    surahId: 1,
    verseNumber: 7,
    verseKey: "1:7",
    textArabic: "صِرَاطَ الَّذِينَ أَنْعَمْتَ عَلَيْهِمْ غَيْرِ الْمَغْضُوبِ عَلَيْهِمْ وَلَا الضَّالِّينَ",
    textUthmani: "صِرَٰطَ ٱلَّذِينَ أَنۡعَمۡتَ عَلَيۡهِمۡ غَيۡرِ ٱلۡمَغۡضُوبِ عَلَيۡهِمۡ وَلَا ٱلضَّآلِّينَ",
    textSimple: "صراط الذين أنعمت عليهم غير المغضوب عليهم ولا الضالين",
    juzNumber: 1,
    hizbNumber: 1,
    pageNumber: 1,
    translation: "The path of those upon whom You have bestowed favor, not of those who have earned [Your] anger or of those who are astray.",
    tafsir: "This describes the straight path as the way of the prophets, the truthful, the martyrs, and the righteous - avoiding the path of those who knew the truth but rejected it, and those who went astray due to ignorance.",
  },
  // Al-Alaq (Surah 96) - First Revealed
  {
    surahId: 96,
    verseNumber: 1,
    verseKey: "96:1",
    textArabic: "اقْرَأْ بِاسْمِ رَبِّكَ الَّذِي خَلَقَ",
    textUthmani: "ٱقۡرَأۡ بِٱسۡمِ رَبِّكَ ٱلَّذِي خَلَقَ",
    textSimple: "اقرأ باسم ربك الذي خلق",
    juzNumber: 30,
    hizbNumber: 60,
    pageNumber: 597,
    translation: "Read in the name of your Lord who created.",
    tafsir: "The first word revealed to Prophet Muhammad was 'Iqra' (Read/Recite). This emphasizes the importance of knowledge in Islam and that all learning should begin with Allah's name.",
    revelationContext: "These were the very first verses revealed to Prophet Muhammad (peace be upon him) in the Cave of Hira through the angel Jibril (Gabriel). The Prophet was 40 years old, in the month of Ramadan.",
  },
  {
    surahId: 96,
    verseNumber: 2,
    verseKey: "96:2",
    textArabic: "خَلَقَ الْإِنْسَانَ مِنْ عَلَقٍ",
    textUthmani: "خَلَقَ ٱلۡإِنسَـٰنَ مِنۡ عَلَقٍ",
    textSimple: "خلق الإنسان من علق",
    juzNumber: 30,
    hizbNumber: 60,
    pageNumber: 597,
    translation: "Created man from a clinging substance.",
    tafsir: "Allah reminds us of our humble origins - created from a clot of blood (alaq). This is a scientific miracle as modern embryology confirms the clinging nature of the early embryo.",
  },
  {
    surahId: 96,
    verseNumber: 3,
    verseKey: "96:3",
    textArabic: "اقْرَأْ وَرَبُّكَ الْأَكْرَمُ",
    textUthmani: "ٱقۡرَأۡ وَرَبُّكَ ٱلۡأَكۡرَمُ",
    textSimple: "اقرأ وربك الأكرم",
    juzNumber: 30,
    hizbNumber: 60,
    pageNumber: 597,
    translation: "Read, and your Lord is the most Generous.",
    tafsir: "Allah encourages seeking knowledge by describing Himself as 'the Most Generous' - He gives knowledge freely to those who seek it.",
  },
  {
    surahId: 96,
    verseNumber: 4,
    verseKey: "96:4",
    textArabic: "الَّذِي عَلَّمَ بِالْقَلَمِ",
    textUthmani: "ٱلَّذِي عَلَّمَ بِٱلۡقَلَمِ",
    textSimple: "الذي علم بالقلم",
    juzNumber: 30,
    hizbNumber: 60,
    pageNumber: 597,
    translation: "Who taught by the pen.",
    tafsir: "The pen is honored as the instrument of knowledge and civilization. Allah taught humanity to write, preserving knowledge for future generations.",
  },
  {
    surahId: 96,
    verseNumber: 5,
    verseKey: "96:5",
    textArabic: "عَلَّمَ الْإِنْسَانَ مَا لَمْ يَعْلَمْ",
    textUthmani: "عَلَّمَ ٱلۡإِنسَـٰنَ مَا لَمۡ يَعۡلَمۡ",
    textSimple: "علم الإنسان ما لم يعلم",
    juzNumber: 30,
    hizbNumber: 60,
    pageNumber: 597,
    translation: "Taught man that which he knew not.",
    tafsir: "All knowledge comes from Allah. Humanity knew nothing until Allah taught us. This should inspire humility and gratitude.",
  },
];

async function main() {
  console.log("🌱 Starting database seed...\n");

  // Clear existing data
  console.log("🧹 Clearing existing data...");
  await prisma.revelationContext.deleteMany();
  await prisma.tafsir.deleteMany();
  await prisma.translation.deleteMany();
  await prisma.verse.deleteMany();
  await prisma.surah.deleteMany();

  // Seed Surahs
  console.log("📖 Seeding surahs...");
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

  // Seed Sample Verses
  console.log("📜 Seeding sample verses...");
  for (const verseData of SAMPLE_VERSES) {
    const verse = await prisma.verse.create({
      data: {
        surahId: verseData.surahId,
        verseNumber: verseData.verseNumber,
        verseKey: verseData.verseKey,
        textArabic: verseData.textArabic,
        textUthmani: verseData.textUthmani,
        textSimple: verseData.textSimple,
        juzNumber: verseData.juzNumber,
        hizbNumber: verseData.hizbNumber,
        pageNumber: verseData.pageNumber,
      },
    });

    // Add translation
    if (verseData.translation) {
      await prisma.translation.create({
        data: {
          verseId: verse.id,
          language: "en",
          translator: "Sahih International",
          text: verseData.translation,
        },
      });
    }

    // Add tafsir
    if (verseData.tafsir) {
      await prisma.tafsir.create({
        data: {
          verseId: verse.id,
          source: "Summary",
          language: "en",
          text: verseData.tafsir,
        },
      });
    }

    // Add revelation context
    if (verseData.revelationContext) {
      await prisma.revelationContext.create({
        data: {
          verseId: verse.id,
          occasion: verseData.revelationContext,
          location: verseData.surahId === 96 ? "Cave of Hira, Mecca" : "Mecca",
          historicalDate: verseData.surahId === 96 ? "610 CE (First Revelation)" : "Early Meccan Period",
          sources: "Sahih al-Bukhari, Sahih Muslim",
        },
      });
    }
  }
  console.log(`✅ Seeded ${SAMPLE_VERSES.length} sample verses with translations and tafsir\n`);

  console.log("🎉 Database seeding completed successfully!");
}

main()
  .catch((e) => {
    console.error("❌ Error seeding database:", e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });

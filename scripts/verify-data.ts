
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function verifyData() {
  try {
    const surahCount = await prisma.surah.count();
    const verseCount = await prisma.verse.count();
    const translationCount = await prisma.translation.count();
    
    console.log('--- Data Verification Results ---');
    console.log(`Total Surahs: ${surahCount} / 114`);
    console.log(`Total Verses: ${verseCount} / 6236 (approx)`);
    console.log(`Total Translations: ${translationCount}`);
    
    // Check coverage
    const surahsWithVerses = await prisma.surah.findMany({
      include: {
        _count: {
          select: { verses: true }
        }
      }
    });
    
    const emptySurahs = surahsWithVerses.filter(s => s._count.verses === 0);
    console.log(`Surahs with 0 verses: ${emptySurahs.length}`);
    
    if (emptySurahs.length > 0) {
      console.log('Sample of empty surahs:', emptySurahs.slice(0, 5).map(s => s.nameTransliteration).join(', '));
    }

  } catch (error) {
    console.error('Verification failed:', error);
  } finally {
    await prisma.$disconnect();
  }
}

verifyData();

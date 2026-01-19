// Chronological order of Quran revelation (scholarly consensus)
// Based on traditional Islamic scholarship

export interface ChronologicalSurahData {
  surahNumber: number;        // Standard Mushaf order (1-114)
  chronologicalOrder: number; // Order of revelation (1-114)
  revelationType: "Meccan" | "Medinan";
  approximatePeriod?: string;
}

// All 114 surahs in chronological revelation order
export const CHRONOLOGICAL_ORDER: ChronologicalSurahData[] = [
  // MECCAN SURAHS (86 surahs - revealed before Hijra)
  { surahNumber: 96, chronologicalOrder: 1, revelationType: "Meccan", approximatePeriod: "First revelation" },
  { surahNumber: 68, chronologicalOrder: 2, revelationType: "Meccan", approximatePeriod: "Early Meccan" },
  { surahNumber: 73, chronologicalOrder: 3, revelationType: "Meccan", approximatePeriod: "Early Meccan" },
  { surahNumber: 74, chronologicalOrder: 4, revelationType: "Meccan", approximatePeriod: "Early Meccan" },
  { surahNumber: 1, chronologicalOrder: 5, revelationType: "Meccan", approximatePeriod: "Early Meccan" },
  { surahNumber: 111, chronologicalOrder: 6, revelationType: "Meccan", approximatePeriod: "Early Meccan" },
  { surahNumber: 81, chronologicalOrder: 7, revelationType: "Meccan", approximatePeriod: "Early Meccan" },
  { surahNumber: 87, chronologicalOrder: 8, revelationType: "Meccan", approximatePeriod: "Early Meccan" },
  { surahNumber: 92, chronologicalOrder: 9, revelationType: "Meccan", approximatePeriod: "Early Meccan" },
  { surahNumber: 89, chronologicalOrder: 10, revelationType: "Meccan", approximatePeriod: "Early Meccan" },
  { surahNumber: 93, chronologicalOrder: 11, revelationType: "Meccan", approximatePeriod: "Early Meccan" },
  { surahNumber: 94, chronologicalOrder: 12, revelationType: "Meccan", approximatePeriod: "Early Meccan" },
  { surahNumber: 103, chronologicalOrder: 13, revelationType: "Meccan", approximatePeriod: "Early Meccan" },
  { surahNumber: 100, chronologicalOrder: 14, revelationType: "Meccan", approximatePeriod: "Early Meccan" },
  { surahNumber: 108, chronologicalOrder: 15, revelationType: "Meccan", approximatePeriod: "Early Meccan" },
  { surahNumber: 102, chronologicalOrder: 16, revelationType: "Meccan", approximatePeriod: "Early Meccan" },
  { surahNumber: 107, chronologicalOrder: 17, revelationType: "Meccan", approximatePeriod: "Early Meccan" },
  { surahNumber: 109, chronologicalOrder: 18, revelationType: "Meccan", approximatePeriod: "Early Meccan" },
  { surahNumber: 105, chronologicalOrder: 19, revelationType: "Meccan", approximatePeriod: "Early Meccan" },
  { surahNumber: 113, chronologicalOrder: 20, revelationType: "Meccan", approximatePeriod: "Early Meccan" },
  { surahNumber: 114, chronologicalOrder: 21, revelationType: "Meccan", approximatePeriod: "Early Meccan" },
  { surahNumber: 112, chronologicalOrder: 22, revelationType: "Meccan", approximatePeriod: "Early Meccan" },
  { surahNumber: 53, chronologicalOrder: 23, revelationType: "Meccan", approximatePeriod: "Early Meccan" },
  { surahNumber: 80, chronologicalOrder: 24, revelationType: "Meccan", approximatePeriod: "Early Meccan" },
  { surahNumber: 97, chronologicalOrder: 25, revelationType: "Meccan", approximatePeriod: "Early Meccan" },
  { surahNumber: 91, chronologicalOrder: 26, revelationType: "Meccan", approximatePeriod: "Early Meccan" },
  { surahNumber: 85, chronologicalOrder: 27, revelationType: "Meccan", approximatePeriod: "Early Meccan" },
  { surahNumber: 95, chronologicalOrder: 28, revelationType: "Meccan", approximatePeriod: "Early Meccan" },
  { surahNumber: 106, chronologicalOrder: 29, revelationType: "Meccan", approximatePeriod: "Early Meccan" },
  { surahNumber: 101, chronologicalOrder: 30, revelationType: "Meccan", approximatePeriod: "Early Meccan" },
  { surahNumber: 75, chronologicalOrder: 31, revelationType: "Meccan", approximatePeriod: "Early Meccan" },
  { surahNumber: 104, chronologicalOrder: 32, revelationType: "Meccan", approximatePeriod: "Early Meccan" },
  { surahNumber: 77, chronologicalOrder: 33, revelationType: "Meccan", approximatePeriod: "Middle Meccan" },
  { surahNumber: 50, chronologicalOrder: 34, revelationType: "Meccan", approximatePeriod: "Middle Meccan" },
  { surahNumber: 90, chronologicalOrder: 35, revelationType: "Meccan", approximatePeriod: "Middle Meccan" },
  { surahNumber: 86, chronologicalOrder: 36, revelationType: "Meccan", approximatePeriod: "Middle Meccan" },
  { surahNumber: 54, chronologicalOrder: 37, revelationType: "Meccan", approximatePeriod: "Middle Meccan" },
  { surahNumber: 38, chronologicalOrder: 38, revelationType: "Meccan", approximatePeriod: "Middle Meccan" },
  { surahNumber: 7, chronologicalOrder: 39, revelationType: "Meccan", approximatePeriod: "Middle Meccan" },
  { surahNumber: 72, chronologicalOrder: 40, revelationType: "Meccan", approximatePeriod: "Middle Meccan" },
  { surahNumber: 36, chronologicalOrder: 41, revelationType: "Meccan", approximatePeriod: "Middle Meccan" },
  { surahNumber: 25, chronologicalOrder: 42, revelationType: "Meccan", approximatePeriod: "Middle Meccan" },
  { surahNumber: 35, chronologicalOrder: 43, revelationType: "Meccan", approximatePeriod: "Middle Meccan" },
  { surahNumber: 19, chronologicalOrder: 44, revelationType: "Meccan", approximatePeriod: "Middle Meccan" },
  { surahNumber: 20, chronologicalOrder: 45, revelationType: "Meccan", approximatePeriod: "Middle Meccan" },
  { surahNumber: 56, chronologicalOrder: 46, revelationType: "Meccan", approximatePeriod: "Middle Meccan" },
  { surahNumber: 26, chronologicalOrder: 47, revelationType: "Meccan", approximatePeriod: "Middle Meccan" },
  { surahNumber: 27, chronologicalOrder: 48, revelationType: "Meccan", approximatePeriod: "Middle Meccan" },
  { surahNumber: 28, chronologicalOrder: 49, revelationType: "Meccan", approximatePeriod: "Middle Meccan" },
  { surahNumber: 17, chronologicalOrder: 50, revelationType: "Meccan", approximatePeriod: "Late Meccan" },
  { surahNumber: 10, chronologicalOrder: 51, revelationType: "Meccan", approximatePeriod: "Late Meccan" },
  { surahNumber: 11, chronologicalOrder: 52, revelationType: "Meccan", approximatePeriod: "Late Meccan" },
  { surahNumber: 12, chronologicalOrder: 53, revelationType: "Meccan", approximatePeriod: "Late Meccan" },
  { surahNumber: 15, chronologicalOrder: 54, revelationType: "Meccan", approximatePeriod: "Late Meccan" },
  { surahNumber: 6, chronologicalOrder: 55, revelationType: "Meccan", approximatePeriod: "Late Meccan" },
  { surahNumber: 37, chronologicalOrder: 56, revelationType: "Meccan", approximatePeriod: "Late Meccan" },
  { surahNumber: 31, chronologicalOrder: 57, revelationType: "Meccan", approximatePeriod: "Late Meccan" },
  { surahNumber: 34, chronologicalOrder: 58, revelationType: "Meccan", approximatePeriod: "Late Meccan" },
  { surahNumber: 39, chronologicalOrder: 59, revelationType: "Meccan", approximatePeriod: "Late Meccan" },
  { surahNumber: 40, chronologicalOrder: 60, revelationType: "Meccan", approximatePeriod: "Late Meccan" },
  { surahNumber: 41, chronologicalOrder: 61, revelationType: "Meccan", approximatePeriod: "Late Meccan" },
  { surahNumber: 42, chronologicalOrder: 62, revelationType: "Meccan", approximatePeriod: "Late Meccan" },
  { surahNumber: 43, chronologicalOrder: 63, revelationType: "Meccan", approximatePeriod: "Late Meccan" },
  { surahNumber: 44, chronologicalOrder: 64, revelationType: "Meccan", approximatePeriod: "Late Meccan" },
  { surahNumber: 45, chronologicalOrder: 65, revelationType: "Meccan", approximatePeriod: "Late Meccan" },
  { surahNumber: 46, chronologicalOrder: 66, revelationType: "Meccan", approximatePeriod: "Late Meccan" },
  { surahNumber: 51, chronologicalOrder: 67, revelationType: "Meccan", approximatePeriod: "Late Meccan" },
  { surahNumber: 88, chronologicalOrder: 68, revelationType: "Meccan", approximatePeriod: "Late Meccan" },
  { surahNumber: 18, chronologicalOrder: 69, revelationType: "Meccan", approximatePeriod: "Late Meccan" },
  { surahNumber: 16, chronologicalOrder: 70, revelationType: "Meccan", approximatePeriod: "Late Meccan" },
  { surahNumber: 71, chronologicalOrder: 71, revelationType: "Meccan", approximatePeriod: "Late Meccan" },
  { surahNumber: 14, chronologicalOrder: 72, revelationType: "Meccan", approximatePeriod: "Late Meccan" },
  { surahNumber: 21, chronologicalOrder: 73, revelationType: "Meccan", approximatePeriod: "Late Meccan" },
  { surahNumber: 23, chronologicalOrder: 74, revelationType: "Meccan", approximatePeriod: "Late Meccan" },
  { surahNumber: 32, chronologicalOrder: 75, revelationType: "Meccan", approximatePeriod: "Late Meccan" },
  { surahNumber: 52, chronologicalOrder: 76, revelationType: "Meccan", approximatePeriod: "Late Meccan" },
  { surahNumber: 67, chronologicalOrder: 77, revelationType: "Meccan", approximatePeriod: "Late Meccan" },
  { surahNumber: 69, chronologicalOrder: 78, revelationType: "Meccan", approximatePeriod: "Late Meccan" },
  { surahNumber: 70, chronologicalOrder: 79, revelationType: "Meccan", approximatePeriod: "Late Meccan" },
  { surahNumber: 78, chronologicalOrder: 80, revelationType: "Meccan", approximatePeriod: "Late Meccan" },
  { surahNumber: 79, chronologicalOrder: 81, revelationType: "Meccan", approximatePeriod: "Late Meccan" },
  { surahNumber: 82, chronologicalOrder: 82, revelationType: "Meccan", approximatePeriod: "Late Meccan" },
  { surahNumber: 84, chronologicalOrder: 83, revelationType: "Meccan", approximatePeriod: "Late Meccan" },
  { surahNumber: 30, chronologicalOrder: 84, revelationType: "Meccan", approximatePeriod: "Late Meccan" },
  { surahNumber: 29, chronologicalOrder: 85, revelationType: "Meccan", approximatePeriod: "Late Meccan" },
  { surahNumber: 83, chronologicalOrder: 86, revelationType: "Meccan", approximatePeriod: "Late Meccan" },

  // MEDINAN SURAHS (28 surahs - revealed after Hijra)
  { surahNumber: 2, chronologicalOrder: 87, revelationType: "Medinan", approximatePeriod: "Early Medinan" },
  { surahNumber: 8, chronologicalOrder: 88, revelationType: "Medinan", approximatePeriod: "Early Medinan" },
  { surahNumber: 3, chronologicalOrder: 89, revelationType: "Medinan", approximatePeriod: "Early Medinan" },
  { surahNumber: 33, chronologicalOrder: 90, revelationType: "Medinan", approximatePeriod: "Middle Medinan" },
  { surahNumber: 60, chronologicalOrder: 91, revelationType: "Medinan", approximatePeriod: "Middle Medinan" },
  { surahNumber: 4, chronologicalOrder: 92, revelationType: "Medinan", approximatePeriod: "Middle Medinan" },
  { surahNumber: 99, chronologicalOrder: 93, revelationType: "Medinan", approximatePeriod: "Middle Medinan" },
  { surahNumber: 57, chronologicalOrder: 94, revelationType: "Medinan", approximatePeriod: "Middle Medinan" },
  { surahNumber: 47, chronologicalOrder: 95, revelationType: "Medinan", approximatePeriod: "Middle Medinan" },
  { surahNumber: 13, chronologicalOrder: 96, revelationType: "Medinan", approximatePeriod: "Middle Medinan" },
  { surahNumber: 55, chronologicalOrder: 97, revelationType: "Medinan", approximatePeriod: "Middle Medinan" },
  { surahNumber: 76, chronologicalOrder: 98, revelationType: "Medinan", approximatePeriod: "Middle Medinan" },
  { surahNumber: 65, chronologicalOrder: 99, revelationType: "Medinan", approximatePeriod: "Middle Medinan" },
  { surahNumber: 98, chronologicalOrder: 100, revelationType: "Medinan", approximatePeriod: "Middle Medinan" },
  { surahNumber: 59, chronologicalOrder: 101, revelationType: "Medinan", approximatePeriod: "Middle Medinan" },
  { surahNumber: 24, chronologicalOrder: 102, revelationType: "Medinan", approximatePeriod: "Middle Medinan" },
  { surahNumber: 22, chronologicalOrder: 103, revelationType: "Medinan", approximatePeriod: "Middle Medinan" },
  { surahNumber: 63, chronologicalOrder: 104, revelationType: "Medinan", approximatePeriod: "Middle Medinan" },
  { surahNumber: 58, chronologicalOrder: 105, revelationType: "Medinan", approximatePeriod: "Middle Medinan" },
  { surahNumber: 49, chronologicalOrder: 106, revelationType: "Medinan", approximatePeriod: "Late Medinan" },
  { surahNumber: 66, chronologicalOrder: 107, revelationType: "Medinan", approximatePeriod: "Late Medinan" },
  { surahNumber: 64, chronologicalOrder: 108, revelationType: "Medinan", approximatePeriod: "Late Medinan" },
  { surahNumber: 61, chronologicalOrder: 109, revelationType: "Medinan", approximatePeriod: "Late Medinan" },
  { surahNumber: 62, chronologicalOrder: 110, revelationType: "Medinan", approximatePeriod: "Late Medinan" },
  { surahNumber: 48, chronologicalOrder: 111, revelationType: "Medinan", approximatePeriod: "Late Medinan" },
  { surahNumber: 5, chronologicalOrder: 112, revelationType: "Medinan", approximatePeriod: "Late Medinan" },
  { surahNumber: 9, chronologicalOrder: 113, revelationType: "Medinan", approximatePeriod: "Late Medinan" },
  { surahNumber: 110, chronologicalOrder: 114, revelationType: "Medinan", approximatePeriod: "Last revelation" },
];

// Helper function to get chronological order by surah number
export function getChronologicalOrder(surahNumber: number): number {
  const entry = CHRONOLOGICAL_ORDER.find((s) => s.surahNumber === surahNumber);
  return entry?.chronologicalOrder ?? surahNumber;
}

// Helper function to get surah by chronological order
export function getSurahByChronologicalOrder(order: number): ChronologicalSurahData | undefined {
  return CHRONOLOGICAL_ORDER.find((s) => s.chronologicalOrder === order);
}

export default CHRONOLOGICAL_ORDER;

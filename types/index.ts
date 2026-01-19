// ===== Core Quran Types =====

export interface Surah {
  id: number;
  name: string;
  nameTransliteration: string;
  nameTranslation: string;
  revelationType: "Meccan" | "Medinan";
  chronologicalOrder: number;
  versesCount: number;
  description?: string;
}

export interface Verse {
  id: string;
  surahId: number;
  verseNumber: number;
  verseKey: string;
  textArabic: string;
  textUthmani: string;
  textSimple: string;
  juzNumber: number;
  hizbNumber: number;
  pageNumber: number;
  translations?: Translation[];
  tafsirs?: Tafsir[];
  revelationContext?: RevelationContext;
}

export interface Translation {
  id: string;
  verseId: string;
  language: string;
  translator: string;
  text: string;
}

export interface Tafsir {
  id: string;
  verseId: string;
  source: string;
  language: string;
  text: string;
}

export interface RevelationContext {
  id: string;
  verseId: string;
  occasion: string;
  historicalDate?: string;
  location?: string;
  relatedEvents?: string;
  sources: string;
}

// ===== API Response Types =====

export interface SurahWithVerses extends Surah {
  verses: VerseWithDetails[];
}

export interface VerseWithDetails extends Verse {
  surah?: Surah;
  translations: Translation[];
  tafsirs: Tafsir[];
  revelationContext?: RevelationContext;
}

// ===== Chronological Order Data =====

export interface ChronologicalSurah {
  surahNumber: number;
  chronologicalOrder: number;
  revelationType: "Meccan" | "Medinan";
  approximatePeriod?: string;
}

// ===== UI State Types =====

export interface ReadingState {
  currentSurah: number;
  currentVerse: number;
  scrollProgress: number;
  viewMode: "chronological" | "standard";
}

export interface VerseCardProps {
  verse: VerseWithDetails;
  index: number;
  isActive?: boolean;
  showTranslation?: boolean;
  showTafsir?: boolean;
  showRevelationContext?: boolean;
  onExpand?: () => void;
}

// ===== Filter Types =====

export interface SurahFilters {
  revelationType?: "Meccan" | "Medinan" | "all";
  sortBy?: "chronological" | "standard";
  searchQuery?: string;
}

export interface VerseFilters {
  surahId?: number;
  language?: string;
  translator?: string;
  includeTafsir?: boolean;
  includeRevelationContext?: boolean;
}

// ===== External API Types (Quran.com API) =====

export interface QuranApiVerse {
  id: number;
  verse_key: string;
  verse_number: number;
  hizb_number: number;
  rub_el_hizb_number: number;
  ruku_number: number;
  manzil_number: number;
  sajdah_number: number | null;
  page_number: number;
  juz_number: number;
  text_uthmani: string;
  text_imlaei: string;
  text_imlaei_simple: string;
}

export interface QuranApiSurah {
  id: number;
  revelation_place: string;
  revelation_order: number;
  bismillah_pre: boolean;
  name_simple: string;
  name_complex: string;
  name_arabic: string;
  verses_count: number;
  pages: number[];
  translated_name: {
    language_name: string;
    name: string;
  };
}

export interface QuranApiTranslation {
  resource_id: number;
  text: string;
}

import { z } from "zod";

// === Surahs API Schemas ===

export const surahsQuerySchema = z.object({
  sortBy: z.enum(["standard", "chronological"]).default("standard"),
  revelationType: z
    .enum(["all", "Meccan", "Medinan"])
    .optional()
    .transform((val) => (val === "all" ? undefined : val)),
});

export type SurahsQueryParams = z.infer<typeof surahsQuerySchema>;

// === Verses API Schemas ===

export const versesQuerySchema = z.object({
  surahId: z.coerce.number().int().min(1).max(114).optional(),
  page: z.coerce.number().int().min(1).default(1),
  limit: z.coerce.number().int().min(1).max(100).default(20),
  translations: z
    .enum(["true", "false"])
    .optional()
    .transform((val) => val === "true"),
  tafsir: z
    .enum(["true", "false"])
    .optional()
    .transform((val) => val === "true"),
  context: z
    .enum(["true", "false"])
    .optional()
    .transform((val) => val === "true"),
});

export type VersesQueryParams = z.infer<typeof versesQuerySchema>;

// === Surah ID Param Schema ===

export const surahIdSchema = z.coerce.number().int().min(1).max(114);

// === Verse Key Schema ===

export const verseKeySchema = z
  .string()
  .regex(/^\d{1,3}:\d{1,3}$/, "Verse key must be in format 'surah:verse'");

// === Helper to format Zod errors ===

export function formatZodErrors(error: z.ZodError): string {
  return error.issues.map((e) => `${e.path.join(".")}: ${e.message}`).join(", ");
}

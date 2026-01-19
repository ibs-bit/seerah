"use client";

import { motion } from "framer-motion";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import type { Surah } from "@/types";

interface SurahHeaderProps {
  surah: Surah;
}

export function SurahHeader({ surah }: SurahHeaderProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className="w-full max-w-4xl mx-auto px-4 py-8"
    >
      <div className="text-center space-y-4">
        {/* Surah Name in Arabic */}
        <motion.h1
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="arabic-text text-4xl md:text-5xl font-semibold"
          dir="rtl"
          lang="ar"
        >
          {surah.name}
        </motion.h1>

        {/* Transliteration & Translation */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="space-y-1"
        >
          <h2 className="text-2xl font-medium text-foreground">
            {surah.nameTransliteration}
          </h2>
          <p className="text-lg text-muted-foreground">
            {surah.nameTranslation}
          </p>
        </motion.div>

        {/* Badges */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="flex items-center justify-center gap-3 flex-wrap"
        >
          <Badge
            variant={surah.revelationType === "Meccan" ? "meccan" : "medinan"}
          >
            {surah.revelationType}
          </Badge>
          <Badge variant="outline">{surah.versesCount} Verses</Badge>
          <Badge variant="outline">Surah {surah.id}</Badge>
          <Badge variant="secondary">
            Revelation Order: {surah.chronologicalOrder}
          </Badge>
        </motion.div>

        {/* Description */}
        {surah.description && (
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="text-sm text-muted-foreground max-w-2xl mx-auto mt-4"
          >
            {surah.description}
          </motion.p>
        )}

        {/* Bismillah */}
        {surah.id !== 9 && surah.id !== 1 && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.5 }}
            className="pt-6"
          >
            <p
              className="arabic-text text-2xl md:text-3xl text-primary"
              dir="rtl"
              lang="ar"
            >
              بِسْمِ اللَّهِ الرَّحْمَٰنِ الرَّحِيمِ
            </p>
          </motion.div>
        )}
      </div>

      <motion.div
        initial={{ scaleX: 0 }}
        animate={{ scaleX: 1 }}
        transition={{ duration: 0.8, delay: 0.6 }}
        className="mt-8"
      >
        <Separator className="bg-gradient-to-r from-transparent via-primary/50 to-transparent h-0.5" />
      </motion.div>
    </motion.div>
  );
}

export default SurahHeader;

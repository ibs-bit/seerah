"use client";

import { useRef } from "react";
import { motion, useInView, useScroll, useTransform } from "framer-motion";
import { ChevronDown, BookOpen, MapPin, Calendar } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { cn } from "@/lib/utils";
import type { VerseWithDetails } from "@/types";

interface VerseCardProps {
  verse: VerseWithDetails;
  index: number;
  showTranslation?: boolean;
  showTafsir?: boolean;
  showRevelationContext?: boolean;
  expandedSection?: "tafsir" | "context" | null;
  onToggleSection?: (section: "tafsir" | "context") => void;
}

export function VerseCard({
  verse,
  index,
  showTranslation = true,
  showTafsir = false,
  showRevelationContext = false,
  expandedSection,
  onToggleSection,
}: VerseCardProps) {
  const cardRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(cardRef, {
    once: false,
    margin: "-20% 0px -20% 0px",
  });

  const { scrollYProgress } = useScroll({
    target: cardRef,
    offset: ["start end", "end start"],
  });

  // Parallax effect for Arabic text
  const arabicY = useTransform(scrollYProgress, [0, 1], [30, -30]);
  const opacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0, 1, 1, 0]);
  const scale = useTransform(
    scrollYProgress,
    [0, 0.2, 0.8, 1],
    [0.95, 1, 1, 0.95]
  );

  // Get translation text
  const translation = verse.translations?.[0];
  const tafsir = verse.tafsirs?.[0];
  const context = verse.revelationContext;

  return (
    <motion.div
      ref={cardRef}
      style={{ opacity, scale }}
      className="w-full max-w-4xl mx-auto px-4 py-8"
    >
      <Card className="overflow-hidden backdrop-blur-sm bg-card/80 border-border/50 shadow-lg">
        {/* Verse Number Badge */}
        <div className="absolute top-4 left-4 z-10">
          <Badge
            variant="outline"
            className="bg-background/80 backdrop-blur-sm"
          >
            {verse.verseKey}
          </Badge>
        </div>

        {/* Surah Info Badge */}
        {verse.surah && (
          <div className="absolute top-4 right-4 z-10">
            <Badge
              variant={
                verse.surah.revelationType === "Meccan" ? "meccan" : "medinan"
              }
              className="backdrop-blur-sm"
            >
              {verse.surah.revelationType}
            </Badge>
          </div>
        )}

        <CardContent className="pt-12 pb-6">
          {/* Arabic Text with Parallax */}
          <motion.div style={{ y: arabicY }} className="mb-8">
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              transition={{ duration: 0.6, delay: index * 0.05 }}
              className="arabic-text verse-arabic text-center leading-[2.5] text-foreground"
              dir="rtl"
              lang="ar"
            >
              {verse.textUthmani || verse.textArabic}
            </motion.p>
          </motion.div>

          <Separator className="my-6 bg-border/50" />

          {/* Translation */}
          {showTranslation && translation && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              transition={{ duration: 0.6, delay: 0.2 + index * 0.05 }}
              className="mb-6"
            >
              <p className="text-lg text-foreground/90 leading-relaxed text-center italic">
                &ldquo;{translation.text}&rdquo;
              </p>
              <p className="text-sm text-muted-foreground text-center mt-2">
                — {translation.translator}
              </p>
            </motion.div>
          )}

          {/* Expandable Sections */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 1 } : { opacity: 0 }}
            transition={{ duration: 0.4, delay: 0.4 }}
            className="space-y-3 mt-6"
          >
            {/* Tafsir Toggle */}
            {tafsir && (
              <ExpandableSection
                title="Tafsir (Explanation)"
                icon={<BookOpen className="w-4 h-4" />}
                isExpanded={expandedSection === "tafsir"}
                onToggle={() => onToggleSection?.("tafsir")}
              >
                <div className="text-sm text-muted-foreground leading-relaxed">
                  <p>{tafsir.text}</p>
                  <p className="mt-2 text-xs">— {tafsir.source}</p>
                </div>
              </ExpandableSection>
            )}

            {/* Revelation Context Toggle */}
            {context && (
              <ExpandableSection
                title="Reason for Revelation"
                icon={<Calendar className="w-4 h-4" />}
                isExpanded={expandedSection === "context"}
                onToggle={() => onToggleSection?.("context")}
              >
                <div className="space-y-3 text-sm text-muted-foreground">
                  <p className="leading-relaxed">{context.occasion}</p>

                  {(context.historicalDate || context.location) && (
                    <div className="flex flex-wrap gap-4 text-xs">
                      {context.historicalDate && (
                        <span className="flex items-center gap-1">
                          <Calendar className="w-3 h-3" />
                          {context.historicalDate}
                        </span>
                      )}
                      {context.location && (
                        <span className="flex items-center gap-1">
                          <MapPin className="w-3 h-3" />
                          {context.location}
                        </span>
                      )}
                    </div>
                  )}

                  {context.relatedEvents && (
                    <div className="p-3 bg-muted/50 rounded-lg">
                      <p className="text-xs font-medium mb-1">
                        Historical Context:
                      </p>
                      <p className="text-xs">{context.relatedEvents}</p>
                    </div>
                  )}
                </div>
              </ExpandableSection>
            )}
          </motion.div>
        </CardContent>
      </Card>
    </motion.div>
  );
}

// Expandable Section Component
interface ExpandableSectionProps {
  title: string;
  icon: React.ReactNode;
  isExpanded: boolean;
  onToggle: () => void;
  children: React.ReactNode;
}

function ExpandableSection({
  title,
  icon,
  isExpanded,
  onToggle,
  children,
}: ExpandableSectionProps) {
  return (
    <div className="border border-border/50 rounded-lg overflow-hidden">
      <button
        onClick={onToggle}
        className="w-full flex items-center justify-between p-3 hover:bg-muted/50 transition-colors"
      >
        <span className="flex items-center gap-2 text-sm font-medium">
          {icon}
          {title}
        </span>
        <motion.span
          animate={{ rotate: isExpanded ? 180 : 0 }}
          transition={{ duration: 0.2 }}
        >
          <ChevronDown className="w-4 h-4" />
        </motion.span>
      </button>

      <motion.div
        initial={false}
        animate={{
          height: isExpanded ? "auto" : 0,
          opacity: isExpanded ? 1 : 0,
        }}
        transition={{ duration: 0.3, ease: "easeInOut" }}
        className="overflow-hidden"
      >
        <div className="p-4 pt-0">{children}</div>
      </motion.div>
    </div>
  );
}

export default VerseCard;

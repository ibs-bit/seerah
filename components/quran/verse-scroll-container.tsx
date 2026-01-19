"use client";

import { useState, useRef, useCallback, useEffect } from "react";
import { motion, useScroll, useSpring } from "framer-motion";
import { VerseCard } from "./verse-card";
import type { VerseWithDetails } from "@/types";

interface VerseScrollContainerProps {
  verses: VerseWithDetails[];
  onVerseInView?: (verseKey: string) => void;
}

export function VerseScrollContainer({
  verses,
  onVerseInView,
}: VerseScrollContainerProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [expandedSections, setExpandedSections] = useState<
    Record<string, "tafsir" | "context" | null>
  >({});

  // Scroll progress for the reading progress bar
  const { scrollYProgress } = useScroll({
    container: containerRef,
  });

  // Smooth spring animation for progress bar
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001,
  });

  const handleToggleSection = useCallback(
    (verseId: string, section: "tafsir" | "context") => {
      setExpandedSections((prev) => ({
        ...prev,
        [verseId]: prev[verseId] === section ? null : section,
      }));
    },
    []
  );

  return (
    <div className="relative h-screen">
      {/* Reading Progress Bar */}
      <motion.div
        className="reading-progress"
        style={{ scaleX, transformOrigin: "0%" }}
      />

      {/* Scroll Container */}
      <div
        ref={containerRef}
        className="h-full overflow-y-auto scroll-smooth"
        style={{ scrollBehavior: "smooth" }}
      >
        {/* Top Padding */}
        <div className="h-20" />

        {/* Verses */}
        <div className="space-y-4 pb-40">
          {verses.map((verse, index) => (
            <VerseCard
              key={verse.id}
              verse={verse}
              index={index}
              showTranslation={true}
              showTafsir={!!verse.tafsirs?.length}
              showRevelationContext={!!verse.revelationContext}
              expandedSection={expandedSections[verse.id]}
              onToggleSection={(section) =>
                handleToggleSection(verse.id, section)
              }
            />
          ))}
        </div>
      </div>
    </div>
  );
}

export default VerseScrollContainer;

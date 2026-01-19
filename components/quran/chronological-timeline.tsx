"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform, useInView } from "framer-motion";
import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import type { Surah } from "@/types";

interface ChronologicalTimelineProps {
  surahs: Surah[];
}

export function ChronologicalTimeline({ surahs }: ChronologicalTimelineProps) {
  const containerRef = useRef<HTMLDivElement>(null);

  // Sort by chronological order
  const sortedSurahs = [...surahs].sort(
    (a, b) => a.chronologicalOrder - b.chronologicalOrder
  );

  // Group by revelation type
  const meccanSurahs = sortedSurahs.filter((s) => s.revelationType === "Meccan");
  const medinanSurahs = sortedSurahs.filter((s) => s.revelationType === "Medinan");

  return (
    <div ref={containerRef} className="relative">
      {/* Timeline Line */}
      <div className="absolute left-1/2 transform -translate-x-1/2 w-1 h-full bg-gradient-to-b from-emerald via-primary to-gold rounded-full" />

      {/* Period Headers */}
      <div className="space-y-8">
        {/* Meccan Period */}
        <TimelinePeriod
          title="Meccan Period"
          subtitle="Before the Hijra (Migration)"
          description="Revelations focusing on monotheism, the Day of Judgment, and moral principles"
          surahs={meccanSurahs}
          type="Meccan"
        />

        {/* Transition Marker */}
        <motion.div
          initial={{ scale: 0 }}
          whileInView={{ scale: 1 }}
          viewport={{ once: true }}
          className="relative z-10 flex justify-center"
        >
          <div className="bg-gradient-to-r from-emerald to-gold p-4 rounded-full">
            <span className="text-white font-bold text-sm">HIJRA</span>
          </div>
        </motion.div>

        {/* Medinan Period */}
        <TimelinePeriod
          title="Medinan Period"
          subtitle="After the Hijra (Migration)"
          description="Revelations establishing laws, social guidelines, and community building"
          surahs={medinanSurahs}
          type="Medinan"
        />
      </div>
    </div>
  );
}

interface TimelinePeriodProps {
  title: string;
  subtitle: string;
  description: string;
  surahs: Surah[];
  type: "Meccan" | "Medinan";
}

function TimelinePeriod({
  title,
  subtitle,
  description,
  surahs,
  type,
}: TimelinePeriodProps) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0 }}
      animate={isInView ? { opacity: 1 } : { opacity: 0 }}
      transition={{ duration: 0.6 }}
      className="space-y-6"
    >
      {/* Period Header */}
      <div className="text-center relative z-10">
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={isInView ? { y: 0, opacity: 1 } : { y: 20, opacity: 0 }}
          transition={{ duration: 0.5 }}
          className={cn(
            "inline-block px-6 py-3 rounded-full",
            type === "Meccan"
              ? "bg-emerald/10 border-2 border-emerald"
              : "bg-gold/10 border-2 border-gold"
          )}
        >
          <h2 className="text-2xl font-bold">{title}</h2>
          <p className="text-sm text-muted-foreground">{subtitle}</p>
        </motion.div>
        <p className="mt-3 text-sm text-muted-foreground max-w-md mx-auto">
          {description}
        </p>
      </div>

      {/* Surahs Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 px-4">
        {surahs.map((surah, index) => (
          <TimelineSurahCard
            key={surah.id}
            surah={surah}
            index={index}
            type={type}
          />
        ))}
      </div>
    </motion.div>
  );
}

interface TimelineSurahCardProps {
  surah: Surah;
  index: number;
  type: "Meccan" | "Medinan";
}

function TimelineSurahCard({ surah, index, type }: TimelineSurahCardProps) {
  const cardRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(cardRef, { once: true, margin: "-50px" });

  return (
    <motion.div
      ref={cardRef}
      initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
      animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
      transition={{ duration: 0.5, delay: index * 0.03 }}
    >
      <Link href={`/surah/${surah.id}`}>
        <Card
          className={cn(
            "group cursor-pointer transition-all duration-300 hover:shadow-lg hover:scale-[1.02]",
            "border-l-4",
            type === "Meccan" ? "border-l-emerald" : "border-l-gold"
          )}
        >
          <CardContent className="p-4">
            <div className="flex items-start justify-between">
              <div className="flex-1">
                {/* Chronological Order Badge */}
                <Badge
                  variant="outline"
                  className="mb-2 text-xs"
                >
                  #{surah.chronologicalOrder}
                </Badge>

                {/* Surah Name */}
                <h3
                  className="arabic-text text-xl mb-1"
                  dir="rtl"
                  lang="ar"
                >
                  {surah.name}
                </h3>
                <p className="font-medium text-sm">
                  {surah.nameTransliteration}
                </p>
                <p className="text-xs text-muted-foreground">
                  {surah.nameTranslation}
                </p>
              </div>

              {/* Surah Number */}
              <div
                className={cn(
                  "w-10 h-10 rounded-full flex items-center justify-center text-sm font-bold",
                  type === "Meccan"
                    ? "bg-emerald/10 text-emerald"
                    : "bg-gold/10 text-gold"
                )}
              >
                {surah.id}
              </div>
            </div>

            {/* Verses Count */}
            <div className="mt-3 flex items-center gap-2 text-xs text-muted-foreground">
              <span>{surah.versesCount} verses</span>
              <span>•</span>
              <span>Surah {surah.id}</span>
            </div>
          </CardContent>
        </Card>
      </Link>
    </motion.div>
  );
}

export default ChronologicalTimeline;

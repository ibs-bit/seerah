"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import { Search, Filter, ArrowUpDown } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import type { Surah } from "@/types";

export default function SurahListPage() {
  const [surahs, setSurahs] = useState<Surah[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [sortBy, setSortBy] = useState<"standard" | "chronological">(
    "standard"
  );
  const [filterType, setFilterType] = useState<"all" | "Meccan" | "Medinan">(
    "all"
  );

  // Fetch surahs
  useEffect(() => {
    async function fetchSurahs() {
      try {
        const res = await fetch(`/api/surahs?sortBy=${sortBy}`);
        const data = await res.json();
        if (data.success) {
          setSurahs(data.data);
        }
      } catch (error) {
        console.error("Error fetching surahs:", error);
      } finally {
        setLoading(false);
      }
    }
    fetchSurahs();
  }, [sortBy]);

  // Filter surahs
  const filteredSurahs = surahs.filter((surah) => {
    const matchesSearch =
      surah.name.includes(searchQuery) ||
      surah.nameTransliteration
        .toLowerCase()
        .includes(searchQuery.toLowerCase()) ||
      surah.nameTranslation.toLowerCase().includes(searchQuery.toLowerCase()) ||
      surah.id.toString() === searchQuery;

    const matchesType =
      filterType === "all" || surah.revelationType === filterType;

    return matchesSearch && matchesType;
  });

  // Sort surahs
  const sortedSurahs = [...filteredSurahs].sort((a, b) => {
    if (sortBy === "chronological") {
      return a.chronologicalOrder - b.chronologicalOrder;
    }
    return a.id - b.id;
  });

  return (
    <div className="min-h-screen py-8">
      <div className="container mx-auto px-4">
        {/* Page Header */}
        <div className="text-center mb-8">
          <h1 className="text-3xl md:text-4xl font-bold mb-4">All Surahs</h1>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Browse all 114 surahs of the Holy Quran. Click on any surah to read
            its verses with translations and explanations.
          </p>
        </div>

        {/* Filters */}
        <div className="flex flex-col md:flex-row gap-4 mb-8 max-w-4xl mx-auto">
          {/* Search */}
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <input
              type="text"
              placeholder="Search by name, number, or translation..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2 bg-background border border-input rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-ring"
            />
          </div>

          {/* Filter by Type */}
          <div className="flex gap-2">
            <Button
              variant={filterType === "all" ? "default" : "outline"}
              size="sm"
              onClick={() => setFilterType("all")}
            >
              All
            </Button>
            <Button
              variant={filterType === "Meccan" ? "default" : "outline"}
              size="sm"
              onClick={() => setFilterType("Meccan")}
              className={
                filterType === "Meccan" ? "bg-emerald hover:bg-emerald/90" : ""
              }
            >
              Meccan
            </Button>
            <Button
              variant={filterType === "Medinan" ? "default" : "outline"}
              size="sm"
              onClick={() => setFilterType("Medinan")}
              className={
                filterType === "Medinan"
                  ? "bg-gold hover:bg-gold/90 text-gold-foreground"
                  : ""
              }
            >
              Medinan
            </Button>
          </div>

          {/* Sort */}
          <Button
            variant="outline"
            size="sm"
            onClick={() =>
              setSortBy(sortBy === "standard" ? "chronological" : "standard")
            }
            className="gap-2"
          >
            <ArrowUpDown className="w-4 h-4" />
            {sortBy === "standard" ? "Standard" : "Chronological"}
          </Button>
        </div>

        {/* Surah Grid */}
        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
            {[...Array(12)].map((_, i) => (
              <Card key={i} className="animate-pulse">
                <CardContent className="p-4">
                  <div className="h-6 bg-muted rounded mb-2" />
                  <div className="h-4 bg-muted rounded w-2/3" />
                </CardContent>
              </Card>
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
            {sortedSurahs.map((surah, index) => (
              <motion.div
                key={surah.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: index * 0.02 }}
              >
                <Link href={`/surah/${surah.id}`}>
                  <Card className="group cursor-pointer hover:shadow-lg transition-all duration-300 hover:scale-[1.02] h-full">
                    <CardContent className="p-4">
                      <div className="flex items-start gap-3">
                        {/* Number */}
                        <div
                          className={`w-10 h-10 rounded-full flex items-center justify-center text-sm font-bold shrink-0 ${
                            surah.revelationType === "Meccan"
                              ? "bg-emerald/10 text-emerald"
                              : "bg-gold/10 text-gold"
                          }`}
                        >
                          {sortBy === "chronological"
                            ? surah.chronologicalOrder
                            : surah.id}
                        </div>

                        {/* Info */}
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center justify-between gap-2 mb-1">
                            <h3
                              className="arabic-text text-lg truncate"
                              dir="rtl"
                              lang="ar"
                            >
                              {surah.name}
                            </h3>
                            <Badge
                              variant={
                                surah.revelationType === "Meccan"
                                  ? "meccan"
                                  : "medinan"
                              }
                              className="text-[10px] shrink-0"
                            >
                              {surah.revelationType.charAt(0)}
                            </Badge>
                          </div>
                          <p className="font-medium text-sm">
                            {surah.nameTransliteration}
                          </p>
                          <p className="text-xs text-muted-foreground">
                            {surah.nameTranslation}
                          </p>
                          <p className="text-xs text-muted-foreground mt-1">
                            {surah.versesCount} verses
                            {sortBy === "standard" &&
                              ` • Revelation #${surah.chronologicalOrder}`}
                          </p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </Link>
              </motion.div>
            ))}
          </div>
        )}

        {/* No Results */}
        {!loading && sortedSurahs.length === 0 && (
          <div className="text-center py-12">
            <p className="text-muted-foreground">
              No surahs found matching your search.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}

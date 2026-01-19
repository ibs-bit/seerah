"use client";

import { useState, useMemo } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion } from "framer-motion";
import { Search, ChevronRight } from "lucide-react";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import type { Surah } from "@/types";

interface SidebarProps {
  surahs: Surah[];
  sortBy?: "standard" | "chronological";
}

export function Sidebar({ surahs, sortBy = "standard" }: SidebarProps) {
  const pathname = usePathname();
  const [searchQuery, setSearchQuery] = useState("");

  // Sort surahs
  const sortedSurahs = useMemo(() => {
    const filtered = surahs.filter(
      (surah) =>
        surah.name.includes(searchQuery) ||
        surah.nameTransliteration.toLowerCase().includes(searchQuery.toLowerCase()) ||
        surah.nameTranslation.toLowerCase().includes(searchQuery.toLowerCase()) ||
        surah.id.toString() === searchQuery
    );

    if (sortBy === "chronological") {
      return [...filtered].sort((a, b) => a.chronologicalOrder - b.chronologicalOrder);
    }
    return filtered;
  }, [surahs, sortBy, searchQuery]);

  return (
    <aside className="w-72 border-r border-border/50 bg-card/50 backdrop-blur-sm h-screen sticky top-16 hidden lg:block">
      {/* Search */}
      <div className="p-4 border-b border-border/50">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <input
            type="text"
            placeholder="Search surahs..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-2 bg-background border border-input rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-ring"
          />
        </div>
      </div>

      {/* Surah List */}
      <ScrollArea className="h-[calc(100vh-8rem)]">
        <div className="p-2">
          {sortedSurahs.map((surah, index) => {
            const isActive = pathname === `/surah/${surah.id}`;

            return (
              <motion.div
                key={surah.id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.2, delay: index * 0.01 }}
              >
                <Link href={`/surah/${surah.id}`}>
                  <div
                    className={cn(
                      "flex items-center gap-3 p-3 rounded-lg transition-all duration-200",
                      "hover:bg-muted/50",
                      isActive && "bg-primary/10 border-l-2 border-primary"
                    )}
                  >
                    {/* Number */}
                    <span
                      className={cn(
                        "w-8 h-8 rounded-full flex items-center justify-center text-xs font-medium",
                        isActive
                          ? "bg-primary text-primary-foreground"
                          : "bg-muted text-muted-foreground"
                      )}
                    >
                      {sortBy === "chronological" ? surah.chronologicalOrder : surah.id}
                    </span>

                    {/* Info */}
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2">
                        <span
                          className="arabic-text text-base truncate"
                          dir="rtl"
                          lang="ar"
                        >
                          {surah.name}
                        </span>
                      </div>
                      <p className="text-xs text-muted-foreground truncate">
                        {surah.nameTransliteration}
                      </p>
                    </div>

                    {/* Badge & Arrow */}
                    <div className="flex items-center gap-1">
                      <Badge
                        variant={surah.revelationType === "Meccan" ? "meccan" : "medinan"}
                        className="text-[10px] px-1.5 py-0"
                      >
                        {surah.revelationType.charAt(0)}
                      </Badge>
                      <ChevronRight
                        className={cn(
                          "w-4 h-4 text-muted-foreground transition-transform",
                          isActive && "text-primary"
                        )}
                      />
                    </div>
                  </div>
                </Link>
              </motion.div>
            );
          })}
        </div>
      </ScrollArea>
    </aside>
  );
}

export default Sidebar;

"use client";

import { useState, useEffect, useCallback } from "react";

interface ReadingProgressState {
  surahId: number;
  verseNumber: number;
  scrollDepth: number;
}

const STORAGE_KEY = "quran-reading-progress";

export function useReadingProgress() {
  const [progress, setProgress] = useState<ReadingProgressState | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  // Load progress from localStorage on mount
  useEffect(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored) {
        setProgress(JSON.parse(stored));
      }
    } catch (error) {
      console.error("Error loading reading progress:", error);
    } finally {
      setIsLoading(false);
    }
  }, []);

  // Save progress to localStorage
  const saveProgress = useCallback(
    (surahId: number, verseNumber: number, scrollDepth: number = 0) => {
      const newProgress: ReadingProgressState = {
        surahId,
        verseNumber,
        scrollDepth,
      };

      try {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(newProgress));
        setProgress(newProgress);
      } catch (error) {
        console.error("Error saving reading progress:", error);
      }
    },
    []
  );

  // Clear progress
  const clearProgress = useCallback(() => {
    try {
      localStorage.removeItem(STORAGE_KEY);
      setProgress(null);
    } catch (error) {
      console.error("Error clearing reading progress:", error);
    }
  }, []);

  return {
    progress,
    isLoading,
    saveProgress,
    clearProgress,
  };
}

export default useReadingProgress;

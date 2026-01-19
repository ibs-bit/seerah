"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { Home, BookOpen } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center px-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="text-center max-w-md"
      >
        <p
          className="arabic-text text-4xl mb-6 text-primary"
          dir="rtl"
          lang="ar"
        >
          ٤٠٤
        </p>
        <h1 className="text-3xl font-bold mb-4">Page Not Found</h1>
        <p className="text-muted-foreground mb-8">
          The page you&apos;re looking for doesn&apos;t exist or has been moved.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link href="/">
            <Button variant="default" className="gap-2">
              <Home className="w-4 h-4" />
              Go Home
            </Button>
          </Link>
          <Link href="/surah">
            <Button variant="outline" className="gap-2">
              <BookOpen className="w-4 h-4" />
              Browse Surahs
            </Button>
          </Link>
        </div>
      </motion.div>
    </div>
  );
}

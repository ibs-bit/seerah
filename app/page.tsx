"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { BookOpen, Clock, Sparkles, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

export default function HomePage() {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative overflow-hidden py-20 md:py-32">
        {/* Background Pattern */}
        <div className="absolute inset-0 -z-10">
          <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-gold/5" />
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-primary/5 rounded-full blur-3xl" />
        </div>

        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center max-w-4xl mx-auto"
          >
            {/* Arabic Bismillah */}
            <motion.p
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="arabic-text text-3xl md:text-4xl text-primary mb-6"
              dir="rtl"
              lang="ar"
            >
              بِسْمِ اللَّهِ الرَّحْمَٰنِ الرَّحِيمِ
            </motion.p>

            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="text-4xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-foreground to-foreground/70 bg-clip-text text-transparent"
            >
              Experience the Quran as it was
              <span className="text-primary"> Revealed</span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="text-lg md:text-xl text-muted-foreground mb-8 max-w-2xl mx-auto"
            >
              Explore the Holy Quran in chronological order of revelation.
              Understand the context, reasons, and wisdom behind each verse with
              beautiful scroll animations and detailed explanations.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.5 }}
              className="flex flex-col sm:flex-row items-center justify-center gap-4"
            >
              <Link href="/chronological">
                <Button size="lg" className="gap-2">
                  <Clock className="w-5 h-5" />
                  Start Chronological Journey
                  <ArrowRight className="w-4 h-4" />
                </Button>
              </Link>
              <Link href="/surah">
                <Button variant="outline" size="lg" className="gap-2">
                  <BookOpen className="w-5 h-5" />
                  Browse All Surahs
                </Button>
              </Link>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-muted/30">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl font-bold mb-4">
              A New Way to Experience the Quran
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Combining traditional scholarship with modern technology to bring
              you closer to the divine message.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-6 max-w-5xl mx-auto">
            {features.map((feature, index) => (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <Card className="h-full hover:shadow-lg transition-shadow">
                  <CardContent className="p-6 text-center">
                    <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-4">
                      <feature.icon className="w-6 h-6 text-primary" />
                    </div>
                    <h3 className="font-semibold text-lg mb-2">
                      {feature.title}
                    </h3>
                    <p className="text-sm text-muted-foreground">
                      {feature.description}
                    </p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Timeline Preview */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <Badge variant="secondary" className="mb-4">
              Chronological Order
            </Badge>
            <h2 className="text-3xl font-bold mb-4">
              From the First Revelation to the Last
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              The Quran was revealed over 23 years. Understanding the order
              helps appreciate the progressive nature of Islamic guidance.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            {/* Meccan Period */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
            >
              <Card className="border-l-4 border-l-emerald">
                <CardContent className="p-6">
                  <Badge variant="meccan" className="mb-3">
                    Meccan Period
                  </Badge>
                  <h3 className="font-semibold text-xl mb-2">
                    86 Surahs • Before Hijra
                  </h3>
                  <p className="text-sm text-muted-foreground mb-4">
                    Focus on monotheism (Tawhid), the Day of Judgment, moral
                    principles, and stories of past prophets.
                  </p>
                  <div className="flex flex-wrap gap-2">
                    <Badge variant="outline">Surah Al-Alaq (First)</Badge>
                    <Badge variant="outline">Surah Al-Fatihah</Badge>
                    <Badge variant="outline">+ 84 more</Badge>
                  </div>
                </CardContent>
              </Card>
            </motion.div>

            {/* Medinan Period */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.1 }}
            >
              <Card className="border-l-4 border-l-gold">
                <CardContent className="p-6">
                  <Badge variant="medinan" className="mb-3">
                    Medinan Period
                  </Badge>
                  <h3 className="font-semibold text-xl mb-2">
                    28 Surahs • After Hijra
                  </h3>
                  <p className="text-sm text-muted-foreground mb-4">
                    Focus on laws, social guidelines, community building, and
                    relations with other communities.
                  </p>
                  <div className="flex flex-wrap gap-2">
                    <Badge variant="outline">Surah Al-Baqarah</Badge>
                    <Badge variant="outline">Surah An-Nasr (Last)</Badge>
                    <Badge variant="outline">+ 26 more</Badge>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mt-10"
          >
            <Link href="/chronological">
              <Button variant="outline" size="lg" className="gap-2">
                Explore the Full Timeline
                <ArrowRight className="w-4 h-4" />
              </Button>
            </Link>
          </motion.div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-primary/5">
        <div className="container mx-auto px-4 text-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="max-w-2xl mx-auto"
          >
            <p
              className="arabic-text text-2xl md:text-3xl mb-6 text-primary"
              dir="rtl"
              lang="ar"
            >
              اقْرَأْ بِاسْمِ رَبِّكَ الَّذِي خَلَقَ
            </p>
            <p className="text-lg text-muted-foreground mb-2">
              &ldquo;Read in the name of your Lord who created.&rdquo;
            </p>
            <p className="text-sm text-muted-foreground mb-8">
              — Surah Al-Alaq (96:1), The First Revelation
            </p>
            <Link href="/surah/96">
              <Button size="lg" className="gap-2">
                <Sparkles className="w-5 h-5" />
                Begin with the First Revelation
              </Button>
            </Link>
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-8 border-t">
        <div className="container mx-auto px-4 text-center text-sm text-muted-foreground">
          <p>
            Built with reverence for the Holy Quran. May this project be a
            source of guidance and understanding.
          </p>
          <p className="mt-2">
            Data sourced from authentic Islamic scholarship.
          </p>
        </div>
      </footer>
    </div>
  );
}

const features = [
  {
    icon: Clock,
    title: "Chronological Order",
    description:
      "Experience the Quran in the order it was revealed, understanding the historical context of each surah.",
  },
  {
    icon: BookOpen,
    title: "Reasons for Revelation",
    description:
      "Learn the circumstances and events that led to each revelation (Asbab al-Nuzul).",
  },
  {
    icon: Sparkles,
    title: "Beautiful Animations",
    description:
      "Immersive scroll animations that bring each verse to life as you read through the divine message.",
  },
];

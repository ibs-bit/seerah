# Quran Chronological Revelation Website - Project Documentation

**Date:** December 21, 2025  
**Project:** Quran Chronological Revelation Website (Seerah)  
**Developer:** AI Assistant (Claude)

---

## 📋 Initial Request

The user requested a Quran website with the following requirements:

1. **Translation and explanation** of verses
2. **Chronological revelation order** - display verses in the order they were revealed, not the standard Mushaf order
3. **Beautiful scroll animations** - vertical scroll animations when viewing verses
4. **Reason for revelation** - show Asbab al-Nuzul (circumstances of revelation) in the explanation view
5. **Full-stack implementation** - complete working development program

---

## 🎯 Project Goals

| Goal              | Description                                               |
| ----------------- | --------------------------------------------------------- |
| **Educational**   | Help users understand the Quran in its historical context |
| **Immersive**     | Create a beautiful, animated reading experience           |
| **Comprehensive** | Include translations, tafsir, and revelation context      |
| **Accessible**    | Work on all devices with responsive design                |

---

## 🛠️ Technology Stack Chosen

### Frontend

| Technology    | Version | Purpose                              |
| ------------- | ------- | ------------------------------------ |
| Next.js       | 15/16   | React framework with App Router, SSR |
| TypeScript    | 5.x     | Type safety                          |
| Tailwind CSS  | 4.x     | Utility-first styling                |
| shadcn/ui     | Latest  | Pre-built UI components              |
| Framer Motion | 12.x    | Scroll animations & transitions      |

### Backend

| Technology         | Version | Purpose                    |
| ------------------ | ------- | -------------------------- |
| Next.js API Routes | -       | REST API endpoints         |
| Prisma             | 5.x     | Database ORM               |
| SQLite             | -       | Local development database |
| Zod                | 4.x     | Schema validation          |

### Rationale for Choices

- **Next.js 15+**: Latest App Router for optimal performance and SEO
- **Framer Motion**: Best-in-class animation library for React
- **Prisma + SQLite**: Simple setup for development, easy migration to PostgreSQL for production
- **shadcn/ui**: Accessible, customizable components that match the Islamic aesthetic

---

## 📁 Project Structure

```
seerah/
├── app/                          # Next.js App Router
│   ├── layout.tsx               # Root layout with Arabic fonts
│   ├── page.tsx                 # Homepage
│   ├── not-found.tsx            # 404 page
│   ├── chronological/
│   │   └── page.tsx             # Chronological timeline view
│   ├── surah/
│   │   ├── page.tsx             # All surahs grid
│   │   └── [id]/
│   │       └── page.tsx         # Individual surah with animated verses
│   └── api/
│       ├── surahs/
│       │   ├── route.ts         # GET all surahs
│       │   └── [id]/
│       │       └── route.ts     # GET single surah with verses
│       └── verses/
│           ├── route.ts         # GET verses with pagination
│           └── [verseKey]/
│               └── route.ts     # GET single verse
│
├── components/
│   ├── quran/
│   │   ├── verse-card.tsx           # ✨ Animated verse display
│   │   ├── verse-scroll-container.tsx # Scroll container with progress
│   │   ├── surah-header.tsx         # Surah info header
│   │   └── chronological-timeline.tsx # Timeline component
│   ├── layout/
│   │   ├── header.tsx              # Navigation header
│   │   └── sidebar.tsx             # Surah navigation sidebar
│   └── ui/                         # shadcn components
│       ├── button.tsx
│       ├── card.tsx
│       ├── badge.tsx
│       ├── scroll-area.tsx
│       ├── separator.tsx
│       └── skeleton.tsx
│
├── data/
│   ├── chronological-order.ts     # All 114 surahs with revelation order
│   └── surahs.ts                  # Complete surah metadata
│
├── hooks/
│   ├── use-reading-progress.ts    # Track reading progress
│   └── use-scroll-animation.ts    # Custom scroll animation hooks
│
├── lib/
│   ├── db.ts                      # Prisma client singleton
│   └── utils.ts                   # Utility functions (cn)
│
├── prisma/
│   ├── schema.prisma              # Database schema
│   ├── seed.ts                    # Database seeding script
│   └── dev.db                     # SQLite database
│
├── types/
│   └── index.ts                   # TypeScript type definitions
│
├── public/
│   └── fonts/                     # Arabic fonts (loaded via Google)
│
└── docs/
    └── PROJECT_DOCUMENTATION.md   # This file
```

---

## 🗄️ Database Schema

### Entity Relationship Diagram

```
┌─────────────┐       ┌─────────────┐
│   Surah     │──1:N──│   Verse     │
└─────────────┘       └─────────────┘
                            │
              ┌─────────────┼─────────────┐
              │             │             │
         ┌────▼────┐  ┌─────▼─────┐  ┌────▼────────────┐
         │Translation│  │  Tafsir  │  │RevelationContext│
         └──────────┘  └──────────┘  └─────────────────┘
```

### Models

#### Surah (114 records)

| Field               | Type    | Description                  |
| ------------------- | ------- | ---------------------------- |
| id                  | Int     | Primary key (1-114)          |
| name                | String  | Arabic name (الفاتحة)        |
| nameTransliteration | String  | Transliteration (Al-Fatihah) |
| nameTranslation     | String  | English name (The Opening)   |
| revelationType      | String  | "Meccan" or "Medinan"        |
| chronologicalOrder  | Int     | Order of revelation (1-114)  |
| versesCount         | Int     | Number of verses             |
| description         | String? | Brief description            |

#### Verse

| Field       | Type   | Description                 |
| ----------- | ------ | --------------------------- |
| id          | String | CUID                        |
| surahId     | Int    | Foreign key to Surah        |
| verseNumber | Int    | Verse number within surah   |
| verseKey    | String | Unique key ("1:1", "2:255") |
| textArabic  | String | Standard Arabic text        |
| textUthmani | String | Uthmani script              |
| textSimple  | String | Simplified Arabic           |
| juzNumber   | Int    | Juz (1-30)                  |
| hizbNumber  | Int    | Hizb (1-60)                 |
| pageNumber  | Int    | Page in standard Mushaf     |

#### Translation

| Field      | Type   | Description                |
| ---------- | ------ | -------------------------- |
| language   | String | Language code ("en", "ur") |
| translator | String | Translator name            |
| text       | String | Translation text           |

#### Tafsir

| Field    | Type   | Description              |
| -------- | ------ | ------------------------ |
| source   | String | Source name (Ibn Kathir) |
| language | String | Language code            |
| text     | String | Commentary text          |

#### RevelationContext (Asbab al-Nuzul)

| Field          | Type    | Description                   |
| -------------- | ------- | ----------------------------- |
| occasion       | String  | What triggered the revelation |
| historicalDate | String? | Approximate date              |
| location       | String? | Where it was revealed         |
| relatedEvents  | String? | Historical context            |
| sources        | String  | Hadith references             |

---

## 🎨 UI/UX Design

### Color Palette

| Color           | Variable       | Usage                      |
| --------------- | -------------- | -------------------------- |
| Primary (Green) | `--primary`    | Main actions, Meccan badge |
| Gold            | `--gold`       | Medinan badge, accents     |
| Emerald         | `--emerald`    | Meccan period highlighting |
| Background      | `--background` | Page background            |
| Foreground      | `--foreground` | Text                       |
| Muted           | `--muted`      | Secondary backgrounds      |

### Typography

| Font           | Usage               |
| -------------- | ------------------- |
| **Amiri**      | Arabic Quranic text |
| **Geist Sans** | UI text (Latin)     |
| **Geist Mono** | Code, verse keys    |

### Animation Specifications

#### Verse Card Animations

```typescript
// Scroll-triggered animations using Framer Motion
const scrollYProgress = useScroll({ target: ref });

// Opacity: fade in at 20%, fade out at 80%
const opacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0, 1, 1, 0]);

// Scale: slightly smaller at edges
const scale = useTransform(
  scrollYProgress,
  [0, 0.2, 0.8, 1],
  [0.95, 1, 1, 0.95]
);

// Parallax: Arabic text moves slower than container
const arabicY = useTransform(scrollYProgress, [0, 1], [30, -30]);
```

#### Timeline Animations

- Cards slide in from alternating sides
- Staggered delay based on index
- Hover: scale up 1.02x with shadow

---

## 📊 Chronological Revelation Data

### Overview

- **Total Surahs:** 114
- **Meccan Surahs:** 86 (revealed before Hijra)
- **Medinan Surahs:** 28 (revealed after Hijra)
- **Revelation Period:** ~23 years (610-632 CE)

### Key Surahs by Revelation Order

| Order | Surah # | Name       | Period  | Significance        |
| ----- | ------- | ---------- | ------- | ------------------- |
| 1     | 96      | Al-Alaq    | Meccan  | First revelation    |
| 2     | 68      | Al-Qalam   | Meccan  | Early revelation    |
| 5     | 1       | Al-Fatihah | Meccan  | Opening chapter     |
| 87    | 2       | Al-Baqarah | Medinan | Longest surah       |
| 114   | 110     | An-Nasr    | Medinan | Last complete surah |

### Periods

| Period        | Surahs | Themes                      |
| ------------- | ------ | --------------------------- |
| Early Meccan  | 1-32   | Monotheism, Day of Judgment |
| Middle Meccan | 33-50  | Prophet stories, morality   |
| Late Meccan   | 51-86  | Detailed guidance           |
| Early Medinan | 87-96  | Laws, community building    |
| Late Medinan  | 97-114 | Final guidance              |

---

## 🔌 API Endpoints

### Surahs

```
GET /api/surahs
  Query params:
    - sortBy: "standard" | "chronological"
    - revelationType: "Meccan" | "Medinan" | "all"

  Response: { success: true, data: Surah[], count: number }
```

```
GET /api/surahs/[id]
  Response: { success: true, data: SurahWithVerses }
```

### Verses

```
GET /api/verses
  Query params:
    - surahId: number
    - page: number (default: 1)
    - limit: number (default: 20, max: 100)
    - translations: boolean
    - tafsir: boolean
    - context: boolean

  Response: { success: true, data: Verse[], pagination: {...} }
```

```
GET /api/verses/[verseKey]
  Example: /api/verses/2:255
  Response: { success: true, data: VerseWithDetails }
```

---

## 🚀 Setup & Running

### Prerequisites

- Node.js 18+
- npm or pnpm

### Installation

```bash
# Install dependencies
npm install

# Generate Prisma client
npm run db:generate

# Create database and apply schema
npm run db:push

# Seed the database
npm run db:seed

# Start development server
npm run dev
```

### Available Scripts

| Script                | Description                  |
| --------------------- | ---------------------------- |
| `npm run dev`         | Start dev server (Turbopack) |
| `npm run build`       | Build for production         |
| `npm run start`       | Start production server      |
| `npm run lint`        | Run ESLint                   |
| `npm run db:generate` | Generate Prisma client       |
| `npm run db:push`     | Push schema to database      |
| `npm run db:seed`     | Seed sample data             |
| `npm run db:reset`    | Reset and reseed database    |
| `npm run db:studio`   | Open Prisma Studio           |

---

## 🔒 Security Measures

| Measure          | Implementation                    |
| ---------------- | --------------------------------- |
| Input Validation | Zod schemas on API routes         |
| SQL Injection    | Prevented via Prisma ORM          |
| XSS              | React's default escaping          |
| Dependency Audit | Snyk SCA scan (0 vulnerabilities) |

---

## 📈 Future Enhancements

### Phase 2 (Planned)

- [ ] Full Quran data import from Quran.com API
- [ ] Audio recitation with synchronized highlighting
- [ ] User accounts and reading progress sync
- [ ] Multiple translation toggle
- [ ] Word-by-word analysis

### Phase 3 (Planned)

- [ ] Search functionality (verses, topics)
- [ ] Bookmarks and notes
- [ ] Share verses (social media, images)
- [ ] PWA for offline reading
- [ ] Mobile apps (React Native)

---

## 📚 Data Sources

| Source              | Content                   | License       |
| ------------------- | ------------------------- | ------------- |
| Quran.com API       | Arabic text, translations | Open          |
| Islamic scholarship | Chronological order       | Public domain |
| Classical tafsir    | Ibn Kathir, Al-Jalalayn   | Public domain |

---

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Ensure Quranic accuracy
4. Follow code style (ESLint/Prettier)
5. Submit pull request

---

## 📄 License

This project is open source. The Holy Quran is for all of humanity.

---

**بِسْمِ اللَّهِ الرَّحْمَٰنِ الرَّحِيمِ**

_May this project be a source of guidance and understanding._

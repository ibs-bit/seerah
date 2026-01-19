# Seerah - Quran in Chronological Revelation Order

A beautiful, animated Quran website that displays verses in the chronological order they were revealed, with translations, tafsir (explanations), and reasons for revelation (Asbab al-Nuzul).

![Seerah](https://img.shields.io/badge/Next.js-15-black)
![TypeScript](https://img.shields.io/badge/TypeScript-5-blue)
![Tailwind](https://img.shields.io/badge/Tailwind-4-06B6D4)

## ✨ Features

- 📖 **Chronological Order** - Experience the Quran in the order it was revealed
- 🎨 **Beautiful Animations** - Smooth scroll-based animations using Framer Motion
- 📝 **Translations** - Multiple English translations (Sahih International, etc.)
- 📚 **Tafsir** - Classical explanations and commentary
- ⏰ **Asbab al-Nuzul** - Reasons and context for each revelation
- 🌙 **Dark Mode** - Beautiful light and dark themes
- 📱 **Responsive** - Works on all devices
- 🔍 **Search** - Find surahs by name, number, or translation

## 🚀 Getting Started

### Prerequisites

- Node.js 18+
- npm or pnpm

### Installation

```bash
# Clone the repository
git clone https://github.com/yourusername/seerah.git
cd seerah

# Install dependencies
npm install

# Set up the database
npm run db:push
npm run db:seed

# Start the development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

## 🛠️ Tech Stack

| Technology         | Purpose                         |
| ------------------ | ------------------------------- |
| **Next.js 15**     | React framework with App Router |
| **TypeScript**     | Type safety                     |
| **Tailwind CSS 4** | Styling                         |
| **shadcn/ui**      | UI components                   |
| **Framer Motion**  | Scroll animations               |
| **Prisma**         | Database ORM                    |
| **SQLite**         | Local database (dev)            |

## 📁 Project Structure

```
seerah/
├── app/                    # Next.js App Router pages
│   ├── api/               # API routes
│   ├── chronological/     # Chronological timeline
│   └── surah/            # Surah reading pages
├── components/
│   ├── quran/            # Quran-specific components
│   ├── layout/           # Layout components
│   └── ui/               # shadcn/ui components
├── data/                  # Static data (chronological order)
├── hooks/                 # Custom React hooks
├── lib/                   # Utilities and database
├── prisma/               # Database schema and migrations
└── types/                # TypeScript types
```

## 📜 Database Commands

```bash
# Generate Prisma client
npm run db:generate

# Push schema to database
npm run db:push

# Seed the database
npm run db:seed

# Reset and reseed
npm run db:reset

# Open Prisma Studio
npm run db:studio
```

## 🎨 Key Components

### VerseCard

Animated card displaying Arabic text, translation, tafsir, and revelation context with beautiful scroll-triggered animations.

### ChronologicalTimeline

Interactive timeline showing all 114 surahs organized by their revelation order, with Meccan and Medinan periods clearly distinguished.

### VerseScrollContainer

Smooth scrolling container with reading progress indicator and parallax effects.

## 🌐 Data Sources

- **Quran Text**: Authentic Arabic text in multiple scripts
- **Translations**: Sahih International and other scholarly translations
- **Chronological Order**: Based on traditional Islamic scholarship
- **Tafsir**: Classical commentaries (Ibn Kathir, Al-Jalalayn, etc.)

## 📊 Chronological Order

The Quran was revealed over 23 years:

| Period      | Surahs | Description                                            |
| ----------- | ------ | ------------------------------------------------------ |
| **Meccan**  | 86     | Focus on monotheism, Day of Judgment, moral principles |
| **Medinan** | 28     | Laws, social guidelines, community building            |

## 🔒 Security

This project follows security best practices:

- Input validation with Zod
- Parameterized database queries (Prisma)
- No sensitive data exposure
- Regular Snyk security scans

## 📄 License

This project is open source. The Quran is for all of humanity.

## 🤲 Contributing

Contributions are welcome! Please ensure any changes:

- Maintain accuracy of Quranic content
- Follow the existing code style
- Include appropriate tests

## 🙏 Acknowledgments

- The Holy Quran - guidance for humanity
- Islamic scholars who preserved this knowledge
- Quran.com for their open API
- The open source community

---

**May this project be a source of guidance and understanding. 📖**

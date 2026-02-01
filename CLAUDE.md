# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```bash
npm run dev      # Start development server (hot reload enabled)
npm run build    # Build for production
npm run lint     # Run ESLint
npm run preview  # Preview production build locally
```

## Environment Setup

Node.js is installed via Homebrew. If npm is not found, add Homebrew to PATH:
```bash
export PATH="/opt/homebrew/bin:$PATH"
```

Environment variables (`.env.local`, not committed to git):
```
VITE_SUPABASE_URL=https://izzkmsahowfuljybisml.supabase.co
VITE_SUPABASE_ANON_KEY=<anon-key>
```

## Architecture

Mini Audiolibros is a React + Vite webapp for browsing and playing audiobook summaries.

### Tech Stack
- React 19 with Vite 7
- Tailwind CSS v4 (via @tailwindcss/vite plugin)
- Supabase (PostgreSQL database + Storage for audio/images)

### Key Files

- `src/App.jsx` - Main component managing global state (selected category, current audiobook, playing state, detail view, duration cache)
- `src/lib/supabase.js` - Supabase client configuration
- `src/hooks/useAudiobooks.js` - Hook to fetch audiobooks from Supabase
- `src/hooks/useAudioPlayer.js` - Custom hook for HTML5 audio control (play, pause, seek, time tracking)
- `src/hooks/useAudioDuration.js` - Custom hook for fetching real audio duration from MP3 metadata

### Component Structure

```
App.jsx
├── Header                    # App title and subtitle
├── CategoryFilter            # Category filter buttons
├── AudiobookGrid             # Grid of cards by category
│   └── AudiobookCard         # Individual audiobook card (click: detail, play button: audio)
├── AudiobookDetail           # Modal with full audiobook info
└── AudioPlayerBar            # Fixed bottom player (appears when audio is active)
```

## Supabase Backend

Project URL: `https://izzkmsahowfuljybisml.supabase.co`

### Database Tables

**categories**
| Column | Type | Description |
|--------|------|-------------|
| id | TEXT (PK) | Category identifier (e.g., "filosofia") |
| name | TEXT | Display name |
| created_at | TIMESTAMP | Auto-generated |

Current categories: `filosofia`, `ciencia`, `literatura`, `psicologia`

**audiobooks**
| Column | Type | Description |
|--------|------|-------------|
| id | TEXT (PK) | Audiobook identifier |
| title | TEXT | Book title |
| author | TEXT | Author name |
| description | TEXT | Book description |
| duration | TEXT | Fallback duration (e.g., "12:30") |
| cover_image | TEXT | Full Supabase Storage URL |
| audio_src | TEXT | Full Supabase Storage URL |
| category_id | TEXT (FK) | Reference to categories.id |
| created_at | TIMESTAMP | Auto-generated |

### Storage Buckets

- `audio` - MP3 files (public read)
- `covers` - Cover images (public read)

URLs follow the pattern:
```
https://izzkmsahowfuljybisml.supabase.co/storage/v1/object/public/audio/[filename].mp3
https://izzkmsahowfuljybisml.supabase.co/storage/v1/object/public/covers/[filename].jpg
```

### Security (RLS)

Row Level Security is enabled:
- **Read**: Public (anyone can view audiobooks)
- **Write**: Only authenticated users (admin via Dashboard)

### Admin Workflow

Use Supabase Dashboard directly to manage content:
1. Go to Storage > upload files to `audio` or `covers` bucket
2. Copy the public URL
3. Go to Table Editor > `audiobooks` > insert/edit row with URLs

## Audio Features

### Duration System

The app fetches real audio duration from MP3 files:

1. **useAudioDuration hook** - Creates an `Audio()` element with `preload='metadata'` to fetch only file metadata
2. **Duration cache** - App.jsx maintains a `durationCache` object keyed by `audioSrc` to avoid repeated requests
3. **Fallback** - If audio file fails to load, displays the duration from database
4. **Loading state** - Shows pulse animation while fetching metadata

### Audio Player

The `AudioPlayerBar` component includes:
- Progress bar with click-to-seek functionality
- Time indicators: elapsed time (left) and remaining time with minus sign (right)
- Play/pause controls
- Real-time updates via `useAudioPlayer` hook

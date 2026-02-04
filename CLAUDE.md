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

### Project Structure

```
src/
├── App.jsx                    # Main component (category filter, detail modal)
├── main.jsx                   # React entry point
├── index.css                  # Global styles
├── components/
│   ├── icons/                 # Reusable SVG icon components
│   │   ├── index.js           # Barrel export
│   │   ├── BookIcon.jsx
│   │   ├── PlayIcon.jsx
│   │   ├── PauseIcon.jsx
│   │   ├── CloseIcon.jsx
│   │   └── ClockIcon.jsx
│   ├── ui/                    # Generic UI components
│   │   ├── index.js           # Barrel export
│   │   ├── PlayPauseButton.jsx  # Play/pause toggle (sm/md/lg sizes)
│   │   └── IconButton.jsx     # Generic icon button wrapper
│   ├── audiobook/             # Audiobook-specific components
│   │   ├── index.js           # Barrel export
│   │   ├── AudiobookCover.jsx # Cover image with fallback
│   │   └── AudiobookInfo.jsx  # Title + author (card/detail/player variants)
│   ├── Header.jsx             # App title and subtitle
│   ├── CategoryFilter.jsx     # Category filter buttons
│   ├── AudiobookGrid.jsx      # Grid of cards by category
│   ├── AudiobookCard.jsx      # Individual audiobook card
│   ├── AudiobookDetail.jsx    # Modal with full audiobook info
│   └── AudioPlayerBar.jsx     # Fixed bottom player
├── context/
│   ├── audioPlayerContext.js  # Context definition
│   └── AudioPlayerProvider.jsx # Provider with player state
├── hooks/
│   ├── useAudiobooks.js       # Fetch audiobooks from Supabase
│   ├── useAudioPlayer.js      # HTML5 audio control (play, pause, seek)
│   ├── useAudioDuration.js    # Fetch audio duration from MP3 metadata
│   └── useAudioPlayerContext.js # Hook to consume AudioPlayerContext
└── lib/
    └── supabase.js            # Supabase client configuration
```

### Component Hierarchy

```
App.jsx (wrapped in AudioPlayerProvider)
├── Header                    # App title and subtitle
├── CategoryFilter            # Category filter buttons
├── AudiobookGrid             # Grid of cards by category
│   └── AudiobookCard         # Uses context for player state
│       ├── AudiobookCover    # Image with fallback
│       └── PlayPauseButton   # Play/pause toggle
├── AudiobookDetail           # Modal with full audiobook info
│   ├── AudiobookCover        # Image with fallback
│   └── AudiobookInfo         # Title + author
└── AudioPlayerBar            # Fixed bottom player (uses context)
    ├── BookIcon              # Fallback icon
    ├── AudiobookInfo         # Title + author
    └── PlayPauseButton       # Play/pause toggle
```

### State Management

Audio player state is centralized in `AudioPlayerContext`:

| State/Action | Description |
|--------------|-------------|
| `currentAudiobook` | Currently selected audiobook object |
| `isPlaying` | Boolean play/pause state |
| `durationCache` | Object caching audio durations by URL |
| `playAudiobook(audiobook)` | Start/toggle playback |
| `togglePlayPause()` | Toggle current playback |
| `closePlayer()` | Stop and hide player |
| `handleDurationLoaded(src, duration)` | Cache a loaded duration |

Components access this via `useAudioPlayerContext()` hook.

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
| category_id | TEXT | Legacy field (not used, kept for reference) |
| created_at | TIMESTAMP | Auto-generated |

**audiobook_categories** (many-to-many relation)
| Column | Type | Description |
|--------|------|-------------|
| audiobook_id | TEXT (PK, FK) | Reference to audiobooks.id |
| category_id | TEXT (PK, FK) | Reference to categories.id |

An audiobook can belong to multiple categories via this join table.

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

**Add new audiobook:**
1. Storage > upload files to `audio` and `covers` buckets
2. Copy the public URLs
3. Table Editor > `audiobooks` > insert row with URLs
4. Table Editor > `audiobook_categories` > insert row(s) to assign categories

**Assign audiobook to multiple categories:**
1. Table Editor > `audiobook_categories`
2. Insert one row per category: `(audiobook_id, category_id)`
3. Example: book "mi-libro" in filosofia and ciencia = 2 rows

## Audio Features

### Duration System

The app fetches real audio duration from MP3 files:

1. **useAudioDuration hook** - Creates an `Audio()` element with `preload='metadata'` to fetch only file metadata
2. **Duration cache** - `AudioPlayerContext` maintains a `durationCache` object keyed by `audioSrc` to avoid repeated requests
3. **Fallback** - If audio file fails to load, displays the duration from database
4. **Loading state** - Shows pulse animation while fetching metadata

### Audio Player

The `AudioPlayerBar` component includes:
- Progress bar with click-to-seek functionality
- Time indicators: elapsed time (left) and remaining time with minus sign (right)
- Play/pause controls
- Real-time updates via `useAudioPlayer` hook

## Deployment

Hosted on **Vercel** with automatic deploys from GitHub `main` branch.

### Environment Variables (Vercel)

Configure in Vercel Dashboard > Settings > Environment Variables:

| Variable | Value |
|----------|-------|
| `VITE_SUPABASE_URL` | `https://izzkmsahowfuljybisml.supabase.co` |
| `VITE_SUPABASE_ANON_KEY` | (anon key from Supabase) |

These are public keys (exposed in frontend bundle). Security is enforced by Supabase RLS policies.

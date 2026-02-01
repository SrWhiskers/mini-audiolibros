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

## Architecture

Mini Audiolibros is a React + Vite webapp for browsing and playing audiobook summaries.

### Tech Stack
- React 19 with Vite 7
- Tailwind CSS v4 (via @tailwindcss/vite plugin)
- Static JSON data (no backend)

### Key Files

- `src/App.jsx` - Main component managing global state (selected category, current audiobook, playing state, detail view, duration cache)
- `src/data/audiobooks.json` - All audiobook data organized by categories
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

### Data Management

Audiobooks are stored in `src/data/audiobooks.json` with this structure:
```json
{
  "categories": [{
    "id": "categoria-id",
    "name": "Nombre Visible",
    "audiobooks": [{
      "id": "libro-id",
      "title": "Titulo",
      "author": "Autor",
      "description": "Descripcion",
      "duration": "12:30",        // fallback if audio metadata unavailable
      "coverImage": "/covers/imagen.jpg",
      "audioSrc": "/audio/categoria/archivo.mp3"
    }]
  }]
}
```

### Static Assets

- Audio files: `public/audio/{category}/{filename}.mp3`
- Cover images: `public/covers/{filename}.jpg`

### Audio Duration System

The app fetches real audio duration from MP3 files instead of using hardcoded JSON values:

1. **useAudioDuration hook** - Creates an `Audio()` element with `preload='metadata'` to fetch only file metadata (not the full audio)
2. **Duration cache** - App.jsx maintains a `durationCache` object keyed by `audioSrc` to avoid repeated metadata requests
3. **Fallback** - If audio file fails to load, displays the duration from JSON as fallback
4. **Loading state** - Shows pulse animation while fetching metadata

Flow: `AudiobookCard/AudiobookDetail` -> `useAudioDuration(audioSrc, cachedDuration, onDurationLoaded)` -> callback updates `App.jsx` cache

### Audio Player Features

The `AudioPlayerBar` component includes:
- Progress bar with click-to-seek functionality
- Time indicators above progress bar:
  - Left: elapsed time (e.g., "1:23")
  - Right: remaining time with minus sign (e.g., "-10:07")
- Play/pause controls
- Real-time updates via `useAudioPlayer` hook

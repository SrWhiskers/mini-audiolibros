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

- `src/App.jsx` - Main component managing global state (selected category, current audiobook, playing state, detail view)
- `src/data/audiobooks.json` - All audiobook data organized by categories
- `src/hooks/useAudioPlayer.js` - Custom hook for HTML5 audio control (play, pause, seek, time tracking)

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
      "duration": "12:30",
      "coverImage": "/covers/imagen.jpg",
      "audioSrc": "/audio/categoria/archivo.mp3"
    }]
  }]
}
```

### Static Assets

- Audio files: `public/audio/{category}/{filename}.mp3`
- Cover images: `public/covers/{filename}.jpg`

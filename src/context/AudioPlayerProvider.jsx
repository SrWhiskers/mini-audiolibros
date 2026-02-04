import { useState, useCallback } from 'react';
import { AudioPlayerContext } from './audioPlayerContext';

export function AudioPlayerProvider({ children }) {
  const [currentAudiobook, setCurrentAudiobook] = useState(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [durationCache, setDurationCache] = useState({});

  const handleDurationLoaded = useCallback((audioSrc, duration) => {
    setDurationCache(prev => ({
      ...prev,
      [audioSrc]: duration
    }));
  }, []);

  const playAudiobook = useCallback((audiobook) => {
    if (currentAudiobook?.id === audiobook.id) {
      setIsPlaying(prev => !prev);
    } else {
      setCurrentAudiobook(audiobook);
      setIsPlaying(true);
    }
  }, [currentAudiobook?.id]);

  const togglePlayPause = useCallback(() => {
    setIsPlaying(prev => !prev);
  }, []);

  const closePlayer = useCallback(() => {
    setCurrentAudiobook(null);
    setIsPlaying(false);
  }, []);

  const value = {
    currentAudiobook,
    isPlaying,
    durationCache,
    playAudiobook,
    togglePlayPause,
    closePlayer,
    handleDurationLoaded,
  };

  return (
    <AudioPlayerContext.Provider value={value}>
      {children}
    </AudioPlayerContext.Provider>
  );
}

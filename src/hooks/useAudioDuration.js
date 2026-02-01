import { useState, useEffect } from 'react';
import { formatTime } from './useAudioPlayer';

export function useAudioDuration(audioSrc, cachedDuration, onDurationLoaded) {
  // Track loaded durations by source URL
  const [durationData, setDurationData] = useState({ src: null, duration: null, error: false });

  useEffect(() => {
    // Skip if we already have duration from cache or no audio source
    if (cachedDuration || !audioSrc) {
      return;
    }

    // Skip if we already loaded this source
    if (durationData.src === audioSrc && (durationData.duration || durationData.error)) {
      return;
    }

    let cancelled = false;
    const audio = new Audio();
    audio.preload = 'metadata';

    const handleLoadedMetadata = () => {
      if (cancelled) return;
      const durationSeconds = audio.duration;
      if (!isNaN(durationSeconds) && isFinite(durationSeconds)) {
        setDurationData({ src: audioSrc, duration: durationSeconds, error: false });
        if (onDurationLoaded) {
          onDurationLoaded(audioSrc, durationSeconds);
        }
      }
    };

    const handleError = () => {
      if (cancelled) return;
      setDurationData({ src: audioSrc, duration: null, error: true });
    };

    audio.addEventListener('loadedmetadata', handleLoadedMetadata);
    audio.addEventListener('error', handleError);
    audio.src = audioSrc;

    return () => {
      cancelled = true;
      audio.removeEventListener('loadedmetadata', handleLoadedMetadata);
      audio.removeEventListener('error', handleError);
      audio.src = '';
    };
  }, [audioSrc, cachedDuration, durationData, onDurationLoaded]);

  // Return cached duration if available, otherwise loaded duration
  const duration = cachedDuration || (durationData.src === audioSrc ? durationData.duration : null);
  // isLoading is true when we have a source but no duration yet and no error
  const isLoading = !!audioSrc && !cachedDuration && !duration && !(durationData.src === audioSrc && durationData.error);

  return { duration, isLoading };
}

export function formatDuration(seconds, fallback) {
  if (seconds === null || seconds === undefined || isNaN(seconds)) {
    return fallback || '0:00';
  }
  return formatTime(seconds);
}

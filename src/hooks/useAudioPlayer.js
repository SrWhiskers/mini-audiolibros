import { useState, useRef, useEffect } from 'react';

export function useAudioPlayer() {
  const audioRef = useRef(new Audio());
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    const audio = audioRef.current;

    const handleTimeUpdate = () => setCurrentTime(audio.currentTime);
    const handleLoadedMetadata = () => {
      setDuration(audio.duration);
      setIsLoaded(true);
    };
    const handleEnded = () => setCurrentTime(0);

    audio.addEventListener('timeupdate', handleTimeUpdate);
    audio.addEventListener('loadedmetadata', handleLoadedMetadata);
    audio.addEventListener('ended', handleEnded);

    return () => {
      audio.removeEventListener('timeupdate', handleTimeUpdate);
      audio.removeEventListener('loadedmetadata', handleLoadedMetadata);
      audio.removeEventListener('ended', handleEnded);
    };
  }, []);

  const loadAudio = (src) => {
    setIsLoaded(false);
    setCurrentTime(0);
    setDuration(0);
    audioRef.current.src = src;
    audioRef.current.load();
  };

  const play = () => audioRef.current.play();
  const pause = () => audioRef.current.pause();

  const seek = (time) => {
    audioRef.current.currentTime = time;
    setCurrentTime(time);
  };

  const seekPercent = (percent) => {
    const time = (percent / 100) * duration;
    seek(time);
  };

  return {
    audioRef,
    currentTime,
    duration,
    isLoaded,
    loadAudio,
    play,
    pause,
    seekPercent,
  };
}

export function formatTime(seconds) {
  if (isNaN(seconds) || seconds === 0) return '0:00';
  const mins = Math.floor(seconds / 60);
  const secs = Math.floor(seconds % 60);
  return `${mins}:${secs.toString().padStart(2, '0')}`;
}

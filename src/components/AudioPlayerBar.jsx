import { useEffect } from 'react';
import { useAudioPlayer, formatTime } from '../hooks/useAudioPlayer';
import { useAudioPlayerContext } from '../hooks/useAudioPlayerContext';
import { CloseIcon, BookIcon } from './icons';
import { PlayPauseButton } from './ui';
import { AudiobookInfo } from './audiobook';

export default function AudioPlayerBar() {
  const { currentAudiobook, isPlaying, togglePlayPause, closePlayer } = useAudioPlayerContext();
  const { currentTime, duration, loadAudio, play, pause, seekPercent } = useAudioPlayer();

  useEffect(() => {
    if (currentAudiobook?.audioSrc) {
      loadAudio(currentAudiobook.audioSrc);
    }
  }, [currentAudiobook?.audioSrc]);

  useEffect(() => {
    if (isPlaying) {
      play().catch(() => {});
    } else {
      pause();
    }
  }, [isPlaying]);

  useEffect(() => {
    return () => {
      pause();
    };
  }, []);

  if (!currentAudiobook) {
    return null;
  }

  const progress = duration > 0 ? (currentTime / duration) * 100 : 0;

  const handleProgressClick = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const percent = ((e.clientX - rect.left) / rect.width) * 100;
    seekPercent(percent);
  };

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 shadow-lg z-50">
      <div className="px-4 pt-2">
        <div className="flex justify-between text-xs text-gray-500 mb-1">
          <span>{formatTime(currentTime)}</span>
          <span>-{formatTime(duration - currentTime)}</span>
        </div>
        <div
          className="h-1 bg-gray-200 cursor-pointer rounded-full"
          onClick={handleProgressClick}
        >
          <div
            className="h-full bg-purple-600 rounded-full transition-all duration-100"
            style={{ width: `${progress}%` }}
          />
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 py-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4 min-w-0 flex-1">
            <div className="w-12 h-12 bg-gradient-to-br from-purple-100 to-indigo-100 rounded-lg flex items-center justify-center flex-shrink-0">
              <BookIcon className="w-6 h-6 text-purple-600" />
            </div>

            <AudiobookInfo
              title={currentAudiobook.title}
              author={currentAudiobook.author}
              variant="player"
              className="min-w-0"
            />
          </div>

          <div className="flex items-center space-x-2 md:space-x-4">
            <PlayPauseButton
              isPlaying={isPlaying}
              onClick={togglePlayPause}
              size="sm"
            />

            <button
              onClick={closePlayer}
              className="w-8 h-8 text-gray-400 hover:text-gray-600 flex items-center justify-center transition-colors"
            >
              <CloseIcon className="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

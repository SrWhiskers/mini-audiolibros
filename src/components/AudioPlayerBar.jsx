import { useEffect } from 'react';
import { useAudioPlayer, formatTime } from '../hooks/useAudioPlayer';

export default function AudioPlayerBar({ audiobook, isPlaying, onPlayPause, onClose }) {
  const { currentTime, duration, loadAudio, play, pause, seekPercent } = useAudioPlayer();

  useEffect(() => {
    if (audiobook?.audioSrc) {
      loadAudio(audiobook.audioSrc);
    }
  }, [audiobook?.audioSrc]);

  useEffect(() => {
    if (isPlaying) {
      play().catch(() => {});
    } else {
      pause();
    }
  }, [isPlaying]);

  const progress = duration > 0 ? (currentTime / duration) * 100 : 0;

  const handleProgressClick = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const percent = ((e.clientX - rect.left) / rect.width) * 100;
    seekPercent(percent);
  };

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 shadow-lg z-50">
      <div
        className="h-1 bg-gray-200 cursor-pointer"
        onClick={handleProgressClick}
      >
        <div
          className="h-full bg-purple-600 transition-all duration-100"
          style={{ width: `${progress}%` }}
        />
      </div>

      <div className="max-w-6xl mx-auto px-4 py-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4 min-w-0 flex-1">
            <div className="w-12 h-12 bg-gradient-to-br from-purple-100 to-indigo-100 rounded-lg flex items-center justify-center flex-shrink-0">
              <svg className="w-6 h-6 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"
                />
              </svg>
            </div>

            <div className="min-w-0">
              <h4 className="font-medium text-gray-900 truncate">{audiobook.title}</h4>
              <p className="text-sm text-gray-500 truncate">{audiobook.author}</p>
            </div>
          </div>

          <div className="flex items-center space-x-2 md:space-x-4">
            <span className="text-xs text-gray-500 hidden sm:block">
              {formatTime(currentTime)} / {formatTime(duration)}
            </span>

            <button
              onClick={onPlayPause}
              className="w-10 h-10 bg-purple-600 hover:bg-purple-700 text-white rounded-full flex items-center justify-center transition-colors"
            >
              {isPlaying ? (
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M6 4h4v16H6V4zm8 0h4v16h-4V4z" />
                </svg>
              ) : (
                <svg className="w-5 h-5 ml-0.5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M8 5v14l11-7z" />
                </svg>
              )}
            </button>

            <button
              onClick={onClose}
              className="w-8 h-8 text-gray-400 hover:text-gray-600 flex items-center justify-center transition-colors"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

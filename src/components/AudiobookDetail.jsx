import { useEffect } from 'react';
import { useAudioDuration, formatDuration } from '../hooks/useAudioDuration';
import { useAudioPlayerContext } from '../hooks/useAudioPlayerContext';
import { CloseIcon, ClockIcon, PlayIcon, PauseIcon } from './icons';
import { AudiobookCover, AudiobookInfo } from './audiobook';

export default function AudiobookDetail({ audiobook, onClose }) {
  const { currentAudiobook, isPlaying, durationCache, playAudiobook, handleDurationLoaded } = useAudioPlayerContext();
  const isActive = currentAudiobook?.id === audiobook.id;
  const { duration, isLoading } = useAudioDuration(audiobook.audioSrc, durationCache[audiobook.audioSrc], handleDurationLoaded);

  useEffect(() => {
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = '';
    };
  }, []);

  const handlePlay = () => {
    playAudiobook(audiobook);
  };

  return (
    <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4" onClick={onClose}>
      <div
        className="bg-white rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-hidden shadow-xl"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="relative">
          <AudiobookCover
            coverImage={audiobook.coverImage}
            title={audiobook.title}
            size="lg"
            aspectRatio="wide"
          />

          <button
            onClick={onClose}
            className="absolute top-4 right-4 w-10 h-10 bg-white/90 hover:bg-white rounded-full flex items-center justify-center shadow-lg transition-colors"
          >
            <CloseIcon className="w-5 h-5 text-gray-600" />
          </button>
        </div>

        <div className="p-6">
          <div className="flex items-start justify-between mb-4">
            <AudiobookInfo
              title={audiobook.title}
              author={audiobook.author}
              variant="detail"
            />
            <div className={`flex items-center text-sm text-gray-500 bg-gray-100 px-3 py-1 rounded-full ${isLoading ? 'animate-pulse' : ''}`}>
              <ClockIcon className="w-4 h-4 mr-1" />
              {formatDuration(duration, audiobook.duration)}
            </div>
          </div>

          <p className="text-gray-600 mb-6 leading-relaxed">{audiobook.description}</p>

          <button
            onClick={handlePlay}
            className="w-full py-4 bg-purple-600 hover:bg-purple-700 text-white rounded-xl font-medium flex items-center justify-center gap-2 transition-colors"
          >
            {isPlaying && isActive ? (
              <>
                <PauseIcon className="w-6 h-6" />
                Pausar
              </>
            ) : (
              <>
                <PlayIcon className="w-6 h-6" />
                {isActive ? 'Continuar' : 'Reproducir'}
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
}

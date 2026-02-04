import { useAudioDuration, formatDuration } from '../hooks/useAudioDuration';
import { useAudioPlayerContext } from '../hooks/useAudioPlayerContext';
import { ClockIcon } from './icons';
import { PlayPauseButton } from './ui';
import { AudiobookCover } from './audiobook';

export default function AudiobookCard({ audiobook, onSelectAudiobook }) {
  const { currentAudiobook, isPlaying, durationCache, playAudiobook, handleDurationLoaded } = useAudioPlayerContext();
  const isActive = currentAudiobook?.id === audiobook.id;
  const { duration, isLoading } = useAudioDuration(audiobook.audioSrc, durationCache[audiobook.audioSrc], handleDurationLoaded);

  const handlePlayClick = (e) => {
    e.stopPropagation();
    playAudiobook(audiobook);
  };

  return (
    <div
      onClick={() => onSelectAudiobook(audiobook)}
      className={`bg-white rounded-xl shadow-sm hover:shadow-md transition-all overflow-hidden border-2 cursor-pointer ${
        isActive ? 'border-purple-500' : 'border-transparent'
      }`}
    >
      <div className="relative">
        <AudiobookCover
          coverImage={audiobook.coverImage}
          title={audiobook.title}
          size="md"
          aspectRatio="square"
        />
        <PlayPauseButton
          isPlaying={isPlaying && isActive}
          onClick={handlePlayClick}
          size="md"
          className="absolute bottom-3 right-3 shadow-lg"
        />
      </div>

      <div className="p-4">
        <h3 className="font-semibold text-gray-900 mb-1 line-clamp-1">{audiobook.title}</h3>
        <p className="text-sm text-purple-600 mb-2">{audiobook.author}</p>
        <p className="text-sm text-gray-500 line-clamp-2 mb-3">{audiobook.description}</p>
        <div className={`flex items-center text-xs text-gray-400 ${isLoading ? 'animate-pulse' : ''}`}>
          <ClockIcon className="w-4 h-4 mr-1" />
          {formatDuration(duration, audiobook.duration)}
        </div>
      </div>
    </div>
  );
}

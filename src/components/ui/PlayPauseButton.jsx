import { PlayIcon, PauseIcon } from '../icons';

const sizeClasses = {
  sm: 'w-10 h-10',
  md: 'w-12 h-12',
  lg: 'w-14 h-14',
};

const iconSizeClasses = {
  sm: 'w-5 h-5',
  md: 'w-5 h-5',
  lg: 'w-6 h-6',
};

export default function PlayPauseButton({ isPlaying, onClick, size = 'md', className = '' }) {
  return (
    <button
      onClick={onClick}
      className={`${sizeClasses[size]} bg-purple-600 hover:bg-purple-700 text-white rounded-full flex items-center justify-center transition-colors ${className}`}
    >
      {isPlaying ? (
        <PauseIcon className={iconSizeClasses[size]} />
      ) : (
        <PlayIcon className={`${iconSizeClasses[size]} ml-0.5`} />
      )}
    </button>
  );
}

import { useState } from 'react';

export default function AudiobookCard({ audiobook, onPlay, onClick, isCurrentlyPlaying, isActive }) {
  const [imageError, setImageError] = useState(false);

  const handlePlayClick = (e) => {
    e.stopPropagation();
    onPlay();
  };

  return (
    <div
      onClick={onClick}
      className={`bg-white rounded-xl shadow-sm hover:shadow-md transition-all overflow-hidden border-2 cursor-pointer ${
        isActive ? 'border-purple-500' : 'border-transparent'
      }`}
    >
      <div className="relative aspect-square bg-gradient-to-br from-purple-100 to-indigo-100">
        {audiobook.coverImage && !imageError ? (
          <img
            src={audiobook.coverImage}
            alt={audiobook.title}
            className="absolute inset-0 w-full h-full object-cover"
            onError={() => setImageError(true)}
          />
        ) : (
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="w-20 h-20 bg-purple-200 rounded-full flex items-center justify-center">
              <svg
                className="w-10 h-10 text-purple-600"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"
                />
              </svg>
            </div>
          </div>
        )}
        <button
          onClick={handlePlayClick}
          className="absolute bottom-3 right-3 w-12 h-12 bg-purple-600 hover:bg-purple-700 text-white rounded-full flex items-center justify-center shadow-lg transition-colors"
        >
          {isCurrentlyPlaying && isActive ? (
            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
              <path d="M6 4h4v16H6V4zm8 0h4v16h-4V4z" />
            </svg>
          ) : (
            <svg className="w-5 h-5 ml-0.5" fill="currentColor" viewBox="0 0 24 24">
              <path d="M8 5v14l11-7z" />
            </svg>
          )}
        </button>
      </div>

      <div className="p-4">
        <h3 className="font-semibold text-gray-900 mb-1 line-clamp-1">{audiobook.title}</h3>
        <p className="text-sm text-purple-600 mb-2">{audiobook.author}</p>
        <p className="text-sm text-gray-500 line-clamp-2 mb-3">{audiobook.description}</p>
        <div className="flex items-center text-xs text-gray-400">
          <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
            />
          </svg>
          {audiobook.duration}
        </div>
      </div>
    </div>
  );
}

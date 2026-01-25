import { useState } from 'react';

export default function AudiobookDetail({ audiobook, onClose, onPlay, isPlaying, isActive }) {
  const [imageError, setImageError] = useState(false);

  return (
    <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4" onClick={onClose}>
      <div
        className="bg-white rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-hidden shadow-xl"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="relative">
          <div className="aspect-[2/1] bg-gradient-to-br from-purple-100 to-indigo-100 relative">
            {audiobook.coverImage && !imageError ? (
              <img
                src={audiobook.coverImage}
                alt={audiobook.title}
                className="w-full h-full object-cover"
                onError={() => setImageError(true)}
              />
            ) : (
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="w-24 h-24 bg-purple-200 rounded-full flex items-center justify-center">
                  <svg
                    className="w-12 h-12 text-purple-600"
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
          </div>

          <button
            onClick={onClose}
            className="absolute top-4 right-4 w-10 h-10 bg-white/90 hover:bg-white rounded-full flex items-center justify-center shadow-lg transition-colors"
          >
            <svg className="w-5 h-5 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        <div className="p-6">
          <div className="flex items-start justify-between mb-4">
            <div>
              <h2 className="text-2xl font-bold text-gray-900 mb-1">{audiobook.title}</h2>
              <p className="text-lg text-purple-600">{audiobook.author}</p>
            </div>
            <div className="flex items-center text-sm text-gray-500 bg-gray-100 px-3 py-1 rounded-full">
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

          <p className="text-gray-600 mb-6 leading-relaxed">{audiobook.description}</p>

          <button
            onClick={onPlay}
            className="w-full py-4 bg-purple-600 hover:bg-purple-700 text-white rounded-xl font-medium flex items-center justify-center gap-2 transition-colors"
          >
            {isPlaying && isActive ? (
              <>
                <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M6 4h4v16H6V4zm8 0h4v16h-4V4z" />
                </svg>
                Pausar
              </>
            ) : (
              <>
                <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M8 5v14l11-7z" />
                </svg>
                {isActive ? 'Continuar' : 'Reproducir'}
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
}

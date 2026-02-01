import AudiobookCard from './AudiobookCard';

export default function AudiobookGrid({ categories, onPlayAudiobook, onSelectAudiobook, currentAudiobookId, isPlaying, durationCache, onDurationLoaded }) {
  return (
    <div className="space-y-10">
      {categories.map((category) => (
        <section key={category.id}>
          <h2 className="text-xl font-bold text-gray-800 mb-4 flex items-center">
            <span className="w-1 h-6 bg-purple-600 rounded mr-3"></span>
            {category.name}
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {category.audiobooks.map((audiobook) => (
              <AudiobookCard
                key={audiobook.id}
                audiobook={audiobook}
                onPlay={() => onPlayAudiobook(audiobook)}
                onClick={() => onSelectAudiobook(audiobook)}
                isActive={currentAudiobookId === audiobook.id}
                isCurrentlyPlaying={isPlaying}
                cachedDuration={durationCache[audiobook.audioSrc]}
                onDurationLoaded={onDurationLoaded}
              />
            ))}
          </div>
        </section>
      ))}
    </div>
  );
}

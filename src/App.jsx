import { useState, useCallback } from 'react';
import Header from './components/Header';
import CategoryFilter from './components/CategoryFilter';
import AudiobookGrid from './components/AudiobookGrid';
import AudiobookDetail from './components/AudiobookDetail';
import AudioPlayerBar from './components/AudioPlayerBar';
import audiobooks from './data/audiobooks.json';

function App() {
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [currentAudiobook, setCurrentAudiobook] = useState(null);
  const [selectedAudiobook, setSelectedAudiobook] = useState(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [durationCache, setDurationCache] = useState({});

  const handleDurationLoaded = useCallback((audioSrc, duration) => {
    setDurationCache(prev => ({
      ...prev,
      [audioSrc]: duration
    }));
  }, []);

  const categories = audiobooks.categories;

  const filteredCategories = selectedCategory === 'all'
    ? categories
    : categories.filter(cat => cat.id === selectedCategory);

  const handlePlayAudiobook = (audiobook) => {
    if (currentAudiobook?.id === audiobook.id) {
      setIsPlaying(!isPlaying);
    } else {
      setCurrentAudiobook(audiobook);
      setIsPlaying(true);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 pb-24">
      <Header />

      <main className="max-w-6xl mx-auto px-4 py-8">
        <CategoryFilter
          categories={categories}
          selectedCategory={selectedCategory}
          onSelectCategory={setSelectedCategory}
        />

        <AudiobookGrid
          categories={filteredCategories}
          onPlayAudiobook={handlePlayAudiobook}
          onSelectAudiobook={setSelectedAudiobook}
          currentAudiobookId={currentAudiobook?.id}
          isPlaying={isPlaying}
          durationCache={durationCache}
          onDurationLoaded={handleDurationLoaded}
        />
      </main>

      {currentAudiobook && (
        <AudioPlayerBar
          audiobook={currentAudiobook}
          isPlaying={isPlaying}
          onPlayPause={() => setIsPlaying(!isPlaying)}
          onClose={() => {
            setCurrentAudiobook(null);
            setIsPlaying(false);
          }}
        />
      )}

      {selectedAudiobook && (
        <AudiobookDetail
          audiobook={selectedAudiobook}
          onClose={() => setSelectedAudiobook(null)}
          onPlay={() => handlePlayAudiobook(selectedAudiobook)}
          isPlaying={isPlaying}
          isActive={currentAudiobook?.id === selectedAudiobook.id}
          cachedDuration={durationCache[selectedAudiobook.audioSrc]}
          onDurationLoaded={handleDurationLoaded}
        />
      )}
    </div>
  );
}

export default App;

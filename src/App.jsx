import { Routes, Route } from 'react-router-dom';
import HomePage from './pages/HomePage';
import AudiobookDetailPage from './pages/AudiobookDetailPage';
import AudioPlayerBar from './components/AudioPlayerBar';
import { AudioPlayerProvider } from './context/AudioPlayerProvider';
import { AudiobooksProvider } from './context/AudiobooksProvider';

function App() {
  return (
    <AudiobooksProvider>
      <AudioPlayerProvider>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/audiobook/:id" element={<AudiobookDetailPage />} />
        </Routes>
        <AudioPlayerBar />
      </AudioPlayerProvider>
    </AudiobooksProvider>
  );
}

export default App;

import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import HomePage from './pages/HomePage';
import StreamerDetailsPage from './pages/StreamerDetailsPage';
import { StreamersProvider } from './contexts/StreamersContext';

function App() {
  return (
    <Router>
      <StreamersProvider>
        <Routes>
          <Route
            path='/streamer/:streamerId'
            element={<StreamerDetailsPage />}
          />
          <Route path='/' element={<HomePage />} />
        </Routes>
      </StreamersProvider>
    </Router>
  );
}

export default App;

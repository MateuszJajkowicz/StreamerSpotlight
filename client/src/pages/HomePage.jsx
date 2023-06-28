import StreamerForm from '../components/StreamerForm';
import StreamerList from '../components/StreamerList';

const HomePage = () => {
  return (
    <div>
      <h1>Streamer Spotlight</h1>
      <StreamerForm />
      <StreamerList />
    </div>
  );
};

export default HomePage;

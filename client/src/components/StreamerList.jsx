import { useStreamers } from '../contexts/StreamersContext';
import { getAllStreamers } from '../api/streamers';
import useFetchData from '../hooks/useFetchData';
import StreamerItem from './StreamerItem';

const StreamerList = () => {
  const { streamers } = useStreamers();
  const { setStreamers } = useStreamers();

  const { fetchingError } = useFetchData(getAllStreamers, [], setStreamers);

  if (fetchingError) {
    return <p>{fetchingError}</p>;
  }

  if (!streamers.length) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h2>Streamers</h2>
      {streamers.map((streamer) => (
        <StreamerItem key={streamer._id} streamer={streamer} />
      ))}
    </div>
  );
};

export default StreamerList;

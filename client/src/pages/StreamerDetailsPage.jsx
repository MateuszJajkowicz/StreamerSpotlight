import { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { getStreamerById } from '../api/streamers';
import useFetchData from '../hooks/useFetchData';
import useVoteStreamer from '../hooks/useVoteStreamer';

const StreamerDetails = () => {
  const { streamerId } = useParams();
  const navigate = useNavigate();
  const { handleVote, votingError } = useVoteStreamer();
  const [streamer, setStreamer] = useState(null);

  const { fetchingError } = useFetchData(
    () => getStreamerById(streamerId),
    [streamerId],
    setStreamer
  );

  const handleGoBack = () => {
    navigate('/');
  };

  if (fetchingError) {
    return <p>{fetchingError}</p>;
  }

  if (!streamer) {
    return <div>Loading...</div>;
  }

  const handleVoteClick = async (voteType) => {
    try {
      await handleVote(streamerId, voteType);
      const updatedStreamer = await getStreamerById(streamerId);
      setStreamer(updatedStreamer);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div>
      <h2>Streamer Details</h2>
      <h3>{streamer.name}</h3>
      <p>{streamer.description}</p>
      <p>Platform: {streamer.platform}</p>
      <img
        src='https://static-cdn.jtvnw.net/jtv_user_pictures/asmongold-profile_image-f7ddcbd0332f5d28-300x300.png'
        alt='Streamer Image'
      />
      <p>
        Votes: Upvotes - {streamer.upvotes}, Downvotes - {streamer.downvotes}
      </p>
      <button onClick={() => handleVoteClick('upvote')}>Upvote</button>
      <button onClick={() => handleVoteClick('downvote')}>Downvote</button>
      {votingError && <p>{votingError}</p>}
      <button onClick={handleGoBack}>Go Back</button>
    </div>
  );
};

export default StreamerDetails;

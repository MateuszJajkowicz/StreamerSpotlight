import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import useVoteStreamer from '../hooks/useVoteStreamer';

const StreamerItem = ({ streamer }) => {
  const { handleVote, votingError } = useVoteStreamer();

  return (
    <div className='streamer-item'>
      <h3>
        <Link to={`/streamer/${streamer._id}`}>{streamer.name}</Link>
      </h3>
      <p>{streamer.description}</p>
      <p>Platform: {streamer.platform}</p>
      <p>
        Votes: Upvotes - {streamer.upvotes}, Downvotes - {streamer.downvotes}
      </p>
      <button onClick={() => handleVote(streamer._id, 'upvote')}>Upvote</button>
      <button onClick={() => handleVote(streamer._id, 'downvote')}>
        Downvote
      </button>
      {votingError && <p>{votingError}</p>}
    </div>
  );
};

StreamerItem.propTypes = {
  streamer: PropTypes.shape({
    _id: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
    platform: PropTypes.string.isRequired,
    upvotes: PropTypes.number.isRequired,
    downvotes: PropTypes.number.isRequired,
  }).isRequired,
};

export default StreamerItem;

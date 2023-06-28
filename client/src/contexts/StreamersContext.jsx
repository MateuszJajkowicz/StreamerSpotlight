import { createContext, useContext, useState } from 'react';
import PropTypes from 'prop-types';
import { voteForStreamer } from '../api/streamers';

const StreamerContext = createContext();

// eslint-disable-next-line react-refresh/only-export-components
export const useStreamers = () => {
  return useContext(StreamerContext);
};

export const StreamersProvider = ({ children }) => {
  const [streamers, setStreamers] = useState([]);

  const updateStreamerVotes = (streamerId, voteType) => {
    setStreamers((prevStreamers) =>
      prevStreamers.map((streamer) => {
        if (streamer._id === streamerId) {
          if (voteType === 'upvote') {
            return { ...streamer, upvotes: streamer.upvotes + 1 };
          } else if (voteType === 'downvote') {
            return { ...streamer, downvotes: streamer.downvotes + 1 };
          }
        }
        return streamer;
      })
    );
  };

  const voteForStreamerHandler = async (streamerId, voteType) => {
    try {
      await voteForStreamer(streamerId, voteType);
      updateStreamerVotes(streamerId, voteType);
    } catch (error) {
      console.error(error);
    }
  };

  const value = {
    streamers,
    setStreamers,
    voteForStreamerHandler,
  };

  return (
    <StreamerContext.Provider value={value}>
      {children}
    </StreamerContext.Provider>
  );
};

StreamersProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

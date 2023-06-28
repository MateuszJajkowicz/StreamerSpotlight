import { useState } from 'react';
import { useStreamers } from '../contexts/StreamersContext';

const useVoteStreamer = () => {
  const { voteForStreamerHandler } = useStreamers();
  const [votingError, setVotingError] = useState('');

  const handleVote = async (streamerId, voteType) => {
    try {
      await voteForStreamerHandler(streamerId, voteType);
      setVotingError('');
    } catch (error) {
      console.error(error);
      setVotingError('Failed to vote for the streamer.');
    }
  };

  return { handleVote, votingError };
};

export default useVoteStreamer;

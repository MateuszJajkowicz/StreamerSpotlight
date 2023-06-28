import { useState } from 'react';
import { createStreamer } from '../api/streamers';
import { useStreamers } from '../contexts/StreamersContext';

const StreamerForm = () => {
  const initialState = {
    name: '',
    platform: '',
    description: '',
  };

  const [streamerData, setStreamerData] = useState(initialState);
  const [error, setError] = useState('');
  const { setStreamers } = useStreamers();

  const handleInputChange = (e) => {
    setStreamerData({ ...streamerData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!streamerData.name || !streamerData.platform) {
      setError('Please provide a name and select a platform.');
      return;
    }

    try {
      await createStreamer(streamerData, setStreamers);
      setStreamerData(initialState);
      setError('');
    } catch (error) {
      setError('Failed to add the streamer.');
      console.error(error);
    }
  };

  return (
    <div>
      <h2>Add Streamer</h2>
      <form onSubmit={handleSubmit}>
        {error && <p>{error}</p>}
        <label>
          Name:
          <input
            type='text'
            name='name'
            value={streamerData.name}
            onChange={handleInputChange}
          />
        </label>
        <label>
          Platform:
          <select
            name='platform'
            value={streamerData.platform}
            onChange={handleInputChange}
          >
            <option value=''>Select Platform</option>
            <option value='Twitch'>Twitch</option>
            <option value='YouTube'>YouTube</option>
            <option value='TikTok'>TikTok</option>
            <option value='Kick'>Kick</option>
            <option value='Rumble'>Rumble</option>
          </select>
        </label>
        <label>
          Description:
          <textarea
            name='description'
            value={streamerData.description}
            onChange={handleInputChange}
          />
        </label>
        <button type='submit'>Submit</button>
      </form>
    </div>
  );
};

export default StreamerForm;

import axios from 'axios';

const API_URL = import.meta.env.VITE_REACT_APP_API_URL;

export const createStreamer = async (streamer, setStreamers) => {
  try {
    const response = await axios.post(`${API_URL}/streamers`, streamer);
    const newStreamer = response.data;
    setStreamers((prevStreamers) => [...prevStreamers, newStreamer]);
    return newStreamer;
  } catch (error) {
    throw new Error('Failed to craete streamer.');
  }
};

export const getAllStreamers = async () => {
  try {
    const response = await axios.get(`${API_URL}/streamers`);
    return response.data;
  } catch (error) {
    throw new Error('Failed to fetch streamers.');
  }
};

export const getStreamerById = async (streamerId) => {
  try {
    const response = await axios.get(`${API_URL}/streamers/${streamerId}`);
    return response.data;
  } catch (error) {
    throw new Error('Failed to fetch the streamer.');
  }
};

export const voteForStreamer = async (streamerId, voteType) => {
  try {
    const response = await axios.put(
      `${API_URL}/streamers/${streamerId}/vote`,
      {
        voteType,
      }
    );
    const updatedStreamer = response.data;
    return updatedStreamer;
  } catch (error) {
    throw new Error('Failed to update the streamer vote.');
  }
};

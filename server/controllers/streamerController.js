import Streamer from '../models/streamerModel.js';

// @desc    Create a new streamer
// @route   POST /api/streamers
// @access  Public
export const createStreamer = async (req, res) => {
  try {
    const { name, platform, description } = req.body;

    const streamer = new Streamer({
      name,
      platform,
      description,
      upvotes: 0,
      downvotes: 0,
    });

    const savedStreamer = await streamer.save();

    res.json(savedStreamer);
  } catch (error) {
    res.status(500).json({ error: 'Failed to create a new streamer.' });
  }
};

// @desc    Fetch all streamers
// @route   GET /api/streamers
// @access  Public
export const getAllStreamers = async (req, res) => {
  try {
    const streamers = await Streamer.find();

    res.json(streamers);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch streamers.' });
  }
};

// @desc    Fetch a specific streamer by ID
// @route   GET /api/streamers/:streamerId
// @access  Public
export const getStreamerById = async (req, res) => {
  try {
    const { streamerId } = req.params;

    const streamer = await Streamer.findById(streamerId);

    if (!streamer) {
      return res.status(404).json({ error: 'Streamer not found.' });
    }

    res.json(streamer);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch the streamer.' });
  }
};

// @desc    Update the streamer vote
// @route   PUT /streamers/:streamerId/vote
// @access  Public
export const updateStreamerVote = async (req, res) => {
  try {
    const { streamerId } = req.params;
    const { voteType } = req.body;

    const streamer = await Streamer.findById(streamerId);

    if (!streamer) {
      return res.status(404).json({ error: 'Streamer not found.' });
    }

    if (voteType === 'upvote') {
      streamer.upvotes++;
    } else if (voteType === 'downvote') {
      streamer.downvotes++;
    }

    const updatedStreamer = await streamer.save();

    res.json(updatedStreamer);
  } catch (error) {
    res.status(500).json({ error: 'Failed to update the streamer vote.' });
  }
};

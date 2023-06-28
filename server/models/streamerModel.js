import mongoose from 'mongoose';

const streamerSchema = new mongoose.Schema({
  name: { type: String, required: true },
  platform: {
    type: String,
    enum: ['Twitch', 'YouTube', 'TikTok', 'Kick', 'Rumble'],
    required: true,
  },
  description: { type: String, required: false },
  upvotes: { type: Number, default: 0 },
  downvotes: { type: Number, default: 0 },
});

const Streamer = mongoose.model('Streamer', streamerSchema);

export default Streamer;

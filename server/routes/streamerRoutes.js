import express from 'express';
import {
  createStreamer,
  getAllStreamers,
  getStreamerById,
  updateStreamerVote,
} from '../controllers/streamerController.js';

const router = express.Router();

router.post('/', createStreamer);

router.get('/', getAllStreamers);

router.get('/:streamerId', getStreamerById);

router.put('/:streamerId/vote', updateStreamerVote);

export default router;

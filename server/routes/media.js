import express from 'express';

import { getSongs } from '../controllers/media.js';

const router = express.Router();

router.get('/songs', getSongs);

export default router;
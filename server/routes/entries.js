import express from 'express';

import { getEntries, createEntry } from '../controllers/entries.js';

const router = express.Router();

router.get('/', getEntries);
router.post('/', createEntry);

export default router;
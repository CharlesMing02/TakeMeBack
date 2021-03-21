import express from 'express';

import { getEntries, createEntry, updateEntry } from '../controllers/entries.js';

const router = express.Router();

router.get('/', getEntries);
router.post('/', createEntry);
router.patch('/:id', updateEntry);

export default router;
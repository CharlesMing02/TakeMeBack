import express from 'express';

import { getEntries, createEntry, updateEntry, updateAskedCount } from '../controllers/entries.js';

const router = express.Router();

router.get('/', getEntries);
router.post('/', createEntry);
router.patch('/:id', updateEntry);
router.patch('/:id/updateAskedCount', updateAskedCount);

export default router;
import express from 'express';

import { getEntries, createEntry, updateEntry, updateAskedCount } from '../controllers/entries.js';
import auth from '../middleware/auth.js';

const router = express.Router();

router.get('/', auth, getEntries);
router.post('/', auth, createEntry);
router.patch('/:id', auth, updateEntry);
router.patch('/:id/updateAskedCount', auth, updateAskedCount);

export default router;
import express from 'express';

import { signin, signup, updateUser, getGuessEntry, getUsers, refreshUsers } from '../controllers/users.js';

const router = express.Router();

router.post('/signin', signin);
router.post('/signup', signup);
router.patch('/:id', updateUser);
router.get('/:id', getGuessEntry);
router.get('/', getUsers);
router.post('/', refreshUsers)

export default router;
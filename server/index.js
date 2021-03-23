import express from 'express';
import bodyParser from 'body-parser';
import mongoose from 'mongoose';
import cors from 'cors';
import dotenv from 'dotenv';
import cron from 'node-cron';

import entryRoutes from './routes/entries.js';
import userRoutes from './routes/users.js';
import User from './models/user.js';

const app = express();
dotenv.config();

app.use(bodyParser.json({ limit: "30mb", extended: true}));
app.use(bodyParser.urlencoded({ limit: "30mb", extended: true}));
app.use(cors());

// adds prefix of entries to all routes from that file
app.use('/entries', entryRoutes);
app.use('/user', userRoutes);

cron.schedule('0/10 * * * *', async () => {
    const res = await User.updateMany({guessed: false}, {streak: 0});
    console.log(`Streaks broken: ${res.n}. Modified: ${res.nModified}`);

    const res2 = await User.updateMany({}, { guessed: false, logged: false });
    console.log(`Reset: ${res2.n}`);
});

const PORT = process.env.PORT || 5000;

mongoose.connect(process.env.CONNECTION_URL, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => app.listen(PORT, () => console.log(`Server running on port: ${PORT}`)))
    .catch((error) => console.log(error.message));

mongoose.set('useFindAndModify', false);



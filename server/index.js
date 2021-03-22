import express from 'express';
import bodyParser from 'body-parser';
import mongoose from 'mongoose';
import cors from 'cors';
import dotenv from 'dotenv';

import entryRoutes from './routes/entries.js';
import userRoutes from './routes/users.js';

const app = express();
dotenv.config();

app.use(bodyParser.json({ limit: "30mb", extended: true}));
app.use(bodyParser.urlencoded({ limit: "30mb", extended: true}));
app.use(cors());

// adds prefix of entries to all routes from that file
app.use('/entries', entryRoutes);
app.use('/user', userRoutes);


const PORT = process.env.PORT || 5000;

mongoose.connect(process.env.CONNECTION_URL, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => app.listen(PORT, () => console.log(`Server running on port: ${PORT}`)))
    .catch((error) => console.log(error.message));

mongoose.set('useFindAndModify', false);

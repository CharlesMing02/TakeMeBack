import express from 'express';
import bodyParser from 'body-parser';
import mongoose from 'mongoose';
import cors from 'cors';

import entryRoutes from './routes/entries.js';

const app = express();

app.use(bodyParser.json({ limit: "30mb", extended: true}));
app.use(bodyParser.urlencoded({ limit: "30mb", extended: true}));
app.use(cors());

// adds prefix of entries to all routes from that file
app.use('/entries', entryRoutes);

// Hide credentials later
const Connection_URL = 'mongodb+srv://charlesming:charlesming123@cluster0.ze1tr.mongodb.net/cluster0?retryWrites=true&w=majority'
const PORT = process.env.PORT || 5000;

mongoose.connect(Connection_URL, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => app.listen(PORT, () => console.log(`Server running on port: ${PORT}`)))
    .catch((error) => console.log(error.message));

mongoose.set('useFindAndModify', false);

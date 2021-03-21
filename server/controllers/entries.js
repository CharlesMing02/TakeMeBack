import mongoose from 'mongoose';
import EntryMessage from '../models/entryMessage.js';

export const getEntries = async (req, res) => {
    try {
        const entryMessages = await EntryMessage.find();

        res.status(200).json(entryMessages);
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
};

export const createEntry = async (req, res) => {
    const entry = req.body;
    const newEntry = new EntryMessage(entry);

    try {
        await newEntry.save();

        res.status(201).json(newEntry);
    } catch (error) {
        res.status(409).json({ message: error.message });
    }
};

export const updateEntry = async (req, res) => {
    const { id: _id } = req.params; //renames to _id to fit backend schema
    const entry = req.body

    if(!mongoose.Types.ObjectId.isValid(_id)) {
        return res.status(404).send('Invalid entry id');
    }

    const updatedEntry = await EntryMessage.findByIdAndUpdate(_id, { ...entry, _id }, { new: true });
    res.json(updatedEntry);
}
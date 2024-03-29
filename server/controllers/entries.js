import mongoose from 'mongoose';

import EntryMessage from '../models/entryMessage.js';

export const getEntries = async (req, res) => {
    try {
        if(!req.userId) return res.json({ message: "Unauthenticated" });

        const entryMessages = await EntryMessage.find({ creator: req.userId }).exec();

        res.status(200).json(entryMessages);
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
};

export const createEntry = async (req, res) => {
    const entry = req.body;
    const newEntry = new EntryMessage({ ...entry, creator: req.userId });

    if(!req.userId) return res.json({ message: "Unauthenticated" });

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

    if(!req.userId) return res.json({ message: "Unauthenticated" });

    if(!mongoose.Types.ObjectId.isValid(_id)) {
        return res.status(404).send('Invalid entry id');
    }

    const updatedEntry = await EntryMessage.findByIdAndUpdate(_id, { ...entry, _id }, { new: true });
    res.json(updatedEntry);
}

export const updateAskedCount = async (req, res) => {
    const { id } = req.params;

    if(!req.userId) return res.json({ message: "Unauthenticated" });

    if(!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).send('Invalid entry id');
    }

    const entry = await EntryMessage.findById(id);
    const updatedEntry = await EntryMessage.findByIdAndUpdate(id, { askedCount: entry.askedCount +1 }, {new: true});
    res.json(updatedEntry)
}
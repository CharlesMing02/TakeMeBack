import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import mongoose from 'mongoose';

import User from '../models/user.js';
import EntryMessage from '../models/entryMessage.js';

export const signin = async (req, res) => {
    const { email, password } = req.body;

    try {
        const existingUser = await User.findOne({ email });
        if (!existingUser) return res.status(404).json({ message: "User doesn't exist." });

        const isPasswordCorrect = await bcrypt.compare(password, existingUser.password);
        if (!isPasswordCorrect) return res.status(400).json({ message: "Invalid credentials." });

        const token = jwt.sign({ email: existingUser.email, id: existingUser._id }, 'test', { expiresIn: "1h" });
        res.status(200).json({ result: existingUser, token });
    } catch (error) {
        res.status(500).json({ message: 'Something went wrong.' });
    }
}

export const signup = async (req, res) => {
    const { email, password, confirmPassword, firstName, lastName } = req.body;

    try {
        const existingUser = await User.findOne({ email });
        if (existingUser) return res.status(400).json({ message: "User already exists." });

        if (password !== confirmPassword) return res.status(400).json({ message: "Passwords don't match." });

        const hashedPassword = await bcrypt.hash(password, 12);
        const result = await User.create({ email, password: hashedPassword, name: `${firstName} ${lastName}` });
        const token = jwt.sign({ email: result.email, id: result._id }, 'test', { expiresIn: "1h" });
        res.status(200).json({ result: result, token });
    } catch (error) {
        res.status(500).json({ message: 'Something went wrong.' });
    }
}

export const updateUser = async (req, res) => {
    const { id: _id } = req.params; //renames to _id to fit backend schema
    const user = req.body

    if(!mongoose.Types.ObjectId.isValid(_id)) {
        return res.status(404).send('Invalid user id');
    }

    const updatedUser = await User.findByIdAndUpdate(_id, { ...user, _id }, { new: true });
    res.json(updatedUser);
}

export const getGuessEntry = async (req, res) => {
    try {
        const _id = req.params.id;
    
        EntryMessage.countDocuments({ creator: _id }).exec(function (err, count) {
            console.log('count', count)
            const random = Math.floor(Math.random() * count / 2) //get random entry with the max amount of skips being the number of entries
            console.log(random)
            EntryMessage.findOne({ creator: _id }).skip(random).exec(
                function (err, result) {
                    console.log(result.description);
                    res.status(200).json(result);
                }
            );
        });
        
    } catch (error) {
        res.status(404).json({ message: error.message})
    }

}
import mongoose from 'mongoose';

const entrySchema = mongoose.Schema({
    creator: String,
    createdAt: {
        type: Date,
        default: new Date()
    },
    highlights: [String],
    description: String,
    askedCount: {
        type: Number,
        default: 0
    },
    selectedFile: String,
    song: Object
    // add extra attributes like song, media, etc. later
});

const EntryMessage = mongoose.model('EntryMessage', entrySchema)

export default EntryMessage;
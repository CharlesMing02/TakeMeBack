import mongoose from 'mongoose';

const userSchema = mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true },
    password: { type: String, required: true },
    id: { type: String },
    streak: { type: Number, default: 0 },
    points: { type: Number, default: 0 },
    logged: { type: Boolean, default: false },
    guessed: { type: Boolean, default: false },
    settings: {
        autoplay: { type: Boolean, default: true },
        theme: { type: String, default: 'default' }
    }
});

const User = mongoose.model('User', userSchema)

export default User;
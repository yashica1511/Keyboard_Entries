const mongoose = require('mongoose');

const TypingTestResultSchema = new mongoose.Schema({
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    wpm: { type: Number, required: true },
    cpm: { type: Number, required: true },
    accuracy: { type: Number, required: true },
    errors: { type: Number, required: true },
    duration: { type: Number, required: true },
    createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model('TypingTestResult', TypingTestResultSchema);

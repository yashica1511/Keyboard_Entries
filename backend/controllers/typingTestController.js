const TypingTestResult = require('../models/TypingTestResult');
const User = require('../models/User');

exports.saveResult = async (req, res) => {
    const { wpm, cpm, accuracy, errors, duration } = req.body;

    try {
        const userId = req.user.userId; // Extracted from the verified token in authMiddleware

        const newResult = new TypingTestResult({
            user: userId,
            wpm,
            cpm,
            accuracy,
            errors,
            duration,
        });

        await newResult.save();

        res.status(201).json({ msg: 'Typing test result saved successfully', result: newResult });
    } catch (error) {
        console.error('Error saving typing test result:', error);
        res.status(500).json({ msg: 'Server error' });
    }
};


exports.fetchResults = async (req, res) => {
    try {
        const userId = req.user.userId;

        const results = await TypingTestResult.find({ user: userId }).sort({ createdAt: -1 }); // Sort by latest first

        res.status(200).json({ msg: 'Typing test results fetched successfully', results });
    } catch (error) {
        console.error('Error fetching typing test results:', error);
        res.status(500).json({ msg: 'Server error' });
    }
};


exports.leaderboard = async (req, res) => {
    try {
        const results = await TypingTestResult.find().sort({ wpm: -1 }).limit(10);

        // Fetch usernames for each result
        const leaderboard = await Promise.all(results.map(async (result) => {
            const user = await User.findById(result.user).select('username'); // Find user by ID
            return {
                _id: result._id,
                username: user ? user.username : 'Unknown',
                wpm: result.wpm,
                accuracy: result.accuracy
            };
        }));

        res.status(200).json({ leaderboard });
    } catch (error) {
        console.error('Error fetching leaderboard:', error);
        res.status(500).json({ msg: 'Server error' });
    }
};

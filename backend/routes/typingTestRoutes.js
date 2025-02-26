const express = require('express');
const router = express.Router();
const { saveResult,fetchResults, leaderboard } = require('../controllers/typingTestController');
const authMiddleware = require('../middleware/authMiddleware');

router.post('/save-result', authMiddleware, saveResult);
router.get('/fetch-results', authMiddleware, fetchResults);
router.get('/leaderboard', authMiddleware, leaderboard);

module.exports = router;

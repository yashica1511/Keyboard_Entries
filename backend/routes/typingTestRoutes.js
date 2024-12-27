const express = require('express');
const router = express.Router();
const { saveResult,fetchResults } = require('../controllers/typingTestController');
const authMiddleware = require('../middleware/authMiddleware');

router.post('/save-result', authMiddleware, saveResult);
router.get('/fetch-results', authMiddleware, fetchResults);

module.exports = router;

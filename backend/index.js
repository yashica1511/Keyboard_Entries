const express = require('express');
const cors = require('cors');
const connectDB = require('./config/db');
const authRoutes = require('./routes/authRoutes');
const typingTestRoutes = require('./routes/typingTestRoutes');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

connectDB();

app.use('/api/auth', authRoutes);
app.use('/api/typing', typingTestRoutes);

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});

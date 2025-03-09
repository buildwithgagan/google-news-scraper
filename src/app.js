const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const newsRoutes = require('./routes/newsRoutes');
const errorHandler = require('./middleware/errorHandler');

require('dotenv').config();

const app = express();

// Middleware
app.use(helmet());
app.use(cors());
app.use(express.json());

// Routes
app.use('/api/news', newsRoutes);

// Basic test route
app.get('/test', (req, res) => {
    res.json({ message: 'Server is running!' });
});

// Error handling
app.use(errorHandler);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});

module.exports = app; 
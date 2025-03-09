const express = require('express');
const router = express.Router();
const newsController = require('../controllers/newsController');
const { validateSearchParams } = require('../middleware/validators');

router.get('/search', validateSearchParams, newsController.searchNews);

module.exports = router; 
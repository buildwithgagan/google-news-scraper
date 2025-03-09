const NewsService = require('../services/newsService');
const cache = require('../utils/cache');

class NewsController {
    async searchNews(req, res, next) {
        try {
            const { topic, cursor = 0 } = req.query;
            
            // Check cache first
            const cacheKey = `${topic}-${cursor}`;
            const cachedResults = cache.get(cacheKey);
            
            if (cachedResults) {
                return res.json(cachedResults);
            }

            const newsService = new NewsService();
            const results = await newsService.searchNews(topic, parseInt(cursor));
            
            // Cache the results
            cache.set(cacheKey, results);
            
            res.json(results);
        } catch (error) {
            next(error);
        }
    }
}

module.exports = new NewsController(); 
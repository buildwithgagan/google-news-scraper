const NodeCache = require('node-cache');

const cache = new NodeCache({
    stdTTL: process.env.CACHE_TTL || 1800, // 30 minutes default
    checkperiod: 120
});

module.exports = cache; 
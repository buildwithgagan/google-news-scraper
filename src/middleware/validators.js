const { CustomError } = require('../utils/errors');

function validateSearchParams(req, res, next) {
    const { topic, cursor } = req.query;

    if (!topic) {
        throw new CustomError('Topic parameter is required', 400);
    }

    if (cursor && isNaN(cursor)) {
        throw new CustomError('Cursor must be a number', 400);
    }

    next();
}

module.exports = {
    validateSearchParams
}; 
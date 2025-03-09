const { CustomError } = require('../utils/errors');

function errorHandler(err, req, res, next) {
    if (err instanceof CustomError) {
        return res.status(err.statusCode).json({
            error: err.message
        });
    }

    console.error(err);
    res.status(500).json({
        error: 'Internal Server Error'
    });
}

module.exports = errorHandler; 
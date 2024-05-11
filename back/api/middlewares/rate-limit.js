const rateLimit = require("express-rate-limit");

function rateLimitHandler(req, res) {
    res.status(429).json({
        error: "Too many requests"
    });
}

//Middleware de 500 requête toutes les 10 minutes
const limiter = rateLimit({
    windowMs: 10 * 60 * 1000, // 10 minutes
    max: 500,
    handler: rateLimitHandler
});

module.exports = limiter;
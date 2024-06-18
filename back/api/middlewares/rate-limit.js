const rateLimit = require("express-rate-limit");

function rateLimitHandler(req, res) {
    res.status(429).json({
        // 429 code erreur d'un dépassement de requête
        error: "Too many requests",
    });
}

// Middleware de 500 requête toutes les 10 minutes
const limiter = rateLimit({
    windowMs: 10 * 60 * 1000, // 10 minutes
    max: 500, // Maximum 500 requêtes
    handler: rateLimitHandler, // Sinon ce handler s'active
});

module.exports = limiter;

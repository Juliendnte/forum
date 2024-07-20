require("dotenv").config();
const jwt = require('jsonwebtoken');
const jwt_key = process.env.JWT_KEY;

function validateToken(req, res, next) {
    const token = req.get('Authorization') || req.get('authorization');//Récupere le token
    if (!token) return res.status(401).send("Unauthorized")//S'il y en a pas
    jwt.verify(token, jwt_key, (err, user) => {//Vérifie si le token mit dans le header correspond a la clé jwt
        if (err) {
            return res.status(403).send("Forbidden");
        }

        req.user = user;
        next();// Prochain middleware
    });
}

module.exports = validateToken;
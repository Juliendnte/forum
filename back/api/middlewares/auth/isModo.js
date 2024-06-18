function validateModo(req, res, next) {
    if (!req.user.isModo || !req.user.isAdmin){
        return res.status(403).send("Forbidden");
    }
    next();
}

module.exports = validateModo;
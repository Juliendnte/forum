function validateModo(req, res, next) {
    if (!req.user.IsModo || !req.user.IsAdmin){
        return res.status(403).send("Forbidden");
    }
    next();
}

module.exports = validateModo;
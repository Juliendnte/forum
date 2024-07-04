function validateAdmin(req, res, next) {
    if (!req.user.IsAdmin){
        return res.status(403).send("Forbidden");
    }
    next();
}

module.exports = validateAdmin;
const postOwn = async (req, res, next) => {
    const user= req.user;
    if (req.post.Id_User !== user.Sub || !user.isAdmin){
        return res.status(403).send("Forbidden");
    }
    next();
}

const everyRight = async (req, res, next) => {
    const user = req.user;
    if (req.post.Id_User !== user.Sub || !user.isAdmin || !user.isModo){
        return res.status(403).send("Forbidden");
    }
    next();
}

module.exports = {postOwn, everyRight};
const postOwn = async (req, res, next) => {
    const user= req.user;
    if (req.post.User.Id !== user.Sub && !user.IsAdmin){
        return res.status(403).send("Forbidden");
    }
    next();
}

const everyRight = async (req, res, next) => {
    const user = req.user;
    if (req.post.User.Id !== user.Sub || !user.IsAdmin || !user.IsModo){
        return res.status(403).send("Forbidden");
    }
    next();
}

module.exports = {postOwn, everyRight};
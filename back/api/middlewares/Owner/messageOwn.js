const messageOwn = async (req, res, next) => {
    const user = req.user;
    if (req.commentaire.User.Id !== user.Sub && !user.IsAdmin){
        return res.status(403).send("Forbidden");
    }
    next();
}


const everyRight = async (req, res, next) => {
    const user = req.user;
    if (req.message[0].User.Id  !== user.Sub && !user.IsAdmin && !user.IsModo){
        return res.status(403).send("Forbidden");
    }
    next();
}

module.exports = {messageOwn, everyRight};
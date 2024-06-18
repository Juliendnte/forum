const topicOwn = async (req, res, next) => {
    const user = req.user;
    if (req.topic.Id_User !== user.Sub || !user.isAdmin){
        return res.status(403).send("Forbidden");
    }
    next();
}

const everyRight = async (req, res, next) => {
    const user = req.user;
    if (req.topic.Id_User !== user.Sub || !user.isAdmin || !user.isModo){
        return res.status(403).send("Forbidden");
    }
    next();
}

module.exports = {topicOwn, everyRight};
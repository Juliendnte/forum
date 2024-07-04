const topicOwn = async (req, res, next) => {
    const user = req.user;

    console.log(user);

    if (req.topic.User.Id !== user.Sub && !user.IsAdmin){
        return res.status(403).send("Forbidden");
    }
    next();
}

const everyRight = async (req, res, next) => {
    const user = req.user;
    if (req.topic.User.Id !== user.Sub || !user.IsAdmin || !user.IsModo){
        return res.status(403).send("Forbidden");
    }
    next();
}

module.exports = {topicOwn, everyRight};
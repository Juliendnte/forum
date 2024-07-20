const topic = require("../../models/topicModel");

const topicExists = async (req, res, next) => {
    const name = req.params.name;

    try {
        const topicById = await topic.getTopicByName(name);

        if (!topicById.TopicId) {
            return res.status(404).send({
                message: `Topic with name ${name} not found`,
                status: 404
            });
        }
        req.topic = topicById;
        next();
    } catch (err) {
        res.status(500).json({
            message: err,
            status: 500
        });
    }
};

module.exports =  topicExists ;

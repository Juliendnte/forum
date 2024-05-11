const topic = require("../../models/topicModel");

const topicExists = async (req, res, next) => {
    const id = req.params.id;

    try {
        const topicById = await topic.getTopicById(id);

        if (!topicById) {
            return res.status(404).json({
                message: `Topic with id ${id} not found`,
                status: 404
            });
        }

        req.article = topicById;
        next();
    } catch (err) {
        res.status(500).json({
            message: err,
            status: 500
        });
    }
};

module.exports =  topicExists ;
